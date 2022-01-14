import React from 'react'
import CategoryItem from './CategoryItem'
import speaker from '../images/speaker.jpg'

function Category() {
    return (
        <div className="category-body">
            <CategoryItem image={speaker} category="Speaker & Microphone"/>
        </div>
    )
}

export default Category
