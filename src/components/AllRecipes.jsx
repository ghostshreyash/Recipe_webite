import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import RecipeCard from './RecipeCard';
import "./AllRecipes.css";

const AllRecipes = ({ recipes }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('date'); 
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete the recipe?')) {
      deleteRecipe(id); 
      setFilteredRecipes(filteredRecipes.filter((recipe) => recipe.id !== id)); 
      setDropdownOpen(null);
    }
  };

  const handleDropdownToggle = (id) => {
    setDropdownOpen((prevId) => (prevId === id ? null : id));
  };

  const handleEdit = (recipe) => {
    navigate('/create', { state: { recipe } });
  };

  const sortedRecipes = [...recipes].sort((a, b) => {
    if (sortOption === 'title') {
      return a.title.localeCompare(b.title); 
    } else {
      return new Date(b.id) - new Date(a.id); 
    }
  });

  const filteredRecipes = sortedRecipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="all-recipes container">
      <h1>All Recipes</h1>

      {/* Search bar and Create Button */}
      <div className="search-create-bar">
        <input
          type="text"
          placeholder="Search recipes..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
        <Link to="/create">
          <button className="create-btn">
            Create New Recipe
          </button>
        </Link>

        {/* Sort Dropdown */}
        <select
          value={sortOption}
          onChange={handleSortChange}
          className="sort-select"
        >
          <option value="date">Sort by Date</option>
          <option value="title">Sort by Title</option>
        </select>
      </div>

      {/* Filtered Recipe Cards */}
      <div className="recipe-cards">
          {filteredRecipes.length > 0 ? (
            filteredRecipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onDropdownToggle={handleDropdownToggle}
                dropdownOpen={dropdownOpen}
              />
            ))
          ) : (
            <p>No recipes found!</p>
          )}
        </div>
    </div>
  );
};

export default AllRecipes;
