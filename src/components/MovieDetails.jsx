import React, { useContext } from 'react'
import { Col, Row } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState,useEffect } from 'react';
import Stars from './Star';
import Header from './Header';
import Moviecard from './Moviecard';
import { Link } from 'react-router-dom';
import {  editprofileAPi, getAllMovieApi, getImrwRatingApi, getRateCardApi, getmovieratingApi, rateMovieApi, updateprofileAPi } from '../services/allApi';
import { changeMainmovieImageResponseContext, uploadRatingResponseContext } from '../Context/ContextShare';
import { toast } from 'react-toastify';
import RateCard from './RateCard';
import { baseUrl } from '../services/baseUrl';
import './MovieDetails.css'

function MovieDetails() {


  //profile update

  const [userProfile,setUserProfile] = useState({
    username:"",
    email:"",
    password:"",
    profile:""
  })

  const [isUpdate,setIsUpdate] = useState(false)

  const [existingImage,setExistingImage] = useState("")

  const [preview,setPreview] = useState("")

  useEffect(() => {
          const user = JSON.parse(sessionStorage.getItem("existingUser"))
          console.log(user);

          setUserProfile({...userProfile,username:user.username,email:user.email,password:user.password,profile:""})

          setExistingImage(user.profile)
  },[isUpdate])

  useEffect(() => {
    if(userProfile.profile){
      setPreview(URL.createObjectURL(userProfile.profile))
    }
    else{
      setPreview("")
    }
  },[userProfile.profile])

  
    // update profile to ratecard

    const updateProfileToRatecard = async () => {

      const {profile} = userProfile
  
      const reqBody = new FormData()
      preview?reqBody.append("profile",profile):reqBody.append("profile",existingImage)

      const token = sessionStorage.getItem("token")

      const reqHeader ={
        "Content-Type" : "multipart/form-data",
        "Authorization" : `Bearer ${token}`  
      }

    
      const result2 = await updateprofileAPi(reqBody,reqHeader)
      console.log(result2);

    

    }




  const handleProfileUpdate = async () => {
    const {username,email,password,profile} = userProfile

    if(!profile){
      toast.info("please upload a photo")
    }
    else{
      const reqBody = new FormData()
      reqBody.append("username",username)
      reqBody.append("username",email)
      reqBody.append("username",password)
      preview?reqBody.append("profile",profile):reqBody.append("profile",existingImage)


    

    const token = sessionStorage.getItem("token")

    if(preview){
      const reqHeader ={
        "Content-Type" : "multipart/form-data",
        "Authorization" : `Bearer ${token}`  
      }

      const result = await editprofileAPi(reqBody,reqHeader)
      console.log(result);


      if(result.status === 200){
        toast.success("profile photo updated successfully")
        sessionStorage.setItem('existingUser',JSON.stringify(result.data))
        setIsUpdate(true)
      }
      else{
        console.log(result.response.data);
      }
    }
    else{
      const reqHeader = {
        "Content-Type" : "application/json",
        "Authorization" : `Bearer ${token}`
      }

      const result = await editprofileAPi(reqBody,reqHeader)
      console.log(result);

      if(result.status === 200){
        toast.success("profile photo updated successfully")
        sessionStorage.setItem('existingUser',JSON.stringify(result.data))
        setIsUpdate(true)
      }
      else{
        console.log(result.response.data);
      }
    }
  }
  updateProfileToRatecard()
  }

  // movierating

  const [rateCardMovie,setRateCardMovie] = useState([])


  const [rating,setRating] = useState([])
  console.log(rating);

   const [ratedMovieDetails,setRatedMovieDetails] = useState({
   
    movieId:""
  })
 // console.log(ratedMovieDetails.movieId); 
 // console.log(movieid);

  const {ratingDetails,setRatingDetails} = useContext(uploadRatingResponseContext)
  //console.log(ratingDetails);

  const movieid = ratedMovieDetails.movieId
  console.log(movieid);

  const render = () => {
    setRatedMovieDetails({ratedMovieDetails,movieId:ratingDetails.movieId})

  }
  useEffect(() => {
      render()
  },[ratingDetails])

  useEffect(() => {
       getEachRateCardDetails(movieid)
       getAllMovieRating(movieid)
  },[ratedMovieDetails])


  

  const handleRate = async() => {
    
    const result = await rateMovieApi(ratingDetails)
   console.log(result);

  // console.log(ratingDetails)

 
   if(result.status == 200){
    toast.success(result.data)

    setRatingDetails({
      userId:"",
      userName:"",
      movieId:"",
      movieName:"",
      rating:"",
      profile:""
    })
   }
   else{
    toast.error(`${result.response.data}`)
   } 

   const result2 = await getImrwRatingApi(ratedMovieDetails)
   
 
   getEachRateCardDetails(movieid)
   getAllMovieRating(movieid)
  handleClose()
  updateProfileToRatecard()
  

  
  }

  


  //movie details
  

  const {changeMainImage,setChangeMainImage} = useContext(changeMainmovieImageResponseContext)
 console.log(changeMainImage);



  
  
  //console.log(changeMainImage.trailer);

  const [searchKey,setSearchKey] = useState('')
  const [allMovie,setAllMovie] = useState([])


  

  const getAllMovie = async() =>{
    const result = await getAllMovieApi(searchKey)
    console.log(result.data);
    setAllMovie(result.data)
  }

  useEffect(() => {
    getAllMovie()
    
    
  },[searchKey])


 
    
  

  

  const getAllMovieRating = async (movieid) =>{

    const token = sessionStorage.getItem('token')

   const reqHeader = {
    "Content-Type" : "application/json",
    "Authorization" : `Bearer ${token}`
  }

    const result = await getmovieratingApi(movieid,reqHeader)
    console.log(result.data)
   

   setRating(result.data)

  }

  const getEachRateCardDetails = async (movieid) => {
    const result  = await getRateCardApi(movieid)
    console.log(result.data);
    
    setRateCardMovie(result.data)
  }
  

  
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  return (
    <>
    <Header movieDetails/>

   

    <div className='container'>



       
            <div  className=' d-flex justify-content-center'>
      
            <div className='mt-4 '>

              <label htmlFor="profile" className='align-items-center d-flex justify-content-center'>
              < input id='profile' type="file" style={{display:'none'}}  onChange={(e) => 
                setUserProfile({...userProfile,profile:e.target.files[0]})
              }/>

              {existingImage == "" ?
               <img  className='rounded-circle' style={{width:'200px' , height:'200px'}}  src={preview?preview:"https://i.pinimg.com/736x/a9/62/ef/a962ef5ea8dfa25418c0a2b0057a64d4.jpg"} alt="no image" /> :
               <img  className='rounded-circle ' style={{width:'200px' , height:'200px'}}  src={preview?preview:`${baseUrl}/uploads/${existingImage}`} alt="no image" /> 
              
              } 

        



              </label>
              <div className='align-items-center d-flex justify-content-center'>
            <button className='btn btn-danger ' onClick={handleProfileUpdate}>update profile</button>
            </div>

              <button className='btn'><Link to={'/movie-add'}><i class="fa-solid fa-cloud"></i></Link></button>
              
            </div>

            
            </div>

            <div className='mt-5'>
                <p className='fs-2'>{changeMainImage.moviename}</p>
                <p>{changeMainImage.yearofrealease}</p>
            </div>



            

          <div className='justify-content-between d-flex'>
            <div className='mt-5 '>
            <div className='d-flex flex-column'>
                <p className='fs-4'>Rate :  <button className='btn p-0' onClick={handleShow}><i class="fa-solid fa-star fa-2xl  "style={{color:'white', fontSize:'70px'}}></i>
                 </button> </p>
                

                <div className='d-flex mt-1'><i class="fa-solid fa-star fa-2x mt-2 me-1 "style={{color:'red'}}></i><p className=' mt-2 me-5 ' >{rating?rating.map((e) => e.rating): "not rated"} / 10</p>
                 </div>
                </div>

            </div>



            <div className='mt-5 '>
                <div className='d-flex flex-column'>
                <p className='fs-5'>IMRw rating : </p>
                <div className='d-flex mt-1'><i class="fa-solid fa-star fa-2x mt-2 me-1 "style={{color:'red'}}></i><p className=' mt-2 me-5' >{changeMainImage.imrwRating?changeMainImage.imrwRating:'*.*'} / 10</p>
                 </div>
                </div>

               

            </div>
            

        </div>

        <Row className=' bg-dark'>
          {Object.keys(changeMainImage).length === 0?
          <Col>
                  <div className='align-items-center justify-content-center d-flex flex-column' >
                    
                    <img className='w-100' style={{height:"455px"}} src="https://www.newsviewsnetwork.com/wp-content/uploads/2012-movie-collage31-scaled.jpg" alt="" />
                     
                    <p style={{color:'white'}} className='mt-2 fs-4'>Tap on moviecard to rate the movie <i class="fa-solid fa-arrow-down fa-2xl"></i></p>
                     
                  </div>
          </Col>

          :
          <>
            <Col sm={12} md={4}  >

                <img style={{height:'455px', zIndex:'-1'}} className='w-100 p-3 mt-3' src={changeMainImage.image} alt="no image" />
                
            
            
            </Col>

            <Col sm={12} md={8} >

            <iframe className='mt-4 w-100'  height="435" src={changeMainImage.trailer} title="Official Trailer: Disney&#39;s Maleficent: Mistress of Evil - In Theaters October 18!" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            
            
            
            </Col>
            </>
            }



        </Row>

        

       { Object.keys(changeMainImage).length === 0?
       null :
       <>
       <div className='mt-4'>
          <h5>Director :</h5> <p>{changeMainImage.director}</p>
        </div>
        <div>
          <h5>Actors :</h5><p>{changeMainImage.actor}</p>
        </div>
        </>}

       
        <Row  className='row mt-5'>
        <h2>Movie & Ratings:</h2>
        <div className='movierow '>
          
        {
          rateCardMovie?.length>0?
          rateCardMovie.map((item) => (<div className='movies'> <RateCard ratecard = {item} profilephoto = {existingImage} /> </div>))

          :
          null
        }
        </div>
      

        

        </Row>
      
       
       
      <div className='align-items-center d-flex justify-content-center mt-5 '>
        <input className='p-2 rounded shadow' value={searchKey} onChange={(e) => {setSearchKey(e.target.value)}} type="text" placeholder='Search your movie ' />
        <button className='btn btn-light p-1 ms-1'><i class="fa-solid fa-magnifying-glass fa-2x"></i></button>
      </div>

        <Row className=' mb-5 align-items-center justify-content-center mt-5'>
          <h2>Recent Releases:</h2>

        {allMovie?.length>0?
        allMovie.map((item) => (

          <Col sm={12} md={4} lg={3}  className='d-flex   ms-2  mt-5' >
          
          <Moviecard movie={item}/>
          
          
          </Col>
        ))
        :null

        

       }
       </Row>

    </div>

    <Modal show={show} onHide={handleClose} className='w-75'>
        <div className='d-flex justify-content-center align-items-center '><i class="fa-solid fa-star fa-2xl  "style={{color:'red'}}></i></div>

        <Modal.Header closeButton >
        </Modal.Header >
        <div className='d-flex justify-content-center align-items-center'><h4>{changeMainImage.moviename}</h4></div>

        <Modal.Body className='d-flex justify-content-center align-items-center p-3'>
      

             <Stars  />

        
        </Modal.Body>
        <Modal.Footer >
          <Button variant="dark" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={handleRate}>
            RATE
          </Button>
        </Modal.Footer>
      </Modal>
    
    
    
    
    </>
  )
}

export default MovieDetails