var mysql = require("mysql");

var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "password",
    database: "bamazonDB"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("Product Results: " + connection.threadId);
    //function goes here 
    listProducts();
});

function listProducts() {

    connection.query("SELECT * FROM products", function (err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log("ID #:", res[i].item_id + " | " + res[i].product_name + " | $" + res[i].price  );
        }
        runSearch();
    });
}

function runSearch() {
    inquirer
      .prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
          "Product ID?",
          "How many units would you like to buy?",
          "Exit"
        ]
      })
      .then(function(answer) {
        switch (answer.action) {
        case "Input product ID to buy item":
          idSearch();
          break;
  
        case "How many units would you like to buy?":
          unitSearch();
          break;
            
        case "Exit":
          connection.end();
          break;
        }
      });
  }