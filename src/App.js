import "./App.css";
import { useState, useEffect } from "react";
import Chat from "./Chat";
import io from 'socket.io-client';

const socket = io(process.env.REACT_APP_SERVER_URL, {
  transports: ["websocket"],
});

function App() {
  const [username, setUsername] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [usersCount, setUsersCount] = useState(0);

  useEffect(() => {
    socket.on("connect", () => console.log("Connected to server!"));
    socket.on("disconnect", () => {
      console.log("Disconnected from server!");
      setUsersCount(0);
    });
    
    socket.on("room_joined", (data) => {
      setShowChat(true);
      setUsersCount(data.usersCount);
    });

    // Хэрэглэгчдийн тоо шинэчлэгдэх үед
    socket.on("room_users", (count) => {
      setUsersCount(count);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("room_joined");
      socket.off("room_users");
    };
  }, []);

  const joinRoom = () => {
    if (username.trim() === "") {
      alert("Нэрээ оруулна уу!");
      return;
    }
    socket.emit("join_room");
  };

  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Чат 💌</h3>
          <p>Онлайн хэрэглэгч: {usersCount}</p>
          <input
            type="text"
            placeholder="Нэрээ оруулна уу..."
            onChange={(event) => setUsername(event.target.value)}
            onKeyPress={(event) => event.key === "Enter" && joinRoom()}
          />
          <button onClick={joinRoom}>Чатлах</button>
        </div>
      ) : (
        <Chat
          socket={socket}
          username={username}
          usersCount={usersCount}
        />
      )}
      <footer className="footer">
        <p></p>
        <p>&copy; {new Date().getFullYear()} by Tugs.</p>
      </footer>
    </div>
  );
}

export default App;