import { FormProvider, useForm } from "react-hook-form";
import Input from "./components/login_register/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import Navbar from "./components/navbar";

const ForgetPass = () => {
    const schema = z.object({
        email: z.string().email().nonempty("vous devez fournir un email")
    })
    const methods = useForm({
        resolver:zodResolver(schema)
    });
    let [status, setStatus] = useState(null);
    const submit = (data) =>{
        fetch("http://localhost:3000/api/users/forgotpassword",{
            method: "POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({
                email: data.email
            })
        }).then(async (res)=>{
            let response = await res.json();
            setStatus(response.success)
        }).catch((err)=>{
            console.log(err);
            setStatus(response.success)
        })
    }

    return ( 

        <FormProvider {...methods}>


            <Navbar/>

            <form className="w-full flex justify-center items-center h-screen"
                onSubmit={methods.handleSubmit(submit)}
            >
                <div className="card card-side bg-base-100 shadow-xl w-1/2">
                    <div className="card-body border-2 border-slate-700 rounded-3xl">
                        <p className="font-bold text-lg text-slate-700">Récupération du mot de passe</p>
                        <Input classname={status!== null ?(status?"!text-success":"!text-error"):""} label={status==null?"Email":(status?"Email envoyé avec succès":"Email introuvable")} type={"text"} refreg="email" placeholder="Exemple@exemple.com" />
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary">Envoyer l'email de vérification</button>
                        </div>
                    </div>
                </div>
            </form>
        </FormProvider>
     );
}
 
export default ForgetPass;