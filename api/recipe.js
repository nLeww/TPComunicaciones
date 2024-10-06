// api/recipe.js
export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { title, description, ingredients, steps } = req.body;
        // Handle your recipe submission logic here
        // E.g., Insert into your Supabase database

        // For demonstration purposes, we'll just return the received data
        return res.status(200).json({ message: 'Recipe added!', data: { title, description, ingredients, steps } });
    } else {
        // Handle any other HTTP method
        return res.setHeader('Allow', ['POST']).status(405).end(`Method ${req.method} Not Allowed`);
    }
}
