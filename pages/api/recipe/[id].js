// pages/api/recipe/[id].js

import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://dlddiirdmdykfvyxnzpa.supabase.co'; // Replace with your Supabase URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsZGRpaXJkbWR5a2Z2eXhuenBhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjc5MDM1MDMsImV4cCI6MjA0MzQ3OTUwM30.DBLHGwtn3piyF4T3B2_DJSTL4bhdW_q-HdnEPVjsPbg'; // Replace with your Supabase anon key

const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
    const { id } = req.query; // Get the recipe ID from the URL

    // Fetch the recipe from Supabase
    const { data: recipe, error } = await supabase
        .from('recipes')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        return res.status(404).json({ message: 'Recipe not found' });
    }

    // Generate the HTML content
    const htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${recipe.title}</title>
        </head>
        <body>
            <h1>${recipe.title}</h1>
            <p>${recipe.description}</p>
            <h2>Ingredients:</h2>
            <p>${recipe.ingredients}</p>
            <h2>Cooking Steps:</h2>
            <p>${recipe.steps}</p>
        </body>
        </html>
    `;

    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(htmlContent); // Send the generated HTML back to the client
}
