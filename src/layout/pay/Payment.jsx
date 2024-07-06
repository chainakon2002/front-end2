import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
// import './payment.css'
import Swal from 'sweetalert2';


const PaymentForm = () => {
  const { id } = useParams(); 
  const [formData, setFormData] = useState({
    amount: 1,
    userId: '',
    productId: '',
    username: '',
    price: '',
    productname:''

  });
  const [errorMessage, setErrorMessage] = useState('');
  const [product, setProduct] = useState({});
  const [ user, setUser] = useState({})

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:8889/auth/getproduct/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]); 

  useEffect(() => {
    const fetchUser = async () => {
      try{
        const token1 = localStorage.getItem('token')
        const response01 = await axios.get(`http://localhost:8889/auth/user`,{
          headers: {Authorization: `Bearer ${token1}`}
        })
        setUser(response01.data)
      }catch (error){
        console.error('Error fetching product:', error)
      }
    }

    fetchUser()
  }, [id])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response1 = await axios.post('http://localhost:8889/auth/payment', {
        productsId: id,
        amount: formData.amount,
        userId: formData.userId,
        productId: formData.productId,
        username: formData.username,
        price: formData.price,
        productname: formData.productname
      });
      setFormData(response1.data);
      console.log('Payment successful:', response1.data);
  
      // แสดงการแจ้งเตือนเมื่อสั่งซื้อเสร็จสิ้น
      Swal.fire({
        title: "สั่งซื้อแล้ว",
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

    } catch (error) {
      console.error('Error processing payment:', error);
      setErrorMessage('An error occurred while processing payment. Please try again later.');
    }
  };

  return (
<div className="flex justify-center">
  <div className="w-full max-w-lg">
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div className="mb-6">
        
        
        <img src="/src/assets/cod.jpg" alt="COD" className="w-24 mx-auto mt-2" />
      </div>

      <h2 className="text-center text-xl mb-4"><strong> {product.ItemName}</strong></h2>
      {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <img src={product.file} alt="" className="mx-auto" />
        </div>

        <div className="mb-4">
          <label htmlFor="productId"><strong> {product.ItemName}</strong> ID:</label>
          <input type="text" id="productId" name="productId" value={formData.productId = product.id} onChange={handleChange} readOnly className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>

        <div className="mb-4">
          <label htmlFor="productname">Product :</label>
          <input type="text" id="productname" name="productname" value={formData.productname = product.ItemName} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>

        <hr className="my-4" />

        <div className="mb-4">
          <label htmlFor="amount">Amount:</label>
          <input type="number" id="amount" name="amount" value={formData.amount} onChange={handleChange} min="1" max="5" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          {/* <p>{formData.productname}</p> */}
        </div>

        <div className="mb-4">
          <p>ราคารวม: {product.price * formData.amount}</p>
        </div>

        <div className="mb-4">
          <label htmlFor="price">price</label>
          <input type="text" name="price" id="price" value={formData.price = product.price * formData.amount} onChange={handleChange} readOnly className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>

        <div className="mb-4">
          <label htmlFor="userId">User ID:</label>
          <input type="text" id="userId" name="userId" value={formData.userId = user.id} onChange={handleChange} readOnly className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>

        <div className="mb-6">
          <label htmlFor="username">name:</label>
          <input type="text" name="username" id="username" value={formData.username = user.username} onChange={handleChange} readOnly className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>

        <div className="flex justify-center">
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">สั่งซื้อ</button>
        </div>
      </form>
    </div>
  </div>
</div>


  );
  
  }
export default PaymentForm;
