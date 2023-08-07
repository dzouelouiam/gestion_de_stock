import Input from "./components/input";
import { zodResolver } from "@hookform/resolvers/zod";
import {useForm, FormProvider} from "react-hook-form";
import {z} from "zod";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";

const Alert = ({ message }) => (
    <div className="alert alert-error">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="stroke-current shrink-0 h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span>{message}</span>
    </div>
  );

const Login = () => {
    const schema = z.object({
        email: z.string().email().nonempty("vous devez fournir un email"),
        password:z.string().min(6,{message:"Le mot de passe doit avoir un min de 6 caractères"}).nonempty({message:"Le mot de passe doit avoir un min de 6 caractères"})
    });

    const methods = useForm({
        resolver:zodResolver(schema)
    });

    let [loginStatus, setLoginStatus] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const submit = (data) =>{
        fetch("http://localhost:3000/api/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: data.email,
                password: data.password
            }),
        }).then(async (res) => {
            let response = await res.json();
            console.log(response);
            setLoginStatus(response.success);

            // If login is unsuccessful, set the error message from the response
            if (!res.ok) {
                setErrorMessage(response.message);
            } else {
                // If login is successful, clear the error message
                console.log("ok");
                setErrorMessage("");
                localStorage.setItem("JWT",response.token);
                navigate({pathname:"/home"}) // Redirect to /home on successful login
            }
        }).catch((err) => {
            console.log(err);
            setLoginStatus(false);
            // If there's an error, set a generic error message
            setErrorMessage("An error occurred while logging in.");
        });
    };


    return (
            
        <FormProvider {...methods}>
            <div className="navbar dark:bg-gray-800">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost btn-circle">
                        {/* Add your SVG for the logo here */}
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
                            </svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow dark:bg-gray-800 rounded-box w-52">
                            <li><a className="text-white">Homepage</a></li>
                            <li><a className="text-white">Portfolio</a></li>
                            <li><a className="text-white">About</a></li>
                        </ul>
                    </div>
                </div>
                <div className="navbar-center">
                    <a className="btn btn-ghost normal-case text-xl text-white">
                        Gestion de stock
                    </a>
                </div>
                <div className="navbar-end">
                    <button className="btn btn-ghost btn-circle">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </button>
                    <button className="btn btn-ghost btn-circle">
                      <div className="indicator">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                        <span className="badge badge-xs badge-primary indicator-item"></span>
                     </div>
                 </button>
            </div>
        </div>

            <form className="w-full flex justify-center items-center h-screen"
                onSubmit={methods.handleSubmit(submit)}
            >
                <div className="card card-side bg-base-100 shadow-xl w-1/2">
                    <div className="card-body border-2 border-slate-700 rounded-3xl">
                        <p className="font-bold text-lg text-slate-700">Bienvenue</p>
                        <Input label={"Email"} type={"text"} refreg="email" placeholder="Exemple@exemple.com" />
                        <Input label={"Mot de passe"} refreg="password" type={"password"} placeholder="* * * * * *" />
                        
                        {/* Show the error message if present */}
                        {errorMessage && <Alert message={errorMessage} />}

                        <Link to="/forgetPassword">
                            <p className="capitalize hover:underline hover:cursor-pointer">Mot de passe oublié?</p>
                        </Link>
                        <div className="card-actions justify-end">
                        <button className="btn btn-primary" onClick={methods.handleSubmit(submit)}>
                            LOGIN
                        </button>
                        <Link to="/register">
                            <button className="btn btn-primary">REGISTER</button>
                        </Link>
                        </div>
                    </div>
                </div>
            </form>
        </FormProvider>
    );
};

export default Login;