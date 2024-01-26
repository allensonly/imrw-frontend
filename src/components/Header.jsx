import React, { useContext, useState } from 'react'
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { Link, useNavigate } from 'react-router-dom';
import MovieDetails from './MovieDetails';
import { useCol } from 'react-bootstrap/esm/Col';
import { isAuthTokenContext } from '../Context/ContextShare';

function Header() {

  const {isAuthToken,setIsAuthToken} = useContext(isAuthTokenContext)

  const user = sessionStorage.getItem("existingUser")
  console.log(user);

  const navigate = useNavigate()

  const handleLogOut = () => {
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('existingUser')
    
    setIsAuthToken(false)
    navigate('/')
  }



  return (
    <>
      
      <div >
      <Navbar className="bg-body-dark border border-danger">
      <Container>
        <Navbar.Brand style={{color:'white',fontStyle:'-moz-initial'}} className='fs-5 danger p-3' ><i class="fa-solid fa-bolt fa-2xl text-danger p-2 ms-5" ></i>IMRw +</Navbar.Brand>
        
       
        

        <Navbar.Collapse className="justify-content-end">

         { user == null ?
          <button className='btn btn-light d-flex' onClick= {() => navigate('/login')}>
           
          <i class="fa-solid fa-user p-2" ></i> <p>Sign in</p>
          
          </button>:
           <button className='btn btn-light d-flex' onClick= {handleLogOut}>
           
           <i class="fa-solid fa-user p-2" ></i> <p>Log Out</p>
           
           </button>

         }
           
          

          

          
        </Navbar.Collapse>
      </Container>
    </Navbar>

      </div>
      


    

    </>
  )
}

export default Header