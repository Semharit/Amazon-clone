import React, { useEffect, useState} from 'react'
import axios from 'axios'
import ProductCard from './ProductCard'
import Classes from './product.module.css'
import Loader from '../Loader/Loader'

function Product() {
    const[products, setproducts]=useState([])
    const[isLoading, setIsLoading]=useState(false)
    useEffect(()=>{
        setIsLoading(true)
        axios.get("https://fakestoreapi.com/products")
        .then((res)=>{
            setproducts(res.data)
            setIsLoading(false)
        }).catch((err)=>{
            console.log(err)
            setIsLoading(false)
        })

    },[])
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <section className={Classes.products_container}>
          {products?.map((singleProduct, i) => {
            //   return   <ProductCard Product={singleProduct}key={`${singleProduct.id}=${singleProduct.title}`}/>
            return <ProductCard renderAdd={true} product={singleProduct} key={i} />;
          })}
        </section>
      )}
    </>
  );
  
}

export default Product