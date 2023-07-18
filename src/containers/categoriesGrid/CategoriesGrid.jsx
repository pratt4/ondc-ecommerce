import React, { useState, useEffect } from "react";
import SearchBarSection from "../../components/SearchBarSection";
import CategoryCard from "./components/CategoryCard";
import { useStore } from "../../store";
import LoadingPage from "../../components/LoadingPage";

function CategoriesGrid() {
  const { loading, categories, fetchCategories } = useStore((state) => ({
    loading: state.loading,
    categories: state.categories,
    fetchCategories: state.fetchCategories,
  }));
  useEffect(() => {
    if (!categories.length) {
      fetchCategories();
    }
  }, []);

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <>
      <div className="h-1/4 my-5 text-2xl">Categories</div>
      <div
        className="grid gap-[2em]"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))" }}
      >
        {categories.map((e) => (
          <CategoryCard key={e} categoryName={e} />
        ))}
      </div>
    </>
  );
}

export default CategoriesGrid;
