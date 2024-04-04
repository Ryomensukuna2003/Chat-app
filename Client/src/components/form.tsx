import React from "react";
import styles from "./style.module.css";

const Form: React.FC = () => {
  return (
    <div className={styles.positon}>
      {/* <form
        className="flex gap-2 items-center p-2 w-screen sticky bottom-14"
        // onSubmit={send_message}
      >
        <Input
          type="text"
          id="room"
          className="w-1/5"
          placeholder="Room id"
        //   value={room}
        //   onChange={handle_room_change}
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
        </Button> */}
      {/* </form> */}
      <p>hello</p>
    </div>
  );
};

export default Form;
