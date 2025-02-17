import Echo from "laravel-echo";
import Pusher from "pusher-js";

export const pusher = new Pusher("e7a7fc4fb1cf169218be", {
  cluster: "eu",
});

export const echo = new Echo({
  broadcaster: "pusher",
  key: "e7a7fc4fb1cf169218be",
  cluster: "eu",
  wsHost: "127.0.0.1",
  wsPort: "443",
  wssPort: "443",
  forceTLS: "https",
  enabledTransports: ["ws", "wss"],
});
