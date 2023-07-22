import { kebabCase } from "lodash";
import React from "react";
import { Link } from "react-router-dom";

function CategoryCard({ categoryName }) {
  return (
    <Link
      to={`/${encodeURIComponent(categoryName)}`}
      className="p-8 text-black dark:text-gray-400 border-current border-2 rounded-2xl hover:scale-105 transition-all ease-in-out"
    >
      {categoryName}
    </Link>
  );
}

export default CategoryCard;
