import Input from "./components/input";
import { zodResolver } from "@hookform/resolvers/zod";
import {useForm, FormProvider} from "react-hook-form";
import {z} from "zod"
import { useEffect } from "react";
import { Link } from "react-router-dom";
import React, { useState } from "react";

const Login = () => {

    const schema = z.object({
        email: z.string().email().nonempty("vous devez fournir un email"),
        password:z.string().min(6,{message:"Le mot de passe doit avoir un min de 6 caractères"}).nonempty({message:"Le mot de passe doit avoir un min de 6 caractères"})
    })
    const methods = useForm({
        resolver:zodResolver(schema)
    });
    let [loginStatus, setLoginStatus] = useState(null);

    const submit = (data) =>{
        //console.log(data);
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
          })
          .catch((err) => {
            console.log(err);
            setLoginStatus(false);
          });
    }

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
}

export default Login;