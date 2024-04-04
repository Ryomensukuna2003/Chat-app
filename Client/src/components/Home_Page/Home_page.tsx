import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import { ThemeProvider } from "@/components/theme-provider";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { SiteHeader } from "@/components/site-header";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { io } from "socket.io-client";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

const socket = io("http://localhost:5000/");
var currentdate = new Date();
var datetime =
  "Last Sync: " +
  currentdate.getDate() +
  "/" +
  (currentdate.getMonth() + 1) +
  "/" +
  currentdate.getFullYear() +
  " @ " +
  currentdate.getHours() +
  ":" +
  currentdate.getMinutes() +
  ":" +
  currentdate.getSeconds();

export default function HomePage() {
  const [messages, setMessages] = useState<any[]>([]);
  const [message, setMessage] = useState("");
  const [room, setRoom] = useState("");
  const [clientId, setClientId] = useState("");

  useEffect(() => {
    socket.on("sending_to_client", (res: any) => {
      const { data, socket_id } = res;
      console.log(socket_id, " -> ", data);
      setClientId(socket_id);
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socket.off("sending_to_client");
    };
  }, []);

  const handleMessageChange = (e: ChangeEvent<HTMLInputElement>) =>
    setMessage(e.target.value);

  const handleRoomChange = (e: ChangeEvent<HTMLInputElement>) =>
    setRoom(e.target.value);

  const joinRoom = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    socket.emit("join", room);
    toast("Joined Room " + room, {
      description: datetime,
    });
  };

  const sendMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    socket.emit("chat", message,room);
    setMessage("");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <SiteHeader />
      </ThemeProvider>
      <div className="flex flex-row flex-grow">
        <div className="basis-1/4 border-r border-#1E293B p-4">For Groups</div>
        <div className="basis-3/4 relative">
          <Alert>
            <Terminal className="h-4 w-4" />
            <AlertTitle>{clientId}</AlertTitle>
            <AlertDescription>
              {messages.map((msg, index) => (
                <li key={index}>{msg}</li>
              ))}
            </AlertDescription>
          </Alert>
          <div className="flex gap-2 absolute bottom-0 left-0 right-0 p-2">
            <Input
              type="text"
              className="basis-1/4"
              placeholder="Room id"
              value={room}
              onChange={handleRoomChange}
            />
            <Button type="submit" onClick={joinRoom}>
              Join
            </Button>
            <Input
              type="text"
              className="basis-3/4"
              placeholder="Type your message here"
              value={message}
              onChange={handleMessageChange}
            />
            <Button type="submit" onClick={sendMessage}>
              Send
            </Button>
            <Toaster />
          </div>
        </div>
      </div>
    </div>
  );
}
