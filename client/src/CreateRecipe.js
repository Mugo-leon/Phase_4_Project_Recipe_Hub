import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import pancake from './pancake.jpg';

function CreateRecipe({ user_id }) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prepare the recipe data
        const recipeData = {
            name: name,
            description: description,
            // No need to include user_id here as it's expected to be in the session
        };

        try {
            const response = await fetch('https://nine-project-recipe-hub-23vx.onrender.com/create_recipe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(recipeData),
                credentials: 'include' // Ensure cookies (such as session cookies) are included
            });

            const data = await response.json();
            if (response.ok) {
                setMessage('Recipe created successfully');
                setTimeout(() => {
                    setMessage('');
                    navigate('/dashboard');
                }, 3000); // Clear message after 3 seconds
            } else {
                setMessage(data.error || 'Error creating recipe');
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('Error creating recipe');
        }
    };

    return (
        <div 
            className="flex items-center justify-center min-h-screen bg-cover bg-center"
            style={{ backgroundImage: `url(${pancake})` }} 
        >
            <div className="w-full max-w-md p-8 bg-white bg-opacity-30 shadow-md rounded-md border-rose-950 b_glow">
                {message && (
                    <div className="text-rose-950 font-bold mb-4">
                        {message}
                    </div>
                )}
                <h2 className="text-2xl font-bold mb-6 text-center">Create New Recipe</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-slate-950">Name:</label>
                        <input 
                            type="text" 
                            id="name" 
                            name="name" 
                            className="mt-2 p-2 w-full border rounded-md" 
                            value={name} 
                            onChange={(e) => setName(e.target.value)} 
                        />
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-slate-950">Description:</label>
                        <textarea 
                            id="description" 
                            name="description" 
                            className="mt-2 p-2 w-full border rounded-md h-32" 
                            value={description} 
                            onChange={(e) => setDescription(e.target.value)} 
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button type="submit" className="bg-rose-950 text-white py-2 px-4 rounded-md hover:bg-rose-950 transition-colors duration-200">
                            Create Recipe
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateRecipe;
