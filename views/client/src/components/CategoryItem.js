import React from 'react'

function CategoryItem(props) {
    return (
        <div className="category-item">
            <img src={props.image} alt={props.category} />
            <p>{props.category}</p>
        </div>
    )
}

export default CategoryItem
