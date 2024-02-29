import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
const Deletepro = async (menutemsId) => {
    try {
        const re = await axios.delete('http://localhost:8889/menutems/delete/${menutemsId}');
        if (re.status === 200) {
        }

    } catch (error) {
        alert(error.message)
        
    }
};