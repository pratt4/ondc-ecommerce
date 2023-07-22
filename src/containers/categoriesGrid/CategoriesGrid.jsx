import React, { useState, useEffect } from "react";
import SearchBarSection from "../../components/SearchBarSection";
import CategoryCard from "./components/CategoryCard";
import { useStore } from "../../store";
import LoadingPage from "../../components/LoadingPage";

function CategoriesGrid({ query }) {

  const { loading, categories, fetchCategories } = useStore((state) => ({
    loading: state.loading,
    categories: state.categories,
    fetchCategories: state.fetchCategories,
  }));

  
  const [filteredCategories, setFilteredCategories] = useState(categories);

  useEffect(() => {
    if (!categories.length) {
      fetchCategories();
    }

    // Filter the categories based on the search query
    const filteredCategories = categories.filter((category) =>
      category.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredCategories(filteredCategories);
  }, [categories, fetchCategories, query]);

  
  if (loading) {
    return <LoadingPage />;
  }

  return (
    <>
      
      <div className="h-1/4 my-5 text-2xl">Categories</div>
      <div className="grid gap-[2em]" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))" }}>
        {filteredCategories.map((category) => (
          <CategoryCard key={category} categoryName={category} />
        ))}
      </div>
    </>
  );
}

export default CategoriesGrid;
