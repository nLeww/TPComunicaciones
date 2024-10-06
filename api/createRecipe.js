import fs from 'fs';
import path from 'path';

// Example handler for creating the recipe HTML
export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { title, description, ingredients, steps } = req.body;

        // Create HTML content
        const htmlContent = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>${title}</title>
            </head>
            <body>
                <h1>${title}</h1>
                <h2>Description</h2>
                <p>${description}</p>
                <h2>Ingredients</h2>
                <p>${ingredients}</p>
                <h2>Steps</h2>
                <p>${steps}</p>
            </body>
            </html>
        `;

        // Define the file path where the HTML file will be saved
        const filePath = path.join(process.cwd(), 'public', 'recipes', `${title.replace(/\s+/g, '-')}.html`);

        // Create the directory if it doesn't exist
        fs.mkdirSync(path.dirname(filePath), { recursive: true });

        // Write the HTML content to a file
        fs.writeFile(filePath, htmlContent, (err) => {
            if (err) {
                console.error('Error writing file:', err);
                return res.status(500).json({ error: 'Error writing file' });
            }

            res.status(200).json({ message: 'HTML file created successfully', url: `/recipes/${title.replace(/\s+/g, '-')}.html` });
        });
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
