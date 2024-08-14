import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const AllRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const response = await fetch('https://nine-project-recipe-hub-23vx.onrender.com/recipes');
      const data = await response.json();
      if (response.ok) {
        setRecipes(data.recipes);
      } else {
        setMessage(data.message || 'Failed to fetch recipes');
      }
    } catch (error) {
      setMessage('Error fetching recipes');
    }
  };

  const handleFavorite = async (recipeId) => {
    try {
      const response = await fetch(`https://nine-project-recipe-hub-23vx.onrender.com/favorite_recipe/${recipeId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
      } else {
        setMessage(data.message || 'Failed to favorite recipe');
      }
    } catch (error) {
      setMessage('Error favoriting recipe');
    }
  };

  return (
    <div className="min-h-screen bg-rose-200 flex flex-col items-center p-4">
      <h2 className="text-3xl font-bold mb-6">All Recipes</h2>
      {recipes.length === 0 && <p className="text-rose-950">No recipes found.</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {recipes.map((recipe) => (
          <div className="bg-rose-200 p-4 rounded-lg shadow-md border-rose-950 b_glow" key={recipe.id}>
            <h3 className="text-xl font-semibold mb-2">{recipe.name}</h3>
            <p className="text-slate-950 mb-4">{recipe.description}</p>
            <button
              onClick={() => handleFavorite(recipe.id)}
              className="bg-rose-950 text-white py-2 px-4 rounded-md hover:bg-rose-950 transition-colors duration-200"
            >
              Favorite
            </button>
          </div>
        ))}
      </div>
      {message && <p className="text-rose-950 mt-4">{message}</p>}
      <Link
        to="/dashboard"
        className="mt-6 inline-block text-rose-950 hover:underline"
      >
        Go back to Dashboard
      </Link>
    </div>
  );
};

export default AllRecipes;
