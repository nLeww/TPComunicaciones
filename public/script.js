// Ensure these constants are declared only once
const supabaseUrl = 'https://dlddiirdmdykfvyxnzpa.supabase.co'; // Replace with your Supabase URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsZGRpaXJkbWR5a2Z2eXhuenBhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjc5MDM1MDMsImV4cCI6MjA0MzQ3OTUwM30.DBLHGwtn3piyF4T3B2_DJSTL4bhdW_q-HdnEPVjsPbg'; // Replace with your Supabase anon key

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Supabase client
    const { createClient } = window.supabase; // Access createClient from the global window object
    const supabase = createClient(supabaseUrl, supabaseKey); // Correctly initialize the client

    // Function to fetch all recipes from Supabase
    async function fetchRecipes() {
        let { data: recipes, error } = await supabase
            .from('recipes')
            .select('*');
    
        console.log('Fetched recipes:', recipes); // Log the fetched recipes
        if (error) {
            console.error('Error fetching recipes', error);
        } else {
            displayRandomRecipes(recipes);
        }
    }
    

    // Function to randomly pick a subset of recipes and display them
    function displayRandomRecipes(recipes) {
        console.log('Recipes to display:', recipes); // Log the recipes being displayed
        const recipeList = document.getElementById('recipe-list');
        recipeList.innerHTML = ''; // Clear previous content
    
        // Randomly shuffle recipes array
        const shuffledRecipes = recipes.sort(() => 0.5 - Math.random());
    
        // Pick the first 5 random recipes (or fewer if less available)
        const randomRecipes = shuffledRecipes.slice(0, 5);
    
        // Display the randomly selected recipes
        randomRecipes.forEach(recipe => {
            const recipeCard = document.createElement('div');
            recipeCard.className = 'recipe-card';
            recipeCard.innerHTML = `<h3>${recipe.title}</h3><p>${recipe.description}</p>`;
            recipeList.appendChild(recipeCard);
        });
    }
    

   // Function to submit a new recipe to Supabase
async function submitRecipe(e) {
    e.preventDefault();
    const title = document.getElementById('recipe-title').value;
    const description = document.getElementById('recipe-description').value;

    let { data, error } = await supabase
        .from('recipes')
        .insert([{ title: title, description: description }]); // Don't include the 'id' field

    if (error) {
        console.error('Error adding recipe', error);
    } else {
        document.getElementById('recipe-form').reset(); // Clear the form
        fetchRecipes(); // Reload the recipe list
    }
}

    

    // Add event listener to the form for submission
    document.getElementById('recipe-form').addEventListener('submit', submitRecipe);

    // Fetch recipes when the page loads
    fetchRecipes();

    // Update footer with the current year
    document.getElementById('current-year').innerText = new Date().getFullYear();
});

// Array of inspirational quotes
const quotes = [
    'Habia una vez - trus',
    'Camaron que duerme se lo lleva la corriente',
    'Jijiji ja',
    'Yo le conte -un pajarito',
    'Frase 6',
    'Abran una ventana pls',
    'otra frase mas',
];

// Function to display a random quote
function displayRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const selectedQuote = quotes[randomIndex];
    document.getElementById('inspo-quote').innerText = selectedQuote;
}

// Call the function to display a random quote when the page loads
displayRandomQuote();
