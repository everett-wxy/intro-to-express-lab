const express = require("express");

const app = express();

app.get("/greetings/:userName", (req, res) => {
    res.send(`<h1>What a delight to see you once more, ${req.params.userName}</h1>`);
});

const isNumber = (value) => {
    return !isNaN(value); // check if a value is not a number // returns true if value is number or can be converted to number
};

app.get("/roll/:numberParameter", (req, res) => {
    const value = parseFloat(req.params.numberParameter);
    if (!isNumber(value)) {
        res.send(`You must specify a number`);
    } else {
        res.send(`${Math.floor(Math.random() * (value + 1))}`);
    }
});

const collectibles = [
    { name: "shiny ball", price: 5.95 },
    { name: "autographed picture of a dog", price: 10 },
    { name: "vintage 1970s yogurt SOLD AS-IS", price: 0.99 },
];

app.get("/collectibles/:index", (req, res) => {
    const index = Number(req.params.index);
    if (index > collectibles.length) {
        res.send("This item is not yet in stock. Check back soon!");
    } else {
        res.send(
            `So you like the ${collectibles[index].name}? For $${collectibles[index].price}, it can be yours!`
        );
    }
});

const shoes = [
    { name: "Birkenstocks", price: 50, type: "sandal" },
    { name: "Air Jordans", price: 500, type: "sneaker" },
    { name: "Air Mahomeses", price: 501, type: "sneaker" },
    { name: "Utility Boots", price: 20, type: "boot" },
    { name: "Velcro Sandals", price: 15, type: "sandal" },
    { name: "Jet Boots", price: 1000, type: "boot" },
    { name: "Fifty-Inch Heels", price: 175, type: "heel" },
];

app.get("/shoes", (req, res) => {
    let filteredShoes = shoes;
    const minPrice = parseFloat(req.query["min-price"]);
    const maxPrice = parseFloat(req.query["max-price"]);
    const type = req.query.type;
    let shoeList = "<h1>Shoe List</h1><ul>";

    if (!isNaN(minPrice)) {
        filteredShoes = filteredShoes.filter((shoe) => shoe.price >= minPrice);
    }
    if (!isNaN(maxPrice)) {
        filteredShoes = filteredShoes.filter((shoe) => shoe.price <= maxPrice);
    }
    if (type) {
        filteredShoes = filteredShoes.filter((shoe) => shoe.type === type);
    }
    filteredShoes.forEach((shoe) => {
        shoeList += `<li>Name: ${shoe.name}, Price: $${shoe.price}, Type: ${shoe.type}</li>`;
    });
    shoeList += "</ul>";
    res.send(shoeList);
});

app.listen(3000, () => {
    console.log("Listening on port 3000");
});
