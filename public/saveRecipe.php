<?php

// conseguir titulo  y contenido
$recipeTitle = $_POST['title'];
$recipeContent = $_POST['content'];

// Open the JSON file
$recipesFile = 'recipes.json';
$recipes = json_decode(file_get_contents($recipesFile), true);

// Add the new recipe to the array
$recipes[] = [
    'title' => $recipeTitle,
    'content' => $recipeContent
];

// Save the updated recipes back to the file
file_put_contents($recipesFile, json_encode($recipes));

// Return a success response
echo json_encode(['success' => true]);

?>
