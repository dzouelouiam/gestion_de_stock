import Input from "./components/input";
const Login = () => {
    return (
        <>
            <div className="w-full flex justify-center items-center h-screen">
                <div className="card card-side bg-base-100 shadow-xl w-1/2">
                    <div className="card-body border-2 border-slate-700 rounded-3xl">
                        <p className="font-bold text-lg text-slate-700">Bienvenue</p>
                        <Input label={"Email"} type={"text"} placeholder="Exemple@exemple.com" />
                        <Input label={"Mot de passe"} type={"password"} placeholder="* * * * * *" />
                        <p className="capitalize hover:underline hover:cursor-pointer">Mot de passe oublié?</p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary">LOGIN</button>
                            <button className="btn btn-primary">REGISTER</button>
                        </div>
                    </div>
                </div>
            </div></>
    );
}

export default Login;