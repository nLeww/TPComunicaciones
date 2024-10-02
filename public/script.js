
// entrada receta
const recipeForm = document.getElementById('recipeSubmitForm');

recipeForm.addEventListener('submit', function (event) {
    event.preventDefault();
    
    const title = document.getElementById('recipeTitle').value;
    const content = document.getElementById('recipeContent').value;

    // subir receta
    fetch('saveRecipe.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `title=${encodeURIComponent(title)}&content=${encodeURIComponent(content)}`
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            loadRecipes(); // recargar recetas
        }
    });

    // limpiar form
    document.getElementById('recipeTitle').value = '';
    document.getElementById('recipeContent').value = '';
});


// fireabse

// Import Firebase database functions
import { getDatabase, ref, set, onValue, push } from "firebase/database";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Reference to the 'recipes' node in Firebase Database
const recipesRef = ref(db, 'recipes');

// Add new recipe to Firebase Database
const recipeForm = document.getElementById('recipeSubmitForm');

recipeForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const title = document.getElementById('recipeTitle').value;
    const content = document.getElementById('recipeContent').value;

    // Push new recipe to the database
    const newRecipeRef = push(recipesRef);
    set(newRecipeRef, {
        title: title,
        content: content
    });

    // Clear form fields
    document.getElementById('recipeTitle').value = '';
    document.getElementById('recipeContent').value = '';

    // Reload recipes to display the newly added recipe
    loadRecipes();
});

// Function to load and display recipes from Firebase Database
function loadRecipes() {
    onValue(recipesRef, (snapshot) => {
        const recipes = snapshot.val();
        const recipeList = document.getElementById('recipeList');
        recipeList.innerHTML = ''; // Clear existing content

        // Loop through each recipe in the database and display it
        for (let key in recipes) {
            const recipe = recipes[key];
            const recipeItem = document.createElement('li');
            recipeItem.innerHTML = `<h3>${recipe.title}</h3><p>${recipe.content}</p>`;
            recipeList.appendChild(recipeItem);
        }
    });
}

// Fetch and display recipes on page load
window.addEventListener('DOMContentLoaded', loadRecipes);
