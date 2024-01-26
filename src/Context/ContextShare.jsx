import React, { createContext, useState } from 'react'

export const changeMainmovieImageResponseContext = createContext()

export const uploadRatingResponseContext = createContext()

export const isAuthTokenContext = createContext()

function ContextShare({children}) {

  const [isAuthToken,setIsAuthToken] = useState(false) 


    const [changeMainImage,setChangeMainImage] = useState({})

    const [ratingDetails,setRatingDetails] = useState({
      userId:"",
      userName:"",
      movieId:"",
      movieName:"",
      rating:"",
      profile:""
    })



  return (
    <>

    <changeMainmovieImageResponseContext.Provider value={{changeMainImage,setChangeMainImage}}>
      <uploadRatingResponseContext.Provider value={{ratingDetails,setRatingDetails}}>

        <isAuthTokenContext.Provider value={{isAuthToken,setIsAuthToken}}>

        {children}

        </isAuthTokenContext.Provider>

       



      </uploadRatingResponseContext.Provider>
     

    </changeMainmovieImageResponseContext.Provider>
    
    
    
    
    </>
  )
}

export default ContextShare