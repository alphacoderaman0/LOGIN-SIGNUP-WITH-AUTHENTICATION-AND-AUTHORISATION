"use client";
import { useState, useEffect } from "react";

export default function Dashboard() {
  //Accessing Data on Dashboard Starts
    const [user, setUser] = useState(null);
    useEffect(() => {
      const fetchUser = async () => {
      const token = localStorage.getItem("token");
      const res = await fetch('/api/dashboard', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
      });
      const data = await res.json();
      setUser(data.user);
      };
      fetchUser();
      }, []);
  //Accessing Data on Dashboard ends

  // logout functionality starts
  function handleLogout() {
    function deleteCookie(name) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      window.location.reload();
    }
    deleteCookie('token');
  }
  // logout functionality starts

  return (
       <div className="max-w-md w-full bg-gradient-to-r from-blue-800 to-purple-600 rounded-xl shadow-2xl overflow-hidden p-8 space-y-8 hover:shadow-3xl mx-4 text-white">
       <div className="leading-10 flex flex-col justify-center items-center py-4">
           <h1 className="font-bold uppercase text-2xl">
             welcome to Dashboard
           </h1>
           <h1 className="text-md font-semibold">
             You have Successfully Logged In.
           </h1>
           <p className="text-sm">
             This is an Demo Page , created using NEXTJS 
           </p>
           {user &&<p className="border-b mt-4">Name : {user.name}</p>}
           {user &&<p className="border-b mt-4">Email : {user.email}</p>}
       </div>
       <button onClick={handleLogout} className="hover:bg-red-800 rounded-2xl font-bold bg-red-600 text-white uppercase px-3 py-2 flex justify-center w-full" >Logout</button>
   </div>
);
}