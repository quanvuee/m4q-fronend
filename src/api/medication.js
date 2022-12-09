import sendRequest from "./sendRequest";

export const getMedicaions = () =>
  sendRequest("/medications", { method: "GET" });
