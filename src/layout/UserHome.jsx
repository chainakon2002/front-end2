// import axios from 'axios'
// import {useEffect, useState} from 'react'
// import Banner from "../components/Banner/Banner";
// import Promote from "../layout/Promote"

// export default function UserHome() {
//   const [todos, setTodos] = useState([])

//   useEffect( ()=>{
//     const run = async()=>{
//       let token = localStorage.getItem('token')
//       const rs = await axios.get('http://localhost:8889/todos', {
//         headers : { Authorization : `Bearer ${token}`}
//       })
//       setTodos(rs.data.todos)
//     }
//     run()
//   }, [] )






//   return (
//     <>
//     <div></div>
//     {/* { JSON.stringify(todos)} */}
//     <Promote />
//     </>
//   )
// }

// import axios from "axios";
// import { useEffect, useState } from "react";
// import TodoCard from "../components/TodoCard";
// import ModalEdit from "../components/ModalEdit";

// export default function UserHome() {
//   //const [todos, setTodos] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [editIdx, setEditIdx] = useState(-1)
//   const [trigger, setTrigger] = useState(false)

//   useEffect(() => {
//     const run = async () => {
//       let token = localStorage.getItem("token");
//       const rs = await axios.get("http://localhost:8889/product/landing", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setProducts(rs.data.products);
//     };
//     run();
//   }, [trigger]);

//   const openModal = (id) => {
//     let idx = products.findIndex( el=> el.id === id)
//     setEditIdx(idx)
//     document.getElementById("my_modal_2").showModal()
//   }

//   const closeModal = () => {
//     document.getElementById("my_modal_2").close()
//   }

//   return (
//     <div className="flex flex-col gap-4">
//       <div className="text-center text-2xl text-blue-500">Your jobs</div>
//       {/* <ModalEdit el={products[editIdx]} closeModal={closeModal} setTrigger={setTrigger}/> */}
//       <div className="flex gap-4">
//         {products.map((el) => (
//           <TodoCard key={el.id} el={el} openModal={openModal} setTrigger={setTrigger}/>
//         ))}
//       </div>
//     </div>
//   );
// }


import axios from 'axios';
import { useEffect, useState } from 'react';
import './css/UserHome.css'
import Promote from "../layout/Promote"
import { Link } from 'react-router-dom'; // นำเข้า Link จาก react-router-dom



export default function UserHome() {
  const [menutems, setMenutems] = useState([]); // ปรับเปลี่ยนตัวแปร products เป็น menutems

  useEffect(() => {
    const fetchMenutems = async () => { // ปรับเปลี่ยนชื่อฟังก์ชันเป็น fetchMenutems
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8889/auth/getmenutems', {
          headers: { Authorization: `Bearer ${token}` } 
        });
        
        setMenutems(response.data);
      } catch (error) {
        console.error('Error fetching menutems:', error);
      }
    };

    fetchMenutems();
  }, []); 

  return (
    <div className="user-home-container">
      
      <div className='poster'>
      <Promote />
      {/* <img src="/src/assets/c9txfl (1).png" alt="" className="" /> */}
      
      {/* <Proster/> */}
      </div>
      {menutems.map((item) => (
        <div key={item.id} className="product-item">
           <Link to={`/product/${item.id}`}>
          <img src={item.file} alt="" />
          {/* <p className='product-file'>{mm}</p> */}
          <hr />
          <h3 className=" font-semibold product-title">{item.ItemName}</h3>
          {/* <p className="product-description">{item.description}</p> */}
          <p className="font-semibold product-price">ราคา: {item.price}</p>
          {/* <p className="product-stock">Stock: {item.stock}</p> */}
          </Link>
          {/* <p className="product-category">Category ID: {item.restaurantsId}</p> */}
          <div className="button-group">
          </div>
        </div>
      ))}
    </div>
  );
}
