import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import RecipeCard from './RecipeCard'; 
import "./Home.css";

function Home({ recipes, deleteRecipe, editRecipe }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleEdit = (recipe) => {
    navigate('/create', { state: { recipe } });
  };

  const handleDropdownToggle = (id) => {
    setDropdownOpen((prevId) => (prevId === id ? null : id));
  };

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete the recipe?')) {
      deleteRecipe(id); 
      setDropdownOpen(null); 
    }
  };

  return (
    <div className="home-container">
      <div className="content-wrapper">
        <img className="title-image" src="./assets/title.svg" alt="Title" />

        <div className="search-create-bar .inline-search-bar">
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
        </div>

        <div className="recipe-cards">
          {filteredRecipes.length > 0 ? (
            filteredRecipes.slice(0, 3).map((recipe) => (
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
    </div>
  );
}

export default Home;
