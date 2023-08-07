import { Outlet,Navigate } from "react-router-dom"
import { useEffect, useState } from "react";

export function UserAuth() {
  let [userLoggedIn, setUserLoggedIn] = useState(null);
  let [isLoading, setIsLoading] = useState(true);
  useEffect(()=>{
    let checkUser = () => {
    fetch("http://localhost:3000/api/users/verify",{
        method:"post",
        headers:{
            "Content-Type" : "application/json",
            Authorization: `Bearer ${localStorage.getItem('JWT')}`
        }
    }).then(async(res)=>{
        let response = await res.json();
        console.log(response);
        response.success === true ? setUserLoggedIn(true) : setUserLoggedIn(false)
    }).catch(err=>{
        console.error(err);
        setUserLoggedIn(false);
    }).finally(() => {
        console.log("hello bitchs");
      setIsLoading(false);
    });
    }
    checkUser();
  },[]);
  return (
    <>
    {
      !isLoading &&
      (
        !userLoggedIn?
            <Navigate to="/login" />
        :
            <Outlet />
      )
    }
    </>
  )
}