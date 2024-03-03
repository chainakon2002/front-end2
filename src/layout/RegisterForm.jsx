import axios from 'axios'
import {useState} from "react";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

export default function RegisterForm() {

  const navigate = useNavigate()

  const [input, setInput] = useState({
    username : '', 
    password : '',
    confirmPassword : '',
    email : ''
  })


  const hdlChange = e => {
    setInput( prv => ( { ...prv, [e.target.name] : e.target.value } ) )
  }

  const hdlSubmit = async e => {
    try {
      e.preventDefault()
      // validation
      if(input.password !== input.confirmPassword) {
        return alert('Please check confirm password')
      }
      const rs = await axios.post('http://localhost:8889/auth/register', input)
      console.log(rs)
      if(rs.status === 200) {
        Swal.fire({
          title: "สมัครสมาชิกเรียบร้อย",
          showClass: {
            popup: `
              animate__animated
              animate__fadeInUp
              animate__faster
            `
          },
          hideClass: {
            popup: `
              animate__animated
              animate__fadeOutDown
              animate__faster
            `
          }
        });
        navigate('/')

      }
    }catch(err) {
      console.log( err.message)
    }


  }

  return (
    <div className="flex flex-col items-center ">
      <div className="text-3xl mb-5"></div>
      <form className="flex h-[calc(100vh-95px)] flex-col justify-center items-center outline-none border-10 w-[30rem] h-[30rem] rounded-lg shadow-md  mt-20 transition duration-500 ease-in-out transform" onSubmit={hdlSubmit}>
      <p className=" font-semibold text-base text-[#5473E3] text-center ">Register</p>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">username</span>
          </div>
          <input
            type="text"
            className="input input-bordered w-full max-w-xs"
            name="username"
            value={input.username}
            onChange={ hdlChange }
          />
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">E-mail</span>
          </div>
          <input
            type="email"
            className="input input-bordered w-full max-w-xs"
            name="email"
            value={input.email}
            onChange={ hdlChange }
          />
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">password</span>
          </div>
          <input
            type="password"
            className="input input-bordered w-full max-w-xs"
            name="password"
            value={ input.password }
            onChange={ hdlChange }
          />
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Confirm Password</span>
          </div>
          <input
            type="password"
            className="input input-bordered w-full max-w-xs"
            name="confirmPassword"
            value={input.confirmPassword}
            onChange={ hdlChange }
          />
        </label>
        <div className="flex gap-5 ">
          <button type="submit" className="btn btn-outline btn-info mt-7">Submit</button>
          
        </div>
      </form>
    </div>
  );
}
