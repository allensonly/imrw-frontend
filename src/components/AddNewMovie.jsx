import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addNewMovieApi } from '../services/allApi';

function AddNewMovie() {

  

  const [movieDetails,setMovieDetails] = useState({
    moviename : "",
    mainmovieimage : "",
    sidemovieimage: "",
    trailer: "",
    yearofrealease : "",
    genre: "",
    director : "",
    actor : "",
    imrwRating:""
  })
  console.log(movieDetails);

  const embededvideoLink = (e) => {
    const {value} = e.target
    //console.log(value.slice(-11));

    const link = `https://www.youtube.com/embed/${value.slice(-11)}`

    setMovieDetails({...movieDetails,trailer:link})

  }

  const handleUploadMovie = async(e) => {
    e.preventDefault()

    const {moviename,mainmovieimage,sidemovieimage,trailer,yearofrealease,genre,director,actor} = movieDetails

    if ( !moviename || !mainmovieimage || !sidemovieimage || !trailer || !yearofrealease || !genre || !director || !actor){
            toast.info('please fill the form completely')
    }
    else{
      const result = await addNewMovieApi(movieDetails)
      console.log(result);

      if(result.status == 200){
        toast.success('movie added successfully')

        setMovieDetails({
          moviename : "",
          mainmovieimage : "",
          sidemovieimage: "",
          trailer : "",
          yearofrealease : "",
          genre: "",
          director : "",
          actor : "",
          imrwRating:""
        })
        handleClose()
      }
      else{
        console.log(result);
        toast.error(result.response.data)
      }
    }



  }





    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
  return (
    <>

    <div className='container'>
        <div className='d-flex align-items-center justify-content-center mt-5 flex-column'>
        <h1>Add New Movie</h1>
        <button className='btn btn-info mt-4' onClick={handleShow}><i class="fa-solid fa-cloud fa-2xl"></i></button>


        <p className='mt-5 fs-3'>
        Movies, a popular form of visual storytelling, combine various artistic elements such as cinematography, acting, direction, and sound to convey narratives or evoke emotions. They entertain, educate, or provoke thought through diverse genres like action, comedy, drama, horror, and more. Typically, a film consists of a plot, characters, setting, conflict, and resolution. The plot unfolds through scenes structured in a three-act format—beginning, middle, and end. Directors employ techniques like camera angles, editing, and visual effects to enhance storytelling. Movies often serve as reflections of society, exploring themes, cultural aspects, and human experiences while offering audiences a shared cinematic journey.
        </p>
        </div>
    </div>


    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Upload New Movie</Modal.Title>
        </Modal.Header>
        <Modal.Body>

            <input type="text" placeholder='Movie Name' className='p-2 w-100 mt-2' value={movieDetails.moviename} onChange={(e) => setMovieDetails({...movieDetails,moviename:e.target.value})} />

            <input type="text" placeholder='main movie image' className='p-2 w-100 mt-2' value={movieDetails.mainmovieimage} onChange={(e) => setMovieDetails({...movieDetails,mainmovieimage:e.target.value})} />

            <input type="text" placeholder='Side movie image' className='p-2 w-100 mt-2' value={movieDetails.sidemovieimage} onChange={(e) => setMovieDetails({...movieDetails,sidemovieimage:e.target.value})}/>

            <input type="text" placeholder='Trailer' className='p-2 w-100 mt-2' value={movieDetails.trailer} onChange={embededvideoLink}/>

            <input type="text" placeholder='Year Of Release' className='p-2 w-100 mt-2' value={movieDetails.yearofrealease} onChange={(e) => setMovieDetails({...movieDetails,yearofrealease:e.target.value})} />

            <input type="text" placeholder='Genre' className='p-2 w-100 mt-2' value={movieDetails.genre} onChange={(e) => setMovieDetails({...movieDetails,genre:e.target.value})}/>

            <input type="text" placeholder='Director' className='p-2 w-100 mt-2' value={movieDetails.director} onChange={(e) => setMovieDetails({...movieDetails,director:e.target.value})}/>

            <input type="text" placeholder='Actor' className='p-2 w-100 mt-2' value={movieDetails.actor} onChange={(e) => setMovieDetails({...movieDetails,actor:e.target.value})}/>



        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUploadMovie}>
            Upload
          </Button>
        </Modal.Footer>
      </Modal>

    
    
    
    
      <ToastContainer autoClose={2000} theme='colored' position='top-center'/>
 
    </>
  )
}

export default AddNewMovie