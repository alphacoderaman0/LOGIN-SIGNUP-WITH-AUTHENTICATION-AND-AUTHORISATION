"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Signup() {
  //toggle eye functioality starts
  function toggle(){
    try {
        const passIn = document.getElementById('password');
        const type = passIn.getAttribute('type') ==='password' ? 'text' : 'password';
        passIn.setAttribute('type', type);
      } catch (error) {
      }
    }
  // toggle eye functionality ends
  // Handle Signup Starts
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const router = useRouter();
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      if (formData.name.length <=2) {
        alert("Name Must Be of at Least 3 Character !")
      }
      else if(formData.name==parseInt(formData.name)){
        alert("Name Must include only letters not number !")
      }
      else if (formData.password<=5){
        alert("Password Must be of at least 6 character !")
      }
      else {
        const res = await fetch('/api/signup', {
          method: 'POST',
          body: JSON.stringify(formData),
          headers: { 'Content-Type': 'application/json' },
        });
        const data = await res.json();
        if (res.ok) {
          alert("User Registered Successfully");
          router.push('/pages/Login');
        } else {
          alert(data.message || 'invalid Credentials');
        }
      }
    } catch (error) {
      alert(error);
    }
    
  };
  // Handle Signup ends

  return (
      <div className="px-4 flex justify-center w-full ">
      {/* main Div Starts */}
      <div className="max-w-lg w-full bg-gradient-to-r from-blue-800 to-purple-600 rounded-xl shadow-2xl overflow-hidden p-8 space-y-8">
            {/* heading starts */}
            <h2 className="text-center text-4xl font-extrabold text-white">
              Welcome
            </h2>
            <p className="text-center text-gray-200">
              Create an Account
            </p>
            {/* heading ends */}

            {/* form starts */}
            <form onSubmit={handleSignup} className="space-y-6">
              {/* input Starts */}
              <div className="relative">
                <input
                  placeholder="Enter your name"
                  className="peer h-10 w-full border-b-2 border-gray-300 text-white bg-transparent placeholder-transparent focus:outline-none focus:border-purple-500"
                  required
                  id="name"
                  name="name"
                  type="text"
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  // value={addUser.name}
                />
                <label
                  className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-purple-500 peer-focus:text-sm"
                  htmlFor="name"
                >
                  Name
                </label>
              </div>
              <div className="relative">
                <input
                  placeholder="john@example.com"
                  className="peer h-10 w-full border-b-2 border-gray-300 text-white bg-transparent placeholder-transparent focus:outline-none focus:border-purple-500"
                  required
                  id="email"
                  name="email"
                  type="email"
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  // value={addUser.email}
                />
                <label
                  className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-purple-500 peer-focus:text-sm"
                  htmlFor="email"
                >
                  Email address
                </label>
              </div>
              <div className="relative">
                {/* toggle btn starts */}
              <p onClick={toggle} id="togglebtn" className='grayscale hover:grayscale-0 absolute top-2 left-96'><img src="/eye.png" alt="eye" width={30} /></p>
                {/* toggle btn ends */}
                <input
                  placeholder="Password"
                  className="peer h-10 w-full border-b-2 border-gray-300 text-white bg-transparent placeholder-transparent focus:outline-none focus:border-purple-500"
                  required
                  id="password"
                  name="pass"
                  type="password"
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })} 
                  // value={addUser.pass}
                />
                <label
                  className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-purple-500 peer-focus:text-sm"
                  htmlFor="password"
                >
                  Password
                </label>
              </div>
              {/* input ends */}
              {/* button starts */}
              <button
                className="w-full py-2 px-4 bg-purple-500 hover:bg-purple-700 rounded-md shadow-lg text-white font-semibold transition duration-200"
                type="submit"
              >
              Sign up
              </button>
              {/* button ends */}
            </form>
            {/* form ends */}

            {/* other starts */}
            <p className="text-center text-lg text-gray-200">
              -OR-
            </p>
            <button className="w-full py-2 px-4 bg-purple-500 hover:bg-purple-700 rounded-md shadow-lg text-white font-semibold transition duration-200">
              <a href="/pages/Login">Login with existing Account</a>
            </button>
            {/* other ends */}
      </div>
      {/* main div ends */}
      </div>
  );
}
