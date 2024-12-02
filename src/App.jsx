import React, { useContext, useEffect } from 'react'
import Header from './Components/Header/Header'
import Routing from './Router'
import { Type } from './Utility/action.type'
import { auth } from './Utility/FireBase'
import { DataContext } from './Components/DataProvider/DataProvider'
// import CarouselEffect from './Components/Carousel/CarouselEffect'
// import Category from './Components/Category/Category'
// import Product from './Components/Product/Product'


function App() {
  const[{user},dispatch]=useContext(DataContext);
  useEffect(()=>{
    auth.onAuthStateChanged((authUser)=>{
      if(authUser){
        console.log(authUser);
        dispatch({
          type:Type.SET_USER,
          user:authUser,
        });
      }else{
        dispatch({
          type:Type.SET_USER,
          user:null,
        });
      }
    });
  },[]);
  return <Routing />     
    
}

export default App
