/*
 * (c) Copyright Ascensio System SIA 2009-2026
 *
 * This program is a free software product.
 * You can redistribute it and/or modify it under the terms
 * of the GNU Affero General Public License (AGPL) version 3 as published by the Free Software
 * Foundation. In accordance with Section 7(a) of the GNU AGPL its Section 15 shall be amended
 * to the effect that Ascensio System SIA expressly excludes the warranty of non-infringement of
 * any third-party rights.
 *
 * This program is distributed WITHOUT ANY WARRANTY, without even the implied warranty
 * of MERCHANTABILITY or FITNESS FOR A PARTICULAR  PURPOSE. For details, see
 * the GNU AGPL at: http://www.gnu.org/licenses/agpl-3.0.html
 *
 * You can contact Ascensio System SIA at Lubanas st. 125a-25, Riga, Latvia, EU, LV-1021.
 *
 * The  interactive user interfaces in modified source and object code versions of the Program must
 * display Appropriate Legal Notices, as required under Section 5 of the GNU AGPL version 3.
 *
 * Pursuant to Section 7(b) of the License you must retain the original Product logo when
 * distributing the program. Pursuant to Section 7(e) we decline to grant you any rights under
 * trademark law for use of our trademarks.
 *
 * All the Product's GUI elements, including illustrations and icon sets, as well as technical writing
 * content are licensed under the terms of the Creative Commons Attribution-ShareAlike 4.0
 * International. See the License terms at http://creativecommons.org/licenses/by-sa/4.0/legalcode
 */

/**
 * Strapi webhook -> Actions workflow_dispatch.
 *
 * Strapi can only POST its own event payload to a fixed URL with fixed headers,
 * and the dispatch API wants `{"ref": ...}` plus a repo-write token — so this
 * Worker is the adapter, and the token stays out of the CMS config.
 *
 * The Durable Object exists for one reason: publishing 50 forms fires 50
 * webhooks, and each run of deploy-embed-cloudflare.yml refetches all 9 locales
 * and rebuilds. One alarm collapses the burst into one run.
 */

export interface Env {
  // Secrets. GIT_API_BASE and GIT_REPO are secrets rather than vars only
  // because wrangler.jsonc is committed and they name internal git hosts.
  STRAPI_WEBHOOK_SECRET: string;
  GIT_TOKEN: string;
  GIT_API_BASE: string;
  GIT_REPO: string;
  // Vars.
  GIT_REF: string;
  WORKFLOW_FILE: string;
  DEBOUNCE_MS: string;
  DEPLOY: DurableObjectNamespace;
}

// generate-data.mjs reads published entries only, so drafts and their media are
// not worth a rebuild. media.* is absent for the same reason: card_prewiew and
// file_oform are stored as CMS urls, not copied into the catalog.
const REBUILD_EVENTS = new Set([
  "entry.publish",
  "entry.unpublish",
  "entry.delete",
]);

// The models generate-data.mjs actually reads (see its populate= list).
const REBUILD_MODELS = new Set([
  "oform",
  "country",
  "subcategory",
  "parent-category",
  "purpose",
]);

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.method !== "POST") return text(405, "method not allowed");
    if (!(await authorized(request, env))) return text(403, "forbidden");

    const body = (await request.json().catch(() => null)) as
      | { event?: string; model?: string }
      | null;
    if (!body) return text(400, "expected json");

    const { event = "", model = "" } = body;
    if (!REBUILD_EVENTS.has(event) || !REBUILD_MODELS.has(model)) {
      return text(202, `ignored ${event} on ${model}`);
    }

    const id = env.DEPLOY.idFromName("embed");
    await env.DEPLOY.get(id).fetch("https://deploy/schedule");
    return text(202, `queued after ${event} on ${model}`);
  },
};

export class DeployQueue implements DurableObject {
  constructor(
    private state: DurableObjectState,
    private env: Env,
  ) {}

  // Every webhook lands here; only the first of a burst arms the alarm, so the
  // window is fixed-length from the first event rather than sliding forever.
  async fetch(): Promise<Response> {
    if ((await this.state.storage.getAlarm()) === null) {
      await this.state.storage.setAlarm(
        Date.now() + Number(this.env.DEBOUNCE_MS),
      );
    }
    return new Response("ok");
  }

  // Throwing here is deliberate: the runtime retries a failed alarm with
  // backoff, which is the retry policy we would otherwise have to write.
  async alarm(): Promise<void> {
    const env = this.env;
    // Without this a missing secret reads as an opaque network error below,
    // retried with backoff and never explained.
    for (const k of ["GIT_API_BASE", "GIT_REPO", "GIT_TOKEN"] as const) {
      if (!env[k]) throw new Error(`secret ${k} is not set`);
    }

    const url =
      `${env.GIT_API_BASE.replace(/\/$/, "")}/repos/${env.GIT_REPO}` +
      `/actions/workflows/${env.WORKFLOW_FILE}/dispatches`;

    let res: Response;
    try {
      res = await fetch(url, {
        method: "POST",
        headers: {
          authorization: `Bearer ${env.GIT_TOKEN}`,
          accept: "application/vnd.github+json",
          "x-github-api-version": "2022-11-28",
          "content-type": "application/json",
          // GitHub rejects requests without one.
          "user-agent": "oforms-embed-deploy-hook",
        },
        body: JSON.stringify({ ref: env.GIT_REF }),
      });
    } catch (err) {
      // A fetch-level failure names the full url in its message, and this
      // Worker logs to observability — which would publish the host that was
      // made a secret in the first place.
      throw new Error(`dispatch unreachable: ${(err as Error).name}`);
    }

    // Response bodies are echoed on purpose: they are the API's own error text
    // ("Workflow does not have workflow_dispatch trigger"), and a 404 here
    // usually means the token cannot see the repo. The host is stripped because
    // every Gitea API error carries {"url": "<host>/api/swagger"} — redacted
    // rather than parsed, so neither API's error shape has to be tracked.
    if (!res.ok) {
      const host = env.GIT_API_BASE.replace(/^https?:\/\//, "").replace(
        /\/.*$/,
        "",
      );
      const body = (await res.text()).replaceAll(host, "<git-host>");
      throw new Error(`dispatch failed: ${res.status} ${body}`);
    }
    console.log(`dispatched ${env.WORKFLOW_FILE} on ${env.GIT_REF}`);
  }
}

// Compared as SHA-256 digests so the lengths always match and the comparison
// stays constant-time regardless of what the caller sent.
async function authorized(request: Request, env: Env): Promise<boolean> {
  // Unset, `want` below is the literal "Bearer undefined" — an open trigger.
  if (!env.STRAPI_WEBHOOK_SECRET) return false;

  const got = request.headers.get("authorization") ?? "";
  const want = `Bearer ${env.STRAPI_WEBHOOK_SECRET}`;
  const [a, b] = await Promise.all([sha256(got), sha256(want)]);
  return crypto.subtle.timingSafeEqual(a, b);
}

const sha256 = (s: string) =>
  crypto.subtle.digest("SHA-256", new TextEncoder().encode(s));

const text = (status: number, body: string) =>
  new Response(body, { status, headers: { "content-type": "text/plain" } });
