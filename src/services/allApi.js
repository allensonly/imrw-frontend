import { baseUrl } from "./baseUrl"
import { commonApi } from "./commonApi"


 // 1) register api



export const registerApi = async (user) =>{
   return await commonApi('POST',`${baseUrl}/user/register`,user,'')
 }

 // 2) login api

 export const loginApi = async(user) => {
  return await commonApi('POST',`${baseUrl}/user/login`,user,'')
 }

 //3) addNewMovieApi

 export const addNewMovieApi = async(movie) => {
  return await commonApi('POST',`${baseUrl}/movie/add-movie`,movie,"")
 }

 //4) get allnewMovie

 export const getAllMovieApi = async(searchKey,movie) => {
  return await commonApi('GET',`${baseUrl}/movie/all-movie?search=${searchKey}`,movie,"")
 }

 //5) rate api

 export const rateMovieApi = async(rate) => {
  return await commonApi('POST',`${baseUrl}/rate/movie-rate`,rate,"")
 }

 //6) getmovierating

 export const getmovieratingApi = async(movieId,reqHeader) => {
  return await commonApi('GET',`${baseUrl}/rate/all-rating/${movieId}`,{},reqHeader)
 }

 //7) get ratecard details

 export const getRateCardApi = async (movieId) => {
  return await commonApi('GET',`${baseUrl}/rate/all-ratingcard/${movieId}`,{},"")
 }

 //7) edit profile

 export const editprofileAPi = async (reqBody,reqHeader)=>{
  return await commonApi('PUT',`${baseUrl}/user/edit/profile`,reqBody,reqHeader)
 }

  ///8) update profile
  export const updateprofileAPi = async (reqBody,reqHeader)=>{
    return await commonApi('POST',`${baseUrl}/user/update/profile`,reqBody,reqHeader)
}

  //9) get imrw rating
  export const getImrwRatingApi = async (reqBody) =>{
      return await commonApi('POST',`${baseUrl}/movie/movie-rating/imrw`,reqBody,"")
  }







