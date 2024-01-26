import React, { useContext, useEffect } from 'react'
import Card from 'react-bootstrap/Card';
import { Col, Row } from 'react-bootstrap';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Stars from './Star';
import { useNavigate } from 'react-router-dom';
import { changeMainmovieImageResponseContext, uploadRatingResponseContext } from '../Context/ContextShare';
import { rateMovieApi } from '../services/allApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Moviecard({movie}) {

 


  const navigateUrl =useNavigate()

  const {changeMainImage,setChangeMainImage} = useContext(changeMainmovieImageResponseContext)

  const {ratingDetails,setRatingDetails} = useContext(uploadRatingResponseContext)
  //console.log(ratingDetails);




  const handleImageChange = () => {
    
   
       const image = movie.sidemovieimage
       const trailer = movie.trailer
       const moviename = movie.moviename 
       const yearofrealease=movie.yearofrealease
       const director=movie.director
       const actor=movie.actor
       const imrwRating=movie.imrwRating

       //console.log(movie._id);
       //console.log(movie.moviename);
       const user = sessionStorage.getItem('existingUser')
       const userObject = JSON.parse(user)
       
       //console.log(userObject._id);

       //console.log(userObject.username);

      const rateDetails = {
        userId:userObject._id,
      userName:userObject.username,
      movieId:movie._id,
      movieName:movie.moviename
      }

      setRatingDetails(rateDetails)
       
       
      
       const moviedetailes = {
        image:image,
        trailer:trailer,
        moviename:moviename,
        yearofrealease:yearofrealease,
        director:director,
        actor:actor,
        imrwRating:imrwRating
       }

       
      

       setChangeMainImage(moviedetailes)

       window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });

      navigateUrl('/movie')
  }

  const handleChange = () => {
    const user = sessionStorage.getItem('existingUser')


    if(user == null){
      toast.info("please login")
    }
    else{
      handleImageChange()
    }
  }



 


 


  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCardRate = () => {
    const user = sessionStorage.getItem('existingUser')


    if(user == null){
      toast.info("please login")
    }
    else{
      toast.info('please click on image you will be directed to rating option')
    }

    handleClose()
  }


  return (
    <>

   


           <Card style={{ width: '26rem' ,height:'18rem' }} className='border  ' >
          <Card.Img variant="top" onClick={handleChange} style={{height:'18rem'}} src={movie.mainmovieimage} />
          <div className='d-flex border border-2' style={{backgroundColor:'black'}}>
          <i class="fa-solid fa-star fa-2x mt-2 me-1 "style={{color:'red'}}></i><h4 className=' mt-2 me-5' >{movie.imrwRating?movie.imrwRating:'*.*'}</h4>

          <p className='mt-3'>rate :</p><button className='btn p-0' onClick={handleShow}><i class="fa-solid fa-star fa-2x  "style={{color:'white'}}></i>
           </button>
          </div>
           
           
           <Card.Body className='bg-white text-dark p-0 '>


         <div className='d-flex justify-content-between'>
         <Card.Title className='t d-flex justify-content-between' style={{color:'black'}}>{movie.moviename}</Card.Title>
          

          <Card.Text className='text-dark'>
          {movie.genre} <span >{movie.yearofrealease}</span>
          </Card.Text>
         </div>

          
          </Card.Body>
          </Card>
         




        <Modal show={show} onHide={handleClose} >
        <div className='d-flex justify-content-center align-items-center '><i class="fa-solid fa-star fa-2xl  "style={{color:'red'}}></i></div>

        <Modal.Header closeButton >
        </Modal.Header >
        <div className='d-flex justify-content-center align-items-center'><h4>{movie.moviename}</h4></div>

        <Modal.Body className='d-flex justify-content-center align-items-center p-3'>
      

             <Stars/>

        
        </Modal.Body>
        <Modal.Footer >
          <Button variant="dark" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={handleCardRate} >
            RATE
          </Button>
        </Modal.Footer>
      </Modal>
    
    
      <ToastContainer autoClose={2000} theme='colored' position='top-center'/>

    </>
  )
}

export default Moviecard