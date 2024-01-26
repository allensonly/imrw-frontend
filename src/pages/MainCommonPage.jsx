import React, { useContext, useEffect, useState } from 'react'
import Moviecard from '../components/Moviecard';
import Banner from '../components/Banner';
import { Row, Col } from 'react-bootstrap';
import Header from '../components/Header';
import { getAllMovieApi } from '../services/allApi';


function MainCommonPage() {

  const [searchKey,setSearchKey] = useState('')

  const [allMovie,setAllMovie] = useState([])
  console.log(allMovie);



  const getAllMovie = async() =>{
    const result = await getAllMovieApi(searchKey)
    console.log(result.data);
    setAllMovie(result.data)
  }

  useEffect(() => {
    getAllMovie()
  },[searchKey])

 

  return (

    <>
    <Header/>

      <div>

 
        
        <Banner />

    

        <Row className=' mt-5 bg-danger mb-5'> <marquee behavior="onbounce" scrollAmount={14} direction="left"><h2 >Recent Releases : </h2></marquee></Row>

        <Row className=' mb-5 align-items-center justify-content-center'>

        <div className='align-items-center d-flex justify-content-center mt-5 '>
        <input className='p-2 rounded shadow' value={searchKey} onChange={(e) => {setSearchKey(e.target.value)}} type="text" placeholder='Search your movie ' />
        <button className='btn btn-light p-1 ms-1'><i class="fa-solid fa-magnifying-glass fa-2x"></i></button>
      </div>
          

        { allMovie?.length>0?
        allMovie.map((item) => ( 
        <Col sm={12} md={4} lg={3}  className='d-flex  mt-5 ms-2  ' >
          
          <Moviecard movie = {item}/>
          
          
          </Col>
          ))
        
        :
        null
        
         }
         

       </Row>

        



         

    
      

      
      
      </div>
    
    
    </>
  )
}

export default MainCommonPage