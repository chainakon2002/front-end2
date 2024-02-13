import axios from 'axios'
import {useState} from "react";
import useAuth from '../hooks/useAuth'

export default function LoginForm() {
  const { setUser } = useAuth()
  const [input, setInput] = useState({
    username : '', 
    password : ''
  })

  const hdlChange = e => {
    setInput( prv => ( { ...prv, [e.target.name] : e.target.value } ) )
  }

  const hdlSubmit = async e => {
    try {
      e.preventDefault()
      // validation
      const rs = await axios.post('http://localhost:8889/auth/login', input)
      console.log(rs.data.token)
      localStorage.setItem('token', rs.data.token)
      const rs1 = await axios.get('http://localhost:8889/auth/me', {
        headers : { Authorization : `Bearer ${rs.data.token}` }
      })
      console.log(rs1.data)
      setUser(rs1.data)
      
    }catch(err) {
      console.log( err.message)
    }
  }

  return (
    <div className="flex flex-col items-center ">
      {/* <div className="text-3xl mb-5">Please Login</div> */}
      <form className="flex h-[calc(100vh-95px)] flex-col justify-center items-center outline-none border-10 w-[30rem] h-[30rem] rounded-lg shadow-md  mt-20 transition duration-500 ease-in-out transform" onSubmit={hdlSubmit}>
      <p className=" font-semibold text-base text-[#5473E3] text-center ">Login to the system</p>
        <label className="form-control w-full max-w-xs">
          <div className="label">
    
          </div>
          <input
          placeholder="Username"
            type="text"
            className="input input-bordered w-full max-w-xs border-[#AEBBCD] w-[25rem] mt-5 block peer rounded-[5px] w-[25rem]  mt-5  "
            
            name="username"
            value={input.username}
            onChange={ hdlChange }
          />
        </label>

        <label className="form-control w-full max-w-xs">
          <div className="label">
            
          </div>
          <input
            type="password"
            placeholder="Password"
            className="input input-bordered w-full max-w-xs border-[#AEBBCD] w-[25rem] mt-5 block peer rounded-[5px] w-[25rem]  mt-5"
            name="password"
            value={ input.password }
            onChange={ hdlChange }
          />
        </label>

        <div className="flex gap-5 ">
          <button type="submit" className="rounded-full bg-[#3D5FD9] text-[#F5F7FF] w-[20rem] p-3 mt-8 hover:bg-[#2347C5] mb-3">Login</button>
        </div>
      </form>
    </div>
  );
}
