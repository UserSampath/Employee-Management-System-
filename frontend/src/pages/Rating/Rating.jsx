import React, { useState, useEffect } from 'react';
import Navbars from '../../components/NavBar/Navbar';
import Carousel from 'react-bootstrap/Carousel';
import Modals from '../../components/Modal/Modal';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Men from "../../../image/Men.png";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa6";
const Rating = () => {
  const [index, setIndex] = useState(0);
  const [modalData, setModalData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/api/rate/getRateUsers')
      .then(response => {
        setModalData(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error fetching data from the backend:', error);
      });
  }, []); 

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };
 const handleNext = () => {
    setIndex(index + 1);
  };

  const handlePrev = () => {
    setIndex(index - 1);
  };
  return (
    <div>
      <Navbars />
      <div className='d-flex justify-content-center align-items-center vh-100'>
        <Carousel activeIndex={index} onSelect={handleSelect} >
          
          {modalData.map((data, i) => (
            <Carousel.Item key={i}>
              <Modals data={data} />
            </Carousel.Item>
          ))}
        </Carousel>'
        <div
      style={{
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center', 
      }}
    >
      <button
        onClick={handlePrev}
        disabled={index === 0}
        style={{
          borderRadius: '50%', 
          padding: '10px', 
          backgroundColor: '#fff', 
          border: '1px solid #ccc', 
          cursor: 'pointer',
          transition: 'background-color 0.3s', 
          outline: 'none', 
        }}
        onMouseOver={(e) => {
          e.target.style.backgroundColor = '#eee'; 
        }}
        onMouseOut={(e) => {
          e.target.style.backgroundColor = '#fff'; 
        }}
      >
        <FaArrowLeft />
      </button>
      <button
        onClick={handleNext}
        disabled={index === modalData.length - 1}
        style={{
          borderRadius: '50%', 
          padding: '10px', 
          backgroundColor: '#fff', 
          border: '1px solid #ccc', 
          cursor: 'pointer',
          transition: 'background-color 0.3s', 
          outline: 'none', 
        }}
        onMouseOver={(e) => {
          e.target.style.backgroundColor = '#eee'; 
        }}
        onMouseOut={(e) => {
          e.target.style.backgroundColor = '#fff'; 
        }}
      >
        <FaArrowRight />
      </button>
    </div>
      </div>
    </div>
  );
};

export default Rating;
