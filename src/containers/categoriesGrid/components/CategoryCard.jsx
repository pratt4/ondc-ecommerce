import { kebabCase } from "lodash";
import React from "react";
import { Link } from "react-router-dom";
import backgroundImage from '../../../assets/card4.jpg';

function CategoryCard({ categoryName }) {
  return (
    <Link
      to={`/${encodeURIComponent(categoryName)}`}
      className="flex items-center justify-center p-8 text-2xl font-semibold text-white dark:text-gray-100 border-current border-2 rounded-xl hover:scale-105 transition-transform duration-200 ease-in-out shadow-lg hover:shadow-xl"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'
      }}
    >
      {categoryName}
    </Link>
  );
}
export default CategoryCard;
