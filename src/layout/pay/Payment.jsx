import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './payment.css'


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
    } catch (error) {
      console.error('Error processing payment:', error);
      setErrorMessage('An error occurred while processing payment. Please try again later.');
    }
  };
  

  return (
    <div className='payment'>
      <div className="paymentMethods">
        <label>เลือกวิธีการชำระเงิน:</label>
        <p>{user.username}</p>
        <div>
          <input type="radio" id="COD" name="paymentMethod" className="radio theme-controller"value="COD" onChange={handleChange} />
          <label for="COD">ปลายทาง</label>
          <img src="/src/assets/cod.jpg" alt="COD" />
        </div>
       
      </div>
  
      <div className='paymentfrom'>
        <h2>Payment Form</h2>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <form onSubmit={handleSubmit}>
          <div className="cen">
            <br /><br />
            <img src={product.file} alt="" />
          </div>
          <div className="manu">
            <label htmlFor="productId">ชื่อเมนู :<strong> {product.ItemName }</strong>  MenuID:     </label>
            <input type="text" id="productId" name="productId" value={formData.productId = product.id} onChange={handleChange} readOnly />
          </div>
          <br />
          <br />
          <div>
          <label >Product : </label>
          <input type="text" id="productname" name="productname" value={formData.productname = product.ItemName} onChange={handleChange}  />
          </div>
          <hr />
          <br />
          <div className="amounnts">
            <div className="amount1">
              <label htmlFor="amount">Amount:  </label>
              <input type="number" id="amount" name="amount" value={formData.amount} onChange={handleChange} min="1" max="5" />
              <p>{formData.productname}</p>
            </div>
            <div className="amount2">
              <p>ราคารวม: {product.price * formData.amount}</p>
            </div>
            <div className="prices">
              <label htmlFor="price">price</label>
              <input type="text" name='price' id='price' value={formData.price = product.price * formData.amount } onChange={handleChange} readOnly/>
            </div>

          </div>
          <br /><br />
          <div className="userIds">
            <label htmlFor="userId">User ID:   </label>
            <input type="text" id="userId" name="userId" value={formData.userId = user.id} onChange={handleChange} readOnly/>
          </div>
          <div className="usernames">
              <label htmlFor="username">name: </label>
              <input type="text" name='username' id='username' value={formData.username = user.username} onChange={handleChange} readOnly/>
            </div>
          <div className="button">
            <button type="submit" className="btn btn-outline btn-success">Pay Now</button>
          </div>
        </form>
      </div>
    </div>
  );
  
  }
export default PaymentForm;
