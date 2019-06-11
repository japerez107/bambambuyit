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
  connection.query("SELECT * FROM products", function (err, results) {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: "id",
          type: "input",
          // choices: function () {
          //   var choiceArray = [];
          //   for (var i = 0; i < results.length; i++) {
          //     choiceArray.push(results[i].item_id);
          //   }
          //   return choiceArray;
          // },
          message: "Product ID?",
          validate: function (value) {
            if (isNaN(value) === false) {
              return true;
            }
            return false;
          }
        },
        {
          name: "stock",
          type: "input",
          message: "How many units would you like to buy?",
          validate: function (value) {
            if (isNaN(value) === false) {
              return true;
            }
            return false;
          }
        }
      ])

      
      .then(function (answer) {
        var chosenID = answer.id;
        var chosenQ = answer.stock;

        if (results[0].stock_quantity >= chosenQ) {

          var updateQ = results[0].stock_quantity - parseInt(answer.stock_quantity);

          connection.query(
            "UPDATE products SET ? WHERE ?",
            [
              {
                stock: updateQ
              },
              {
                id: chosenID
              }
            ],

            function (error) {
              if (error) throw err;

            }
          );
          var totalCost = results[0].price * answer.stock_quantity;

          console.log("Successful Purchase! Total price is " + totalCost);

          buyProducts();
        }
        else {
          console.log("Not enough Quantity");
          connection.end();
        }
      });
  });
};