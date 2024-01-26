import React, { useContext, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import { loginApi, registerApi } from '../services/allApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { isAuthTokenContext } from '../Context/ContextShare';


function Auth({register}) {
  
  const {isAuthToken,setIsAuthToken} = useContext(isAuthTokenContext)
  const navigate = useNavigate()

  const [userData,setUserData] = useState({
    username:"",
    email:"",
    password:""

  })
  /* console.log(UserData); */

  const handleRegister = async (e) => {
    e.preventDefault()

    const {username,email,password} = userData

    if (!username || !email || !password){
      toast.info('please fill the form completely.....')
    }
    else{
      const result = await registerApi(userData)
      console.log(result);
 
      if (result.status == 200){
        toast.success(`${result.data.username} is successfully registered`)

        setUserData({
          username:"",
          email:"",
          password:""
        })

        navigate('/login')


      }
      else{
        toast.error(`${result.response.data}`)
      }
    }
  }

  //login

   //login function

   const handleLogin = async (e) => {
    e.preventDefault()

    //destructure
    const {username,password} = userData

    if(!username || !password){
        toast.info('please fill the form completely')
    }
    else{
        const result = await loginApi(userData)
        console.log(result);

        if(result.status == 200){
            toast.success('login successfull')

            sessionStorage.setItem('existingUser',JSON.stringify(result.data.existingUser))
            sessionStorage.setItem('token',result.data.token)


            setUserData({
                username:"",
                email:"",
                password:""

            })

            setIsAuthToken(true)
           
            

            //navigate to home
            setTimeout(()=>{
                navigate('/')
            },2000)
            


        }
        else{
            toast.error(result.response.data)
        }
    }
}



  const registerForm = register?true:false

  return (
    <>

    <div className='align-items-center justify-content-center d-flex mt-5 flex-column'>
    
    <div className='fs-5 danger p-3 d-flex '>
    <i class="fa-solid fa-bolt fa-2xl text-danger p-2 ms-5 mt-3" ></i>
    <h2>IMRA +</h2>

    </div>

    <div>
        <p>{ registerForm?
        
        "Sign up to your account" :"Sign in to your account"
        
        
        } </p>
    </div>


    <Form className='border p-5 border-5 mt-2 mb-5'>

     

      <Form.Group className="mb-3" controlId="formBasicUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control onChange={(e) => setUserData({...userData,username:e.target.value})} type="username" placeholder="Username" value={userData.username} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
      </Form.Group>

      { registerForm &&
        <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control onChange={(e) => setUserData({...userData,email : e.target.value})} type="email" placeholder="Enter email" value={userData.email} />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      }

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control onChange={(e) => setUserData({...userData,password:e.target.value})} type="password" placeholder="Password" value={userData.password} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>

      {
        registerForm?

        <div className='mt-3'>

            <button className='btn rounded bg-warning' onClick={handleRegister}>Register</button>
           <p className='mt-3'>already a user?Click here to<Link to={'/login'}>Login</Link></p>

       </div>
                            
          :
                            
          <div className='mt-3 mb-5'>
               <button className='btn rounded bg-warning' onClick={handleLogin}>Login</button>
                <p className='mt-3'>New user? Click here to <Link to={'/register'} >Register</Link> </p>
          </div>


      }
      
    </Form>

    
    
    







    </div>
    <ToastContainer autoClose={2000} theme='colored' position='top-center'/>
    
    </>
  )
}

export default Auth