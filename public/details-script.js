document.addEventListener('DOMContentLoaded', () => {
    const supabase = createClient(supabaseUrl, supabaseKey); 
    
    const queryParams = new URLSearchParams(window.location.search);
    const recipeId = queryParams.get('id');

    async function submitDetails(e) {
        e.preventDefault();
        const ingredients = document.getElementById('ingredients').value;
        const steps = document.getElementById('steps').value;

        let { data, error } = await supabase
            .from('recipes')
            .update({ ingredients: ingredients, steps: steps })
            .eq('id', recipeId);

        if (error) {
            console.error('Error updating recipe details', error);
        } else {
            alert('Recipe details added!'); // Notify user that details are added
            // Redirect to view the newly created recipe page
            window.location.href = `/recipes/${recipeId}.html`;
        }
    }

    document.getElementById('details-form').addEventListener('submit', submitDetails);
});
