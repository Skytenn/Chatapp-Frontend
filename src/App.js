import "./App.css";
import { useState, useEffect } from "react";
import Chat from "./Chat";
import io from 'socket.io-client';

<<<<<<< HEAD
const socket = io(process.env.REACT_APP_SERVER_URL, {
=======
const socket = io("https://chatapp-4-0nz3.onrender.com", {
>>>>>>> e31b93f8274fd56a804af7ace0494408f5e45063
  transports: ["websocket"],
});

function App() {
  const [username, setUsername] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [room, setRoom] = useState("");
  const [usersCount, setUsersCount] = useState(0);

  useEffect(() => {
    socket.on("connect", () => console.log("Connected to server!"));
<<<<<<< HEAD
    socket.on("disconnect", () => {
      console.log("Disconnected from server!");
      setUsersCount(0);
    });
    
=======
    socket.on("disconnect", () => console.log("Disconnected from server!"));
>>>>>>> e31b93f8274fd56a804af7ace0494408f5e45063
    socket.on("room_joined", (data) => {
      setRoom(data.room);
      setUsersCount(data.usersCount);
      setShowChat(true);
    });

<<<<<<< HEAD
    // Хэрэглэгчдийн тоо шинэчлэгдэх үед
    socket.on("room_users", (count) => {
      setUsersCount(count);
    });

=======
>>>>>>> e31b93f8274fd56a804af7ace0494408f5e45063
    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("room_joined");
<<<<<<< HEAD
      socket.off("room_users");
=======
>>>>>>> e31b93f8274fd56a804af7ace0494408f5e45063
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
<<<<<<< HEAD
          <h3> Чат</h3>
          
=======
          <h3>Чатлах 💌</h3>
>>>>>>> e31b93f8274fd56a804af7ace0494408f5e45063
          <input
            type="text"
            placeholder="Нэрээ оруулна уу..."
            onChange={(event) => setUsername(event.target.value)}
<<<<<<< HEAD
            onKeyPress={(event) => event.key === "Enter" && joinRoom()}
=======
>>>>>>> e31b93f8274fd56a804af7ace0494408f5e45063
          />
          <button onClick={joinRoom}>Чатлах</button>
        </div>
      ) : (
        <Chat
          socket={socket}
          username={username}
          room={room}
          setRoom={setRoom}
          usersCount={usersCount}
          setUsersCount={setUsersCount}
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