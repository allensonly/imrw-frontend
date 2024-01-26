import React from 'react'
import Stars from './Star';
import { Col, Row } from 'react-bootstrap'
import { baseUrl } from '../services/baseUrl';
import './RateCard.css'



function RateCard({ratecard,profilephoto}) {

  
  return (
    <>

    

         

         <div  className='ratecard rounded me-2 ms-1 mt-1  ' style={{backgroundColor:'whitesmoke' }}>
        <div className='d-flex justify-content-between align-items-between'>
         <div className='me-5'>
           <h4 style={{color:"black"}}>{ratecard.userName}</h4>

           <p className='fs-3 text-danger'>{ratecard.movieName}</p>
           
           <p className='text-danger mt-3'>{ratecard.rating}/10</p>
           
         </div>
         <div >
          {ratecard.profile == ""?
           <img className=' me-0 p-1  rounded-circle' style={{width:'200px' , height:'200px'}}  src="https://i.pinimg.com/736x/a9/62/ef/a962ef5ea8dfa25418c0a2b0057a64d4.jpg" alt="no image" />:
           <img className=' me-0 p-1  rounded-circle' style={{width:'200px' , height:'200px'}}  src={`${baseUrl}/uploads/${ratecard.profile}`} alt="no image" />
          }
         </div>
            
        </div>
        <div className='mb-3'>
        <Stars/>
        </div>

         </div>

     

   


    </>
  )
}

export default RateCard