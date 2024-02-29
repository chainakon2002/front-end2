
import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function AdminHome() {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8889/auth/getmenutems', {
          headers: { Authorization: `Bearer ${token}` } 
        });
        setMenuItems(response.data);
      } catch (error) {
        console.error('Error fetching menu items:', error);
      }
    };

    fetchMenuItems();
  }, []); 
}
