import { io } from "socket.io-client";

const socket = io(process.env.NEXT_PUBLIC_SERVER_URL!);

socket.on("connect", () => console.log("Server connected"));

export default socket;
