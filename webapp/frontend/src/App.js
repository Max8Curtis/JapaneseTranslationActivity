import React, { useState } from "react";
import Button from '@mui/material/Button'

function App() {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    const res = await fetch("http://127.0.0.1:8000/users");
    const data = await res.json();
    setUsers(data);
  };

  const addUser = async () => {
    const name = prompt("Enter user name:");
    if (!name) return;
    await fetch("http://127.0.0.1:8000/users?name=" + name, {
      method: "POST",
    });
    getUsers();
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Users</h1>
      <Button variant="contained" onClick={getUsers}>Load Users</Button>
      <Button variant="contained" onClick={addUser}>Add User</Button>
      <ul>
        {users.map((u) => (
          <li key={u.id}>{u.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;