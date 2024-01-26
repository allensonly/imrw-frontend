import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import MainCommonPage from './pages/MainCommonPage';
import Auth from './components/Auth';
import MovieDetails from './components/MovieDetails';
import AddNewMovie from './components/AddNewMovie';
import Footer from './components/Footer';
import { isAuthTokenContext } from './Context/ContextShare';

function App() {

  const {isAuthToken,setIsAuthToken} = (isAuthTokenContext)


  return (
    <>

   

   
    <Routes>
      <Route path='/' element={<MainCommonPage/>} />

      <Route path='/home' element={isAuthToken? <MainCommonPage home/> : <MainCommonPage/>}/>

      <Route path='/login' element={<Auth/>}/>

      <Route path='/register' element={<Auth  register/>} />

      <Route path='/movie' element={<MovieDetails/>} />

      <Route path='/movie-add' element={<AddNewMovie/>}/>




    </Routes>
    <Footer/>

     
    </>
  );
}

export default App;
