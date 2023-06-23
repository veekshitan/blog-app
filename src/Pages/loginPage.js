
import './loginPage.css'
import { useState } from 'react'
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';



export default function LoginPage() {
    const [username, setuserName] = useState('');
    const [password, setPassWord] = useState('');
    const [redirect, setRedirect] = useState(false);
    let navigate = useNavigate();
    const {setUserInfo} = useContext(UserContext);

    async function loginUser(event){
        event.preventDefault();
        const response = await fetch('http://localhost:4000/login', {
            method : 'POST',
            body : JSON.stringify({username, password}),
            headers : {'Content-type' : 'application/json'},
            credentials: 'include',
        });
        
        if(response.ok){
            response.json().then(userInfo => {
                setUserInfo(userInfo);
                navigate("/")
            })
        } else{
            console.log("Wrong credentials")
        }

    }

    return (
        <div className = "login">
            <form action= "" onSubmit = {loginUser}>
                <h1 className = "heading"> Login </h1>
                <input 
                    type = "text" 
                    placeholder = "Username" 
                    value = {username}
                    onChange={(e) => setuserName(e.target.value)}
                />
                <input 
                    type = "password" 
                    placeholder = "Password" 
                    value = {password}
                    onChange = {(e) => setPassWord(e.target.value)}
                />
                <button>Login</button>
            </form>
        </div>
    )
}