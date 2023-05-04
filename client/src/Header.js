import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "./UserContext";
import Logo from "../src/img/logo1.png"

export default function Header(){
  const {setUserInfo, userInfo} = useContext(UserContext);
  useEffect(() => {
    fetch('http://localhost:4000/profile',{
      credentials:'include',
    }).then(response => {
      response.json().then(userInfo => {
        setUserInfo(userInfo);
      });
    });
  }, []);

  function logout(){
    fetch('http://localhost:4000/logout',{
      credentials: 'include',
      method: 'POST',
    });
    setUserInfo(null);
  }

  const username = userInfo?.username; //informacje o użytkowniku mogą być czasami nowe
    return(
        <header>
        <Link to="/" className="logo"><img src={Logo} alt=""></img></Link>
        <nav>
          {username && (
            <>
              <span>Witaj, <b>{username}</b></span>
              <Link to="/create">Utwórz nowy post</Link>
              <Link onClick={logout} to="/">Wyloguj</Link>
            </>
          )}
          {!username && (
            <>
              <Link to="/login">Zaloguj się</Link>
              <Link to="/register">Zarejestruj się</Link>
            </>
          )}
        </nav>
      </header>
    );
}