import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Albums from "./components/Albums/Albums";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import Photos from "./components/Photos/Photos";
import Login from "./components/User/Login";
import Signup from "./components/User/Signup";

function App() {
  const [user, setUser] = useState({ id: null, name: null });
  const [activeAlbum, setActiveAlbum] = useState({ id: null, albumName: null });
  const [isLoginVisible, setLoginVisible] = useState(false);
  const [isSignupVisible, setSignupVisible] = useState(false);

  useEffect(() => {
    let user = sessionStorage.getItem("user");
    window.alert(
      "Login using \n id: raghavpatel2808@gmail.com and password: 1234 \n to view sample data \nor signup to create new account"
    );
    if (user !== null) {
      user = JSON.parse(user);
      try {
        if (user.email) {
          setUser({ id: user.email, name: user.name });
        }
      } catch (error) {
        console.log(error);
      }
    }
  }, []);

  const toggleLogin = () => {
    setLoginVisible((prevState) => !prevState);
    setSignupVisible(false);
  };
  const toggleSignup = () => {
    setSignupVisible((prevState) => !prevState);
    setLoginVisible(false);
  };

  const setActiveUser = (user) => {
    setUser({ id: user.id, name: user.name });
  };

  const logout = () => {
    setUser({ id: null, name: null });
    sessionStorage.setItem("user", null);
  };

  const setAlbum = (album) => {
    setActiveAlbum({ id: album.id, albumName: album.albumName });
  };

  return (
    <div className="App">
      <ToastContainer />
      <Navbar
        user={{ user }}
        toggle={{ toggleLogin, toggleSignup }}
        logout={logout}
      />
      {!user.id && isLoginVisible && (
        <Login setUser={setActiveUser} toggleLogin={toggleLogin} />
      )}
      {!user.id && isSignupVisible && (
        <Signup setUser={setActiveUser} toggleSignup={toggleSignup} />
      )}
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route
          path="/albums"
          element={<Albums props={{ activeAlbum, setAlbum, user }} />}
        />
        <Route
          path="/photos"
          element={<Photos album={activeAlbum} user={user} />}
        />
      </Routes>
    </div>
  );
}

export default App;
