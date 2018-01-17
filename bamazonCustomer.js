var mysql = require("mysql");
var inquirer = require("inquirer");
var products = [];
var userProdID = 0;

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "",
    database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    showProducts();
});

//function to print products in a neater format
function printInfo(results) {
    for (var i = 0; i < results.length; i++) {
        console.log(`Item ID: ${results[i].item_id} || Product: ${results[i].product_name} || Department: ${results[i].department_name} || Price: ${results[i].price} || Quantity: ${results[i].stock_quantity}`)
    }
}

//shows all products and prompts user
function showProducts() {
    connection.query('SELECT * FROM products', function(error, results) {
        printInfo(results);
        products = results;
        promptUser()
    });
}

//updates the quantity in db after user purchase
function updateQuantity(id, quantity) {
    var query = connection.query(
        "UPDATE products SET ? WHERE ?", [{
            stock_quantity: quantity
        }, {
            item_id: id
        }],
        function(err, res) {
        }

    );
}

//ends connection or loops back to purchase page
function keepShopping() {
  inquirer.prompt([
    {
      type: "list",
      name: "continue",
      message: "Do you want to keep shopping?",
      choices: ["Yes", "No"]
    }
  ]).then(function(input) {
    if (input.continue === "Yes") {
      showProducts();
    } else {
      console.log("Goodbye! Thanks for shopping!");
      connection.end();
    }
  })
}


function promptUser() {
    inquirer.prompt([
      {
        type: "input",
        name: "product_id",
        message: "What is the ID of the product you want to purchase?"
      }
    ]).then(function(input) {
      //checks to see if user input is a number and if the product id exists
        var userID = parseInt(input.product_id)
        if (!Number.isInteger(userID)) {
            console.log("Please enter a number.")
            promptUser();
        } else if (input.product_id > products.length || input.product_id < 1) {
            console.log("Please enter a valid Product ID")
            promptUser();
        } else {
            userProdID = input.product_id;

            inquirer.prompt([
              {
                type: "input",
                name: "quantity",
                message: "How many would you like to buy?",
                //validates that there is enough quantity to buy
                validate: function(input) {
                  if (input > products[userProdID - 1].stock_quantity) {
                    return "Please enter a quantity up to " + products[userProdID - 1].stock_quantity + "."
                  }

                  return true;
                }
              }
            ]).then(function(input) {
              //displays total of purchase to user and asks if they want to continue
              var total = input.quantity * products[userProdID - 1].price;
              console.log("Your purchase total is $" + total + ".");
              var newQuantity = products[userProdID - 1].stock_quantity - input.quantity;
              updateQuantity(userProdID, newQuantity);
              keepShopping();
                
            })

        }

    })

}