import { useEffect, useState } from "react";
import jwt from 'jsonwebtoken';
import { useRouter } from 'next/router';
import classes from './index.module.scss';
import { useDispatch } from "react-redux";
import { userSession } from "../../redux/actions";
import MessageBox from "../../components/MessageBox/MessageBox";

export default function Login() {
    const [email, setEmail] = useState("kiyoshi@test.com");
    const [password, setPassword] = useState("kiyoshi");
    const [emailError, setEmailError] = useState("");
    const [message, setMessage] = useState("");
    const router = useRouter();

    const dispatch = useDispatch();

    async function submitForm () {
        try {
            let re =
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (re.test(email)) {
                const res = await fetch("/api/login", {
                    method: "POST",
                    body: JSON.stringify({ email, password }),
                    headers: {
                        "Content-type": "application/json",
                    },
                });

                const data = await res.json();

                if (!data.message) {
                    localStorage.setItem("userData", JSON.stringify(data));
                    dispatch(userSession(data));
                    router.push("/");
                } else {
                    setEmailError("Email or password is not correct, please try again");                    
                }
            } else {
                setEmailError("The email format is invalid");
            }
        } catch(error) {
            console.log(error);
        }
    }

    return (
        <div className={classes.loginContainer}>
            <h1>{message}</h1>
            <form method="POST" action="/api/login">
                <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                {emailError && <MessageBox variant="danger">{emailError}</MessageBox>}
                <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="button" onClick={submitForm}>
                    Login
                </button>
            </form>
        </div>
    );
}