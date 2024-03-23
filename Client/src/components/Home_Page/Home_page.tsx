// import React from 'react';
// import { io } from 'socket.io-client';
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import Layout from "../../Layout";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

export default function Home_page() {
  const joinRoom = () => {
    // fill some code
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
            <div className="flex h-full items-center justify-center p-6">
              <span className="font-semibold">For Chats</span>
            </div>
            <ul id="bubbles"></ul>
            <form
              id="chat"
              className="flex gap-2 items-center p-2 fixed bottom-0 w-full"
            >
              <Input
                type="text"
                id="room"
                className="w-1/5"
                placeholder="Room id"
              />
              <Button type="submit" onClick={joinRoom}>
                Join
              </Button>

              <Input
                type="text"
                id="message"
                className="w-2/5 "
                placeholder="Type your message here"
              />
              <Button id="messageButton" type="submit">
                Send
              </Button>
            </form>
          </ResizablePanel>
        </ResizablePanelGroup>

        {/* <script src="/socket.io/socket.io.js"></script> */}
      </Layout>
    </>
  );
}
