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
        const ingredients = document.getElementById('recipe-ingredients').value; // Assuming you have this input
        const steps = document.getElementById('recipe-steps').value; // Assuming you have this input
    
        let { data, error } = await supabase
            .from('recipes')
            .insert([{ title, description, ingredients, steps }]); // Include ingredients and steps
    
        if (error) {
            console.error('Error adding recipe', error);
        } else {
            const recipeId = data[0].id; // Get the ID of the newly created recipe
            console.log('Recipe added successfully:', data);
    
            // Redirect to the new recipe page
            window.location.href = `/api/recipe/${recipeId}`; // This will call the API to get the generated HTML
        }

        // After adding the recipe successfully
    if (!error) {
        const recipeId = data[0].id; // Assuming `id` is the primary key
        // Redirect to the new recipe page
        window.location.href = `/recipe/${recipeId}`;
}

    }
    
    

    document.getElementById('recipe-form').addEventListener('submit', submitRecipe);
    fetchRecipes();
    document.getElementById('current-year').innerText = new Date().getFullYear();
});
