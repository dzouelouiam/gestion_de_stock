import Input from "./components/input";
import { zodResolver } from "@hookform/resolvers/zod";
import {useForm, FormProvider} from "react-hook-form";
import {z} from "zod";
import { Link } from "react-router-dom";
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
            if (!response.success) {
                setErrorMessage(response.message);
            } else {
                // If login is successful, clear the error message
                setErrorMessage("");
            }
        })
        .catch((err) => {
            console.log(err);
            setLoginStatus(false);
            // If there's an error, set a generic error message
            setErrorMessage("An error occurred while logging in.");
        });
    };

    return (
        <FormProvider {...methods}>
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
                            <button className="btn btn-primary">LOGIN</button>
                            <button className="btn btn-primary">REGISTER</button>
                        </div>
                    </div>
                </div>
            </form>
        </FormProvider>
    );
};

export default Login;