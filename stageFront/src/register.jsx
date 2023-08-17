import Input from "./components/login_register/input";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import Navbar from "./components/navbar";

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
  const [errorMessage, setErrorMessage] = useState(null);
  

  const schema = z.object({
    email: z.string().email().nonempty("Vous devez fournir un email valide"),
    nom: z.string().nonempty("Vous devez fournir un nom"),
    password: z.string().min(6, "Le mot de passe doit avoir au moins 6 caractères").nonempty("Le mot de passe est requis"),
  });

  const methods = useForm({
    resolver: zodResolver(schema),
  });

  const navigate = useNavigate();

  const submit = async (data) => {
    try {
      const response = await fetch("http://localhost:3000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          name: data.nom,
          password: data.password,
        }),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData); // Do something with the response data if needed
        localStorage.setItem("JWT",response.token);
        navigate({pathname:"/"});
      } else {
        const errorData = await response.json();
        console.error(errorData); // Log the error data if there's an issue with the request
        setErrorMessage(errorData.message);
      }
    } catch (error) {
      console.error("Error occurred while making the request:", error);
    }
  };

  return (
    <FormProvider {...methods}>
        <Navbar />

      <form
        className="w-full flex justify-center items-center h-screen bg-base-200"
        onSubmit={methods.handleSubmit(submit)}
      >
        <div className="card card-side bg-base-100 shadow-xl w-2/6">
          <div className="card-body border-2 border-slate-700 rounded-3xl">
            <p className="font-bold text-lg text-slate-700"></p>
            <Input label={"Email"} type={"text"} placeholder="Exemple@exemple.com" refreg="email" />
            <Input label={"Nom"} type={"text"} placeholder="John Doe" refreg="nom" />
            <Input label={"Mot de passe"} type={"password"} placeholder="* * * * * *" refreg="password" />
            {errorMessage && <Alert message={errorMessage} />}
            <div className="card-actions justify-end">
              <button className="btn btn-primary">REGISTER</button>
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default Login;
