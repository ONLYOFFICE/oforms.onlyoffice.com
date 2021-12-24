import { request } from "./api";

export function getConfig(id) {
  return request({
    method: "get",
    url: `/${id}`,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
