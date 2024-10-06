// api/createRecipe.js
import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const { title, description, ingredients, steps } = req.body;

            // Validate the input
            if (!title || !description || !ingredients || !steps) {
                return res.status(400).json({ message: 'Missing required fields.' });
            }

            // Create the HTML content
            const htmlContent = `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>${title}</title>
                    <link rel="stylesheet" href="/styles.css">
                </head>
                <body>
                    <h1>${title}</h1>
                    <p>${description}</p>
                    <h2>Ingredients:</h2>
                    <p>${ingredients}</p>
                    <h2>Cooking Steps:</h2>
                    <p>${steps}</p>
                </body>
                </html>
            `;

            // Define the path to save the HTML file
            const filePath = path.join(process.cwd(), 'public', `${title.replace(/\s+/g, '-')}.html`);

            // Write the HTML file
            fs.writeFileSync(filePath, htmlContent, 'utf8');

            return res.status(200).json({ message: 'Recipe HTML created successfully!' });
        } catch (error) {
            console.error('Error creating recipe:', error);
            return res.status(500).json({ message: 'Internal server error.' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
