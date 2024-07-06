import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';


const Productpict = () => {
    const [orderuser, setProduct] = useState([]);
    const { userId } = useParams()
  
    useEffect(() => {
        const fetchData = async () => {
          try {
            const token = localStorage.getItem('token')
            const response = await axios.get(`http://localhost:8889/auth/userorders`, {
              headers: { Authorization: `Bearer ${token}` },
            });
            setProduct(response.data);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        }
    
        fetchData();
      }, [userId]); 
    
  
    return (
<div className="flex flex-col justify-center items-center py-10">
  <div className="mb-6">
    <p className="text-4xl font-semibold text-center">รายการสั่งซื้อ</p>
  </div>

  <div className="container mx-auto mt-10 p-4 rounded-lg bg-white shadow-lg">
    {orderuser.map(orderusers => (
      <div key={orderusers.id} className="border-b border-gray-200 py-4">
        <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-4">
          <div>
            <p className="text-lg font-semibold"> {orderusers.productname}</p>
            <p className="text-gray-600">จำนวน: {orderusers.amount} ชิ้น</p>
            <p className="text-gray-600">ราคา: {orderusers.price} บาท</p>
            
          </div>
          <div>
            {/* <button className="bg-red-500 text-white px-4 py-2 rounded-xl" onClick={() => handleDelete(orderusers.id)}>ยกเลิก</button> */}
          </div>
        </div>
      </div>
    ))}
  </div>
</div>

  );
    
}

export default Productpict