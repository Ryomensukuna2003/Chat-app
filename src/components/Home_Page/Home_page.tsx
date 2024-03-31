import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import Layout from "../../Layout";
import { io } from "socket.io-client";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

const socket = io("http://localhost:5000/");

export default function Home_page() {
  const [messages, setMessages] = useState<any[]>([]);
  const [message, setMessage] = useState("");
  const [room, setRoom] = useState("");
  const [client_id, setClient_id] = useState("");

  useEffect(() => {
    socket.on("sending_to_client", (res:any) => {
      const { data, socket_id } = res;
      console.log(socket_id," -> ",data );
      setClient_id(socket_id);
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socket.off("sending_to_client");
    };
  }, []);


  const handle_message_change = (e: ChangeEvent<HTMLInputElement>) =>
    setMessage(e.target.value);

  const handle_room_change = (e: ChangeEvent<HTMLInputElement>) =>
    setRoom(e.target.value);

  const join_Room = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
  };

  const send_message = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    socket.emit("chat", message);
    setMessage("");
  };
  

  return (
    <>
      <Layout>
        <ResizablePanelGroup
          direction="horizontal"
          className="min-h-screen min-w-screen-lg rounded-lg border"
        >
          <ResizablePanel defaultSize={25}>
            <div className="flex h-full items-center justify-center p-6">
              <span className="font-semibold">For Groups</span>
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={75}>
            <Alert>
              <Terminal className="h-4 w-4" />
              <AlertTitle>{client_id}</AlertTitle>
              <AlertDescription>
                {messages.map((msg, index) => (
                  <li key={index}>{msg}</li>
                ))}
              </AlertDescription>
            </Alert>
            <div className="flex h-full items-center justify-center p-6">
              <span className="font-semibold">For Chats</span>
            </div>
            <form
              className="flex gap-2 items-center p-2 fixed bottom-0 w-full"
              onSubmit={send_message}
            >
              <Input
                type="text"
                id="room"
                className="w-1/5"
                placeholder="Room id"
                value={room}
                onChange={handle_room_change}
              />
              <Button type="submit">Join</Button>
              <Input
                type="text"
                id="message"
                className="w-2/5"
                placeholder="Type your message here"
                value={message}
                onChange={handle_message_change}
              />
              <Button type="submit" id="messageButton">
                Send
              </Button>
            </form>
          </ResizablePanel>
        </ResizablePanelGroup>
      </Layout>
    </>
  );
}
