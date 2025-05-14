import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";

function Chat({ socket, username, room, setRoom, usersCount, setUsersCount }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  // Мессежүүдийг серверээс унших
  useEffect(() => {
    const handleReceiveMessage = (messageData) => {
      setMessageList((list) => [...list, messageData]);
    };

    socket.on("receive_message", handleReceiveMessage);

    return () => {
      // Cleanup event listener
      socket.off("receive_message", handleReceiveMessage);
    };
  }, [socket]);

<<<<<<< HEAD
  // Өрөөний түүх (room_history) эвэнтийг хүлээж авах
  useEffect(() => {
    const handleRoomHistory = (history) => {
      setMessageList(history.slice(-20)); // Сүүлийн 20 мессежийг харуулах
    };
    socket.on("room_history", handleRoomHistory);
    return () => {
      socket.off("room_history", handleRoomHistory);
    };
  }, [socket]);

=======
>>>>>>> e31b93f8274fd56a804af7ace0494408f5e45063
  // Мессеж илгээх логик
  const sendMessage = () => {
    if (currentMessage.trim() === "") return;

    const messageData = {
      room: room,
      author: username,
      message: currentMessage,
      time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
    };

    socket.emit("send_message", messageData); // Мессежийг сервер рүү илгээх
    setCurrentMessage(""); // Input-ыг хоослох
  };

<<<<<<< HEAD

=======
  // Өрөө солих логик
  const handleChangeRoom = () => {
    setMessageList([]);
    socket.emit("leave_room", room);
    socket.emit("join_room");
  };
>>>>>>> e31b93f8274fd56a804af7ace0494408f5e45063

  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>
<<<<<<< HEAD
           Чат<span style={{ marginLeft: '10px' }}>Онлайн: {usersCount}</span>
=======
          Чат 💓<span style={{ marginLeft: '10px' }}>{usersCount}</span>
          <button onClick={handleChangeRoom}>Өрөө Солих</button>
>>>>>>> e31b93f8274fd56a804af7ace0494408f5e45063
        </p>
      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {messageList.map((messageContent, index) => (
            <div
              key={index}
              className="message"
              id={username === messageContent.author ? "you" : "other"}
            >
              <div>
                <div className="message-content">
                  <p>{messageContent.message}</p>
                </div>
                <div className="message-meta">
                  <p id="time">{messageContent.time}</p>
                  <p id="author">{messageContent.author}</p>
                </div>
              </div>
            </div>
          ))}
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={currentMessage}
          placeholder="Сайн уу..."
          onChange={(event) => setCurrentMessage(event.target.value)}
          onKeyPress={(event) => event.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  );
}

export default Chat;