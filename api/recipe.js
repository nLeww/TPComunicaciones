// api/recipe.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://your-supabase-url'; // Replace with your Supabase URL
const supabaseKey = 'your-supabase-anon-key'; // Replace with your Supabase anon key
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { title, description, ingredients, steps } = req.body;

        // Insert the recipe into the Supabase 'recipes' table
        const { data, error } = await supabase
            .from('recipes')
            .insert([{ title, description, ingredients, steps }]);

        if (error) {
            console.error('Error adding recipe:', error);
            return res.status(500).json({ error: 'Error adding recipe' });
        }

        res.status(201).json({ message: 'Recipe added successfully', recipe: data });
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
