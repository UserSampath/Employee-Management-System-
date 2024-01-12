import React, { useState, useEffect } from 'react';
import Navbars from '../../components/NavBar/Navbar';
import Carousel from 'react-bootstrap/Carousel';
import Modals from '../../components/Modal/Modal';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { SlArrowRight } from "react-icons/sl";import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { SlArrowLeft } from "react-icons/sl";
const SlideShow = () => {
  const [index, setIndex] = useState(0);
  const [modalData, setModalData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/api/member/getMembers')
      .then(response => {
        setModalData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data from the backend:', error);
      });
  }, []); 

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const navigate = useNavigate();

  const navigateToAdminPage = () => {
    navigate('/'); 
  };

  const handlePrev = () => {
    setIndex(index - 1);
  };

  const handleNext = () => {
    setIndex(index === modalData.length - 1 ? 0 : index + 1);
  };

  return (
    <div>
      <Navbars />
      <div className='d-flex justify-content-center align-items-center vh-100'>
      <div
          style={{
            position: 'absolute',
            top: '10%',
            left: '5%', 
            cursor: 'pointer',
          }}
          onClick={navigateToAdminPage}
        >
          <FaArrowLeft size={30} />
        </div>
        <div
          style={{
            position: 'absolute',
            top: '50%', 
            left: '5%', 
            cursor: 'pointer',
          }}
          onClick={handlePrev}
        >
          <SlArrowLeft size={30} />
        </div>

        <Carousel activeIndex={index} onSelect={handleSelect} controls={false} wrap={true}>
          {modalData.map((data, i) => (
            <Carousel.Item key={i}>
              <Modals data={data} />
            </Carousel.Item>
          ))}
        </Carousel>

        <div
          style={{
            position: 'absolute',
            top: '50%', 
            right: '5%', 
            cursor: 'pointer',
          }}
          onClick={handleNext}
        >
          <SlArrowRight size={30} />
        </div>
      </div>
    </div>
  );
};

export default SlideShow;
