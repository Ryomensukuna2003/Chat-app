import { io } from "socket.io-client";

export function socketConnection(link:any) {
  const socket = io(link);
  socket.on("connect", () => {
    console.log("socket connected - ", socket.connected);
  });
  socket.on("disconnect", () => {
    console.log("Disconnected");
  });
  return socket;
}
