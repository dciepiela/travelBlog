import {useState} from "react";
import { Navigate } from "react-router-dom";


export default function RegisterPage(){
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [redirect,setRedirect] = useState(false);
    async function register(ev){
        ev.preventDefault();
        const response = await fetch('http://localhost:4000/register', {
            method:'POST',
            body: JSON.stringify({username,password}),
            headers: {'Content-Type': 'application/json'},
        });
        if(response.status === 200){
            alert("Rejestracja przebiegła pomyślnie");
            setRedirect(true);
        } else{
            alert("Rejestracja nieudana");
        }
    }
    if (redirect){
        return <Navigate to={`/`}></Navigate>
    }
    return(
        <form className="register" onSubmit={register}>
            <h1>Rejestracja</h1>
            <input type="text" placeholder="Nazwa użytkownika" value={username} onChange = {ev => setUsername(ev.target.value)}/>
            <input type="password" placeholder="Hasło" value={password} onChange={ev => setPassword(ev.target.value)}/>
            <button>Zarejestruj się</button>
        </form>
    );
}