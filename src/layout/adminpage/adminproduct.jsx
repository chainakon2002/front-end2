import axios from 'axios'
import {useState} from "react";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

export default function adminproduct() {

  const navigate = useNavigate()

  const [input, setInput] = useState({
    ItemName : '', 
    price : '',
    description : '',
    restaurantsId : '',
    file : '',
  })

  const hdlChange = e => {
    setInput( prv => ( { ...prv, [e.target.name] : e.target.value } ) )
  }
  

  const hdlSubmit = async e => {
    try {
      e.preventDefault()

      const rs = await axios.post('http://localhost:8889/auth/product', input)
      console.log(rs)
      if(rs.status === 200) {
        Swal.fire({
          title: "เพิ่มข้อมูลเรียบร้อย",
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
        navigate('/home')
      }
    }catch(err) {
      console.log( err.message)
    }

  }
  return (
    <div className="flex flex-col items-center ">
      <div className="text-3xl mb-5"></div>
      <form className="flex h-[calc(100vh-95px)] flex-col justify-center items-center outline-none border-10 w-[30rem] h-[30rem] rounded-lg shadow-md  mt-20 transition duration-500 ease-in-out transform" onSubmit={hdlSubmit}>
      <p className=" font-semibold text-base text-[#5473E3] text-center ">เพิ่มสินค้า</p>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">ชื่อสินค้า</span>
          </div>
          <input
            type="text"
            className="input input-bordered w-full max-w-xs"
            name="ItemName"
            value={input.ItemName}
            onChange={ hdlChange }
          />
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">ราคา</span>
          </div>
          <input
            type="int"
            className="input input-bordered w-full max-w-xs"
            name="price"
            value={input.price}
            onChange={ hdlChange }
          />
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">รายละเอียด</span>
          </div>
          <input
            type="text"
            className="input input-bordered w-full max-w-xs"
            name="description"
            value={ input.description }
            onChange={ hdlChange }
          />

</label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">id ร้าน</span>
          </div>
          <input
            type="String"
            className="input input-bordered w-full max-w-xs"
            name="restaurantsId"
            value={ input.restaurantsId }
            onChange={ hdlChange }
          />


        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">ตำแหน่งรูปภาพ</span>
          </div>
          <input
            type=" text"
            className="input input-bordered w-full max-w-xs"
            name="file"
            value={input.file}
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