import React, {useState, useEffect } from 'react'
import classes from './results.module.css'
import Layout from '../../Components/Layout/Layout'
import { useParams } from 'react-router-dom';
import axios from 'axios'
import { productUrl } from '../../Api/endPoints';
import ProductCard from '../../Components/Product/ProductCard';
import Loader from '../../Components/Loader/Loader';


function Results() {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { categoryName } = useParams();

  useEffect(() => {
    setIsLoading(true);
    setError(null); // Reset error state
    axios
      .get(`${productUrl}/products/category/${categoryName}`)
      .then((res) => {
        setResults(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch data. Please try again later.");
        setIsLoading(false);
      });
  }, [categoryName]);

  return (
    <Layout>
      <section className={classes.results}>
        <h1 style={{ padding: "30px" }}>Results</h1>
        <p style={{ padding: "30px" }}>Category / {categoryName}</p>
        <hr />
        {isLoading ? (
          <Loader/>
        ) : error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : results.length === 0 ? (
          <p>No products found in this category.</p>
        ) : (
          <div className={classes.products_container}>
            {results.map((product) => (
              <ProductCard
                key={product.id}
                renderAdd={true}
                product={product}
              />
            ))}
          </div>
        )}
      </section>
    </Layout>
  );
}

export default Results;

// function Results() {
//   const [results, setResults]=useState([])
//   const [isLoading, setIsLoading]=useState()
//     const {categoryName} =useParams()
//         console.log(categoryName)
//         useEffect(()=>{
//           setIsLoading()
//         axios.get(`${productUrl}/products/category/${categoryName}`)
//         .then((res)=>{
//           setResults(res.data)
//            console.log(res)
//            setIsLoading(false)
//         }).catch((err)=>{
//           console.log(err)
//           setIsLoading(false)
//         })
//         },[])
       
        
    
//   return (
//     <Layout>
//       <section>
//         <h1 style={{ padding: "30px" }}>Results</h1>
//         <p style={{ padding: "30px" }}>Category/{categoryName}</p>
//         <hr />
//         {isLoading? (<Loading />
//         ):(
//           <div className={classes.products_container}>
//             {results?.map((product) => (
//               <ProductCard
//                 key={product.id}
//                 renderAdd={true}
//                 product={product}
//               />
//             ))}
//           </div>
//         )}
//       </section>
//     </Layout>
//   );
// }

// export default Results;