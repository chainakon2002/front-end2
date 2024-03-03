
import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function AdminHome() {
  const [payment, setproduct] = useState([]); 

  useEffect(() => {
    const fetchproduct = async () => { // ปรับเปลี่ยนชื่อฟังก์ชันเป็น fetch
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8889/auth/getorder', {
          headers: { Authorization: `Bearer ${token}` } 
        });
        
        setproduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchproduct();
  }, []); 


return(
<div className="min-h-screen flex justify-center items-center">
  <div className="flex flex-col justify-center items-center py-10 w-full">
    <div className="mb-6">
      <p className="text-4xl font-semibold text-center">รายการสั่งซื้อทั้งหมด</p>
    </div>

    <div className="container mx-auto mt-10 p-4 rounded-lg bg-white shadow-lg w-full max-w-4xl overflow-hidden">
      {payment.map((item) => (
        <div key={item.id} className="rounded-xl border p-4 mb-4">
          <div className="flex items-center justify-between border-b border-gray-200 pb-2">
            <div className="flex flex-col">
              <div className="flex items-center mb-2">
                <p className="font-semibold mr-2">{item.username}</p>
                <p className="text-gray-600">({item.productname})</p>
              </div>
              <div className="flex flex-col sm:flex-row">
                <div className="mr-4 mb-2 sm:mb-0">
                  <p className="">ราคา: {item.price}</p>
                </div>
                <div>
                  <p className="">จำนวน: {item.amount}</p>
                </div>
              </div>
            </div>
            <div className="button-group">
              <button className="text-red-500 font-semibold" onClick={() => handleDelete(item.id)}>ยกเลิกคำสั่งซื้อนี้</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>



)
}
