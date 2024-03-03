
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
<div className="">
      <div className="flex flex-col justify-center items-center py-10">
        <div className="">
          <p className="text-[50px] font-semibold text-center">Admin</p>
        </div>
       
        <div className="container mx-auto mt-10 p-4 rounded-lg ">
          {payment.map((item) => (
            <div key={item.id} className="rounded-xl border p-4">
               <div className="flex items-center justify-between border-b border-gray-200 pb-9 mb-2">
                <div className='flex items-center'>
                <p className="font-semibold">{item.username}</p>
                <p className="text-gray-600">{item.productname}</p>
                  <div>
                    
                  </div>
                </div>
                <div className="button-group">
                  <button className="text-red-500 font-semibold" onClick={{}}>ลบ</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
)
}
