import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import platter from './platter.jpg';
function EditRecipe({ username }) {
    const [recipes, setRecipes] = useState([]);
    const [selectedRecipeId, setSelectedRecipeId] = useState('');
    const [message, setMessage] = useState('');
    const [recipe, setRecipe] = useState({
        name: '',
        description: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const token = "YOUR_BEARER_TOKEN";  
    
    useEffect(() => {
        const fetchUserRecipes = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(`/get_user_recipes/${username}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`  
                    }
                });
                const data = await response.json();
                if (response.ok) {
                    setRecipes(data.recipes);
                } else {
                    console.error('Error fetching user recipes:', data.message);
                }
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserRecipes();
    }, [username]);

    useEffect(() => {
        const fetchRecipeDetails = async () => {
            if (selectedRecipeId && recipes.length > 0) {
                try {
                    setIsLoading(true);
                    const response = await fetch(`/get_recipe/${username}/${selectedRecipeId}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`  
                        }
                    });
                    const data = await response.json();
                    if (response.ok) {
                        setRecipe({
                            name: data.name,
                            description: data.description
                        });
                    } else {
                        console.error('Error fetching recipe details:', data.message);
                    }
                } catch (error) {
                    console.error('Error:', error);
                } finally {
                    setIsLoading(false);
                }
            }
        };

        fetchRecipeDetails();
    }, [username, selectedRecipeId, recipes]);

    const handleSelectRecipe = (e) => {
        setSelectedRecipeId(e.target.value);
        const selectedRecipe = recipes.find(recipe => recipe.id === parseInt(e.target.value));
        if (selectedRecipe) {
            setRecipe({
                name: selectedRecipe.name,
                description: selectedRecipe.description
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!selectedRecipeId || selectedRecipeId === '') {
            console.error('No recipe selected');
            return;
        }
    
        const recipeData = {
            name: recipe.name,
            description: recipe.description,
        };
    
        try {
            setIsLoading(true);
            const response = await fetch(`/edit_recipe/${selectedRecipeId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'UserId': username  
                },
                body: JSON.stringify(recipeData)
            });
            const data = await response.json();
            if (response.ok) {
                setMessage('Recipe updated successfully'); 
                setTimeout(() => {
                    setMessage(''); 
                    navigate('/my-recipes');
                }, 3000);}
                 else {
                console.error('Error updating recipe:', data.message);
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
     <div className="flex items-center justify-center min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${platter})` }}>
        <div className="max-w-lg mx-auto  p-8 rounded-lg shadow-md mt-12 bg-cover bg-white bg-opacity-30 bg-center border-rose-950 b_glow">
            <h2 className="text-2xl font-semibold text-slate-950 mb-6">Edit Recipe</h2>
            {message && (
                <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
                    {message}
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="selectRecipe" className="block text-slate-950 font-medium mb-2">Select Recipe:</label>
                    <select 
                        id="selectRecipe" 
                        onChange={handleSelectRecipe} 
                        value={selectedRecipeId}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-slate-950"
                    >
                        <option value="" disabled>Select a recipe</option>
                        {recipes.map(recipe => (
                            <option key={recipe.id} value={recipe.id}>
                                {recipe.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-slate-950 font-medium mb-2">Name:</label>
                    <input 
                        type="text" 
                        id="name" 
                        value={recipe.name} 
                        onChange={(e) => setRecipe({ ...recipe, name: e.target.value })} 
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-slate-950"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block text-slate-950 font-medium mb-2">Description:</label>
                    <textarea 
                        id="description" 
                        value={recipe.description} 
                        onChange={(e) => setRecipe({ ...recipe, description: e.target.value })} 
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                    ></textarea>
                </div>
                <button 
                    type="submit" 
                    className="w-full bg-rose-950 text-white p-2 rounded-lg hover:bg-rose-900 transition-colors"
                >
                    Save Changes
                </button>
            </form>
          </div>
        </div>
        
    );
}

export default EditRecipe;
