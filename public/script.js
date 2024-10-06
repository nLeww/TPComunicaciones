const supabaseUrl = 'https://dlddiirdmdykfvyxnzpa.supabase.co'; // Replace with your Supabase URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsZGRpaXJkbWR5a2Z2eXhuenBhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjc5MDM1MDMsImV4cCI6MjA0MzQ3OTUwM30.DBLHGwtn3piyF4T3B2_DJSTL4bhdW_q-HdnEPVjsPbg'; // Replace with your Supabase anon key

document.addEventListener('DOMContentLoaded', () => {
    const { createClient } = window.supabase;
    const supabase = createClient(supabaseUrl, supabaseKey);

    async function fetchRecipes() {
        let { data: recipes, error } = await supabase
            .from('recipes')
            .select('*');

        if (error) {
            console.error('Error fetching recipes:', error);
        } else {
            displayRandomRecipes(recipes);
        }
    }

    function displayRandomRecipes(recipes) {
        const recipeList = document.getElementById('recipe-list');
        recipeList.innerHTML = '';
        const shuffledRecipes = recipes.sort(() => 0.5 - Math.random());
        const randomRecipes = shuffledRecipes.slice(0, 5);
        randomRecipes.forEach(recipe => {
            const recipeCard = document.createElement('div');
            recipeCard.className = 'recipe-card';
            recipeCard.innerHTML = `<h3>${recipe.title}</h3><p>${recipe.description}</p>`;
            recipeList.appendChild(recipeCard);
        });
    }

    async function submitRecipe(e) {
        e.preventDefault();
        const title = document.getElementById('recipe-title').value;
        const description = document.getElementById('recipe-description').value;
    
        let { data, error } = await supabase
            .from('recipes')
            .insert([{ title: title, description: description }]); // Don't include the 'id' field
    
        console.log('API Response:', { data, error }); // Log the API response
    
        if (error) {
            console.error('Error adding recipe', error);
        } else {
            // Check if data is available before accessing it
            if (data && data.length > 0) {
                console.log('Recipe added successfully:', data);
                const recipeId = data[0].id; // Assuming `id` is the primary key
                // Call your API to create the HTML page
                const htmlResponse = await fetch('/api/createRecipe', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        title: title,
                        description: description,
                        ingredients: ingredients, // Ensure you are defining ingredients
                        steps: steps, // Ensure you are defining steps
                    }),
                });
    
                const result = await htmlResponse.json();
                console.log(result.message); // Should indicate success or error
                document.getElementById('recipe-form').reset(); // Clear the form
                fetchRecipes(); // Reload the recipe list
            } else {
                console.error('No data returned from Supabase');
            }
        }
    }
    
    
    

    document.getElementById('recipe-form').addEventListener('submit', submitRecipe);
    fetchRecipes();
    document.getElementById('current-year').innerText = new Date().getFullYear();
});
