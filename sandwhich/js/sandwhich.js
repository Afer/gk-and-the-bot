const ingredients = {
    "bread": [
        {"name": "Rye", "img": "./ingredient-pics/Rye.png"},
        {"name": "Sourdough", "img": "./ingredient-pics/Sourdough.png"},
        {"name": "Panini", "img": "./ingredient-pics/Panini.png"},
        {"name": "Wheat", "img": "./ingredient-pics/Wheat.png"},
        {"name": "Italian Roll", "img": "./ingredient-pics/italian-roll.png"}
    ],

    "main": [
        {"name": "Salami", "img": "./ingredient-pics/Salami.png"},
        {"name": "Bratwurst", "img": "./ingredient-pics/Bratwurst.png"},
        {"name": "Ham", "img": "./ingredient-pics/ham-slice.png"},
        {"name": "Turkey", "img": "./ingredient-pics/Turkey.png"},
        {"name": "Roast Beef", "img": "./ingredient-pics/Roast Beef.png"},
        {"name": "Steak", "img": "./ingredient-pics/Steak.png"},
        {"name": "Grilled Chicken", "img": "./ingredient-pics/Grilled Chicken.png"},
        {"name": "Fried Chicken", "img": "./ingredient-pics/Fried Chicken.png"}
    ],

    "cheese": [
        {"name": "Blue Cheese", "img": "./ingredient-pics/Blue Cheese.png"},
        {"name": "Gouda", "img": "./ingredient-pics/Gouda.png"},
        {"name": "Smoked Gouda", "img": "./ingredient-pics/Smoked Gouda.png"},
        {"name": "Sharp Cheddar", "img": "./ingredient-pics/cheddar-cheese-slice.png"},
        {"name": "Cheddar", "img": "./ingredient-pics/cheddar-cheese-slice.png"},
        {"name": "Swiss", "img": "./ingredient-pics/Swiss.png"},
        {"name": "Baby Swiss", "img": "./ingredient-pics/Baby Swiss.png"},
        {"name": "Dill Havarti", "img": "./ingredient-pics/Dill Havarti.png"},
        {"name": "Feta", "img": "./ingredient-pics/Feta.png"}
    ],
    "roll twice?": {},
    "roughage": [
        {"name": "Pickled Asparagus", "img": "./ingredient-pics/Pickled Asparagus.png"},
        {"name": "Cucumber", "img": "./ingredient-pics/Cucumber.png"},
        {"name": "Green Leaf Lettuce", "img": "./ingredient-pics/green-leaf-lettuce.png"},
        {"name": "Romaine Lettuce", "img": "./ingredient-pics/Romaine Lettuce.png"},
        {"name": "Tomato", "img": "./ingredient-pics/Tomato.png"},
        {"name": "Pickles", "img": "./ingredient-pics/Pickles.png"},
        {"name": "Green Onion", "img": "./ingredient-pics/Green Onion.png"},
        {"name": "Green Pepper", "img": "./ingredient-pics/Green Pepper.png"},
        {"name": "Red Pepper", "img": "./ingredient-pics/Red Pepper.png"},
        {"name": "Roasted Red Pepper", "img": "./ingredient-pics/Roasted Red Pepper.png"},
        {"name": "Onion", "img": "./ingredient-pics/Onion.png"},
        {"name": "Carmalized Onion", "img": "./ingredient-pics/Carmalized Onion.png"}
    ],

    "wildcard": [
        {"name": "Crispy Onions", "img": "./ingredient-pics/Crispy Onions.png"},
        {"name": "Potato Chips", "img": "./ingredient-pics/Potato Chips.png"},
        {"name": "French Fries", "img": "./ingredient-pics/French Fries.png"},
        {"name": "Steak Seasoning", "img": "./ingredient-pics/Steak Seasoning.png"}
    ],

    "condiments": [
        {"name": "Ketchup", "img": "./ingredient-pics/Ketchup.png"},
        {"name": "Spicy Brown Mustard", "img": "./ingredient-pics/Spicy Brown Mustard.png"},
        {"name": "Kewpie Mayo", "img": "./ingredient-pics/Kewpie Mayo.png"},
        {"name": "Mayonaise", "img": "./ingredient-pics/mayonaise.png"},
        {"name": "Arby's Sauce", "img": "./ingredient-pics/Arby's Sauce.png"},
        {"name": "Chik-fil-a Sauce", "img": "./ingredient-pics/Chik-fil-a Sauce.png"}
    ],

    "sauce": [
        {"name": "Mango Salsa", "img": "./ingredient-pics/mango-salsa.png"},
        {"name": "Bunker Sauce?", "img": "./ingredient-pics/Bunker Sauce?.png"},
        {"name": "Sweet and Spicy Sauce", "img": "./ingredient-pics/Sweet and Spicy Sauce.png"}
    ]
}

TEST_ONLY = {
    useTestObj: true,
    fullyRandom: true,
    testObj: {
        "bread": 3,
        "main": 2,
        "cheese": 4,
        "sauce": 0,
        "condiments": 3,
        "roughage": 2,
        "wildcard": 0
    }
};

function getRandomNumber(modifer, modulo) {
    // get todays date at 12AM
    let seed = new Date().setHours(0,0,0,0) + modifer;

    if (TEST_ONLY.fullyRandom) {
        seed = Math.random()*10000;
    }

    str = `${(2**31-1&Math.imul(48271,seed))/2**31}`
    .split('')
    .slice(-10)
    .join('') % modulo;

    return str;
}

$(function() {
    let ingredientMap = ["bread", "main", "cheese", "sauce", "condiments", "roughage"];//, "wildcard"];
    let sandwhich = [];
    let data = ingredients;

    // Get object from ingredients.json file
    //$.getJSON("./ingredients.json", function(data) {
        // loop through ingredientMap
        for (let i = 0; i < ingredientMap.length; i++) {
            // Get random array element from data where the key is ingredientMap[i]
            let ingredient = data[ingredientMap[i]][getRandomNumber(i, data[ingredientMap[i]].length)];
            // Add ingredient to sandwhich
            sandwhich.push(ingredient);
        }

        if (TEST_ONLY.useTestObj) {
            sandwhich = [];
            for (let key in TEST_ONLY.testObj) {
                let ingredient = data[key][TEST_ONLY.testObj[key]];
                sandwhich.push(ingredient);
            }
        }

        // build an html template for the sandwhich
        let sandwhichHtml = '<div class="sandwhich">';
        for (let i = 0; i < sandwhich.length; i++) {
            sandwhichHtml += `<div class="ingredient ${ingredientMap[i]} ${sandwhich[i].name.replaceAll(' ', '-')}">${sandwhich[i].name}</div>`;
        }
        
        // end with upsidedown bread
        sandwhichHtml += `<div class="ingredient rotated-bread ${ingredientMap[0]} ${sandwhich[0].name.replaceAll(' ', '-')}"></div>`;

        // Add the sandwhich to the page
        $("#sandwhich").append(sandwhichHtml);
        
        // Add a click event to the sandwhich
        $("#sandwhich").click(function() {
            // Get the current sandwhich
            let currentSandwhich = $(this);
            // Get the current sandwhich's class
            let currentSandwhichClass = currentSandwhich.attr("class");
        });
    //});
});