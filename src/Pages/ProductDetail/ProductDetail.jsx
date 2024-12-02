import React, { useEffect, useState } from 'react'

import Layout from '../../Components/Layout/Layout'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { productUrl } from '../../Api/endPoints';
import ProductCard from '../../Components/Product/ProductCard'
import Loader from '../../Components/Loader/Loader'

function ProductDetail() {
   const [product, setproduct] = useState()  
   const [isloading, setIsLoading]=useState(false)
   const { productId } = useParams();
  
  useEffect(()=>{
    setIsLoading(true)
     axios.get(`${productUrl}/products/${productId}`)
     .then((res)=>{
      setproduct(res.data)
      setIsLoading(false)
    }).catch((err)=>{
      console.log(err)
      setIsLoading(false)
    })    
    },[])
     return  (
    <Layout>
      {isloading? (<Loader/>):(<ProductCard
      product={product}
      flex={true}
      renderDesc={true}
      rebderAdd={true}
      /> )}
     
      
    </Layout>
  )
  }
 

export default ProductDetail