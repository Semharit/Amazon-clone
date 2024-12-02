import React from 'react'
import  categoryInfo  from './CategoryFullInfos'
import CategoryCard from './CategoryCard'
import classes from './category.module.css'

function Category() {
  return (
    <section className={classes.category_container}>
      {
      categoryInfo.map((infos,i) => (
        <CategoryCard data={infos}key={i} />
      ))
      }
    </section>
  );
}

export default Category