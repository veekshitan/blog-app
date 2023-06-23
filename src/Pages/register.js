import React from 'react'
import { useNavigate } from 'react-router-dom';
import './register.css'

export default function Register () {
    const [username, setusername] = React.useState('');
    const [password, setpassword] = React.useState('');

    const navigate = useNavigate();

    async function registerUser(event){
        event.preventDefault();
            const response = await fetch('http://localhost:4000/register', {
                method: 'POST',
                body: JSON.stringify({username, password}),
                headers : {'Content-type' : 'application/json'}
            });
            if(response.status !== 200){
                alert('Registration failed')
            }
            else{
                navigate("/login")
            }

    }
    return (
        <div className = "register" onSubmit = {registerUser} >
            <form action= "">
                <h1 className = "heading">Register</h1>

                <input type = "text" 
                placeholder = "Username"
                value = {username} 
                onChange ={e => setusername(e.target.value)}/>

                <input type = "password" 
                placeholder = "Password" 
                value = {password}
                onChange = {e => setpassword(e.target.value)}/>

                <button>Register</button>
            </form>
        </div>
    )
}