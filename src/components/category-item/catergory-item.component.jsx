/* eslint-disable react/prop-types */
import './catergory-item.scss'

export default function CatergoryItem({category}) {
  const {imageUrl,title}=category;
  return (
    <div className="category-container" >
          
          <div className="background-image" style={{
            backgroundImage:`url(${imageUrl})`
          }}/>
          <div className="category-body-container">
            <h2>{title}</h2>
            <p>Buy now</p>
          </div>
        </div>
  )
}
