import React, { useState, useEffect } from "react";
import "./App.css";

import AlbumList from "./AlbumList";
import UserList from "./UserList";

function App() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  document.title = "Awesome Album App";

  useEffect(() => {
    const abortController = new AbortController();
    async function getUsers() {
      try {
        const userList = await fetch(
          `https://jsonplaceholder.typicode.com/users`,
          { signal: abortController.signal }
        );
        const userFromAPI = await userList.json();
        setUsers(userFromAPI);
      } catch (error) {
        if (error.name === "AbortError") console.log("aborted");
        else throw error;
      }
    }
    getUsers();

    return () => {
      document.title = "";
      abortController.abort();
    };
  }, []);

  return (
    <div className="App">
      <div className="left column">
        <UserList users={users} setCurrentUser={setCurrentUser} />
      </div>
      <div className="right column">
        <AlbumList user={currentUser} />
      </div>
    </div>
  );
}

export default App;
