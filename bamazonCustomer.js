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
  console.log("Product for Sale: " + connection.threadId);
  //function goes here 
  listProducts();
});

function listProducts() {

  connection.query("SELECT * FROM products", function (err, res) {
    for (var i = 0; i < res.length; i++) {
      console.log("ID #:", res[i].item_id + " | " + res[i].product_name + " | $" + res[i].price);
    }
  });
  buyProducts();
}

function buyProducts() {
  // query the database for all items being auctioned
  connection.query("SELECT * FROM products", function (err, results) {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: "id",
          type: "rawlist",
          choices: function() {
            var choiceArray = [];
            for (var i = 0; i < results.length; i++) {
              choiceArray.push(results[i].item_id);
            }
            return choiceArray;
          },
          message: "Product ID?"
        },
        {
          name: "stock",
          type: "input",
          message: "How many units would you like to buy?"
        }
      ])
      .then(function (answer) {
        var chosenID;
        for (var i = 0; i < results.length; i++) {
          if (results[i].item_id === answer.id) {
            chosenID = results[i];
          }
        }
        if (chosenID.stock_quantity >= parseInt(answer.stock)) {
          // bid was high enough, so update db, let the user know, and start over
          connection.query(
            "UPDATE products SET ? WHERE ?",
            [
              {
                stock: (chosenID.stock_quantity -  parseInt(answer.stock))
              },
              {
                id: chosenID.item_id
              }
            ],
            function (error) {
              if (error) throw err;
              console.log("Successful Purchase!");
              buyProducts();
            }
          );
        }
        else {
          console.log("Not enough Quantity");
          buyProducts();
        }
      });
  });
};