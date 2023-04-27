import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Header(){
  // const [username, setUsername] = useState(null);
  // useEffect(() => {
  //   fetch('http://localhost:4000/profile',{
  //     credentials:'include',
  //   }).then(response => {
  //     response.json().then(userInfo => {
  //       setUsername(userInfo.username)
  //     });
  //   });
  // }, [])
    return(
        <header>
        <Link to="/" className="logo">Ciekawe podróże</Link>
        <nav>
          <Link to="/login">Zaloguj się</Link>
          <Link to="/register">Zarejestruj się</Link>
        </nav>
      </header>
    );
}