const { Router } = require("express");
const routes = Router();
const fs = require("fs");

// to read from data.json
const readData = () => {
  const data = fs.readFileSync("./data/data.json");

  return JSON.parse(data);
};

// to write to data.json
const writeData = (data) => {
  fs.writeFileSync("./data/data.json", JSON.stringify(data));
};

// get all recipes
routes.get("/recipes", (_req, res) => {
  const recipeNames = [];
  const data = readData();
  console.log(data);
  data.recipes.forEach((element) => {
    recipeNames.push(element.name);
    console.log(element.name);
  });

  res.json(recipeNames);
});

// get specific recipe details

routes.get("/recipes/details/:name", (req, res) => {
  data = readData();

  const selected = data.recipes.find(
    (element) => element.name === req.params.name
  );
  console.log(selected);
  if (!selected) {
    return res.send({});
  }

  const details = {
    ingredients: selected.ingredients,
    numSteps: selected.instructions.length,
  };
  res.json(details);
});

// validations middleware to check recipes have name,instructions, and ingredients.
const addRecipe = (req, res, next) => {
  if (!req.body.name || !req.body.instructions || !req.body.ingredients) {
    res.status(400).send("Please add name, ingredients, and instructions.");
  } else {
    next();
  }
};

// post route to add recipe
routes.post("/recipes", addRecipe, (req, res) => {
  const data = readData();
  const { name } = req.body;

  const selected = data.recipes.find((element) => element.name === name);
  console.log(selected);
  if (selected) {
    return res.status(400).send("Recipe already exists.");
  }
  data.recipes.push(req.body);
  writeData(data);
  res.status(201).send();
});

// put request
routes.put("/recipes", (req, res) => {
  const data = readData();
  const selected = data.recipes.find(
    (element) => element.name === req.body.name
  );
  if(!selected){
    res.status(404).send("Recipe does not exist.");
  };
  data.recipes.splice(data.recipes.indexOf(selected),1,req.body);
  writeData(data);
  res.status(204).send();
});

module.exports = routes;
