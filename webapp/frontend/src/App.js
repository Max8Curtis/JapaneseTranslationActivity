import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Translate from './translate';
// import Navigation from './navigation'

function App() {
  const [users, setUsers] = useState([]);
  const [value, setValue] = React.useState(0);

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

  function Home() {
  return <h1>Home Page</h1>;
}

function About() {
  return <h1>About Page</h1>;
}


  return (
    <BrowserRouter>
      <Translate></Translate>
    
    </BrowserRouter>
    
  );
}

export default App;