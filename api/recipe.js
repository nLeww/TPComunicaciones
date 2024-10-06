// api/recipe.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://dlddiirdmdykfvyxnzpa.supabase.co'; // Replace with your Supabase URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsZGRpaXJkbWR5a2Z2eXhuenBhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjc5MDM1MDMsImV4cCI6MjA0MzQ3OTUwM30.DBLHGwtn3piyF4T3B2_DJSTL4bhdW_q-HdnEPVjsPbg'; // Replace with your Supabase anon key
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
