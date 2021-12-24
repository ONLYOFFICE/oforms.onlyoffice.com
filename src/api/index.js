import { request } from "./api";

export function getConfig(id) {
  return request({
    method: "get",
    url: `/page/${id}`,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
