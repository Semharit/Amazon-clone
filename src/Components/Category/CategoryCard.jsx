import React from 'react'
import classes from './category.module.css'
import {Link} from 'react-router-dom'

function CategoryCard({data}) {
  console .log(data)
  return (
    <div className={classes.category}>
      <Link to={`/category/${data.name}`}>
        <span>
          <h2>{data.title}</h2>
        </span>
        <img src={data.imageLink} alt={data.title || 'Category Image'} />
        <p>shop now</p>
      </Link>
    </div>
  );
}

export default CategoryCard