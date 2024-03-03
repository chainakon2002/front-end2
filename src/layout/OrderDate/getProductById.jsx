import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom'; // Import Link from react-route
import './getProduct.css'


export default function ProductDetail() {
  const [product, setProduct] = useState({});
  const { id } = useParams();

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

  const handleOrder = () => {
    console.log(`Ordering product with ID ${product.id}`);
  };

  const handleAddToCart = () => {
    console.log(`Adding product with ID ${product.id} to cart`);
  };

  return (
    <div className="product-container ">
      
  <div className="product-image-container">
    <img src={product.file} alt="" className='product-image' />
  </div>
  <div className='className="product-details-container'>
    <h2 className='name'>{product.ItemName}</h2>
    <div className='product-details'>
    <p className='det'> <br /> {product.description}</p>
    <br />
    <br />
    <p className='price'>ราคา: {product.price}</p>
    <br/>
    <br/>
    

    <button className='btn-hover color-9' onClick={handleOrder}>Add To Cart</button>
    <Link to={`/payment/${product.id}/Fs2224SbaRel2Ncvn123444Bncceddd101Mx12Z01`}>
    <button className='button2'>ซื้อเลย</button>
        </Link>
    
    </div>
    </div>
    
    
  


        
        
        
        {/* เพิ่มลิงก์ไปยังหน้าชำระเงิน */}
        {/* <Link to={`/payment/${product.id}`} className="payment-link">
          <button>ชำระเงิน</button>
        </Link> */}
        
        {/* <Link to={`/payment/${product.id}`} className="">
        <button>ชำระเงิน</button>
        </Link> */}
   
    </div>

    
  );
}
