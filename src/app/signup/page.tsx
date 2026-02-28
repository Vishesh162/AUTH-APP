"use client";
import Link from "next/link";
import React,{useEffect} from "react";
import {useRouter} from "next/navigation";
import  axios  from "axios";    




export default function SignupPage(){
  const router=useRouter();
  const [user,setUser]=React.useState({
    username:"",
    email:"",   
    password:""
  });
  const [buttonDisabled,setButtonDisabled]=React.useState(false);
  const[loading,setLoading]=React.useState(false); 




  const onSignup=async()=>{
    try {
      setLoading(true);
      const response = await axios.post("/api/signup", user);
      console.log("Signup success:",response.data);
      router.push("/login");

  } catch (error: any) {

    console.log("Signup error:",error);
    }
    finally{
      setLoading(false);
    }
  }

  useEffect(()=>{
    if(user.email.length>0 && user.password.length>0 && user.username.length>0){
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    } 
  },[user]);



  return (
    <div className="flex  flex-col items-center justify-center min-h-screen bg-zinc-50 font-sans dark:bg-black">
      <h1 className="text-center text-white text-2xl mb-4">{loading?"Processing":"Signup"}</h1>
      <input
        type="text"
        placeholder="Username"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        className="mb-2 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"  
      />
      <input
        type="email"
        placeholder="Email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        className="mb-2 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="password" 
        placeholder="Password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        className="mb-4 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={onSignup}
        className="mb-4 px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition-colors"
      >
        {buttonDisabled ? "Fill all fields" : "Signup"}
      </button>
      <p className="text-sm text-gray-600">
        Already have an account?{" "}
        <Link href="/login" className="text-blue-500 hover:underline">
          Login here
        </Link>
      </p>
    </div>

  );
}