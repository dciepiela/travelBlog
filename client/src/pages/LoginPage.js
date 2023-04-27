import {useState} from "react";
import {Navigate} from "react-router-dom"
// import axios from 'axios';

export default function LoginPage(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    async function login(ev){
        ev.preventDefault();
        const response = await fetch('http://localhost:4000/login', {
            method:'POST',
            body: JSON.stringify({username,password}),
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
        });
        if(response.ok){
            setRedirect(true);
        }
        else{
            alert('Złe dane logowania')
        }
    }

    if(redirect){
        return <Navigate to={'/'}></Navigate>
    }
    return(
        <form className="login" onSubmit={login}>
            <h1>Logowanie</h1>
            <input type="text" placeholder="Nazwa użytkownika" value={username} onChange={ev =>setUsername(ev.target.value)}/>
            <input type="password" placeholder="Hasło" value={password} onChange={ev =>setPassword(ev.target.value)}/>
            <button>Zaloguj się</button>
        </form>
    )
}