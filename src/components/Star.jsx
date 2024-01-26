import React, { useContext, useEffect, useState } from 'react';
import './Stars.css'; // Create a CSS file for styling
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { rateMovieApi } from '../services/allApi';
import { uploadRatingResponseContext } from '../Context/ContextShare';

const Stars = () => {

  const {ratingDetails,setRatingDetails} = useContext(uploadRatingResponseContext)



  const [starColors, setStarColors] = useState(Array(10).fill('white'));

 //console.log(starColors)

const redStar = []
 
for (let item of starColors){
  if(item == 'red'){
    redStar.push(item)
  }
}
const rating = redStar.length +1
    //console.log(rating);

 

  

  const handleClick = (index) => {
    const newStarColors = [...starColors];
    newStarColors[index] = newStarColors[index] === 'white' ? 'red' : 'white';
    setStarColors(newStarColors);
    
    setRatingDetails({...ratingDetails,rating:rating})
  };

 

  return (
    <div>
      
      <div className="stars-container p-2">
        {starColors.map((color, index) => (
          <button 
            key={index}
           className= {color} 
            onClick={() => handleClick(index)}
          ><i class="fa-solid fa-star fa-lg  "></i></button>
        ))}
      </div>


      <ToastContainer autoClose={2000} theme='colored' position='top-center'/>

    </div>
  );


};

export default Stars;
