import React, { useState, useEffect } from 'react';

function FavoriteRecipes() {
    const [favoriteRecipes, setFavoriteRecipes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFavoriteRecipes = async () => {
            setIsLoading(true);
            try {
                const response = await fetch('/favorite_recipes');
                if (!response.ok) {
                    throw new Error('Failed to fetch favorite recipes');
                }
                const data = await response.json();
                setFavoriteRecipes(data.favorite_recipes);
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchFavoriteRecipes();
    }, []);

    if (isLoading) {
        return <div className="flex justify-center items-center min-h-screen"><p className="text-gray-500 text-xl">Loading...</p></div>;
    }

    if (error) {
        return <div className="flex justify-center items-center min-h-screen"><p className="text-rose-950 text-xl">Error: {error}</p></div>;
    }

    return (
        <div className="min-h-screen bg-rose-200 flex flex-col items-center p-4">
            <h2 className="text-3xl font-bold mb-6">Favourite Recipes</h2>
            <ul className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {favoriteRecipes.map(recipe => (
                    <li className="bg-rose-200 p-4 rounded-lg shadow-md border-rose-950 b_glow" key={recipe.id}>
                        <h3 className="text-xl font-semibold mb-2">{recipe.name}</h3>
                        <p className="text-slate-950"><b>Description:</b> {recipe.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default FavoriteRecipes;
