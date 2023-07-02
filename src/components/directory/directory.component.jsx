/* eslint-disable react/prop-types */
import CatergoryItem from "../category-item/catergory-item.component"
import './directory.styles.scss'

export default function Directory({categories}) {
  return (
    <div className="categories-container">
      {categories.map((category) => (
        <CatergoryItem key={category.id} category={category}/>
      ))}
     
      </div>
  )
}
