// pages/recipe/[id].js

import { useEffect, useState } from 'react';

export default function Recipe({ id }) {
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        const fetchRecipe = async () => {
            const response = await fetch(`/api/recipe/${id}`);
            if (response.ok) {
                const data = await response.text(); // Get HTML text
                document.body.innerHTML = data; // Replace body content with the HTML from the API
            } else {
                // Handle error (you can redirect to a 404 page or show an error message)
                alert('Recipe not found');
            }
        };

        fetchRecipe();
    }, [id]);

    if (!recipe) return <p>Loading...</p>;

    return null; // We won't actually render anything here since we're replacing the body
}

export async function getServerSideProps(context) {
    const { id } = context.params;
    return { props: { id } }; // Pass the recipe ID as a prop
}
