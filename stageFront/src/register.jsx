import Input from "./components/input";
import { zodResolver } from "@hookform/resolvers/zod";
import {useForm, FormProvider} from "react-hook-form";
import { useEffect } from "react";
import { z } from "zod";

const Login = () => {

    const schema = z.object({
        email: z.string().email().nonempty("vous devez fournir un email"),
        nom: z.string().nonempty({message:"vous devez fournir nom"}),
        password:z.string().min(6,{message:"Le mot de passe doit avoir un min de 6 caractères"}).nonempty({message:"Le mot de passe doit avoir un min de 6 caractères"}),
        confPassword:z.string().min(6,{message:"Le mot de passe doit avoir un min de 6 caractères"}).nonempty({message:"Le mot de passe doit avoir un min de 6 caractères"})
    }).refine((data)=>{
        return data.password===data.confPassword;
    },{
        message:"Mots de passe doivent être identiques",
        path: ["confPassword"]
    })
    
    const methods = useForm({
        resolver:zodResolver(schema)
    });
    const submit = (data) =>{
        console.log(data);
    }

    return (
        <FormProvider {...methods}>
            <form className="w-full flex justify-center items-center h-screen"
                onSubmit={methods.handleSubmit(submit)}>

                <div className="card card-side bg-base-100 shadow-xl w-1/2">
                    <div className="card-body border-2 border-slate-700 rounded-3xl">
                        <p className="font-bold text-lg text-slate-700"></p>
                        <Input label={"Email"} type={"text"} refreg="email" placeholder="Exemple@exemple.com" />
                        <Input label={"Nom"} type={"text"} refreg="nom" placeholder="John Doe" />
                        <Input label={"Mot de passe"} type={"password"} refreg="password" placeholder="* * * * * *" />
                        <Input label={"Confirmer votre mot de passe"} refreg="confPassword" type={"password"} placeholder="* * * * * *" />
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary">REGISTER</button>
                        </div>
                    </div>
                </div>
            </form></FormProvider>
    );
}

export default Login;