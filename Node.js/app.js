/*
    SETUP
*/
var express = require("express"); // We are using the express library for the web server
var app = express(); // We need to instantiate an express object to interact with the server in our code

// Configuring Express to Handle JSON and Form Data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/*
http://flip1.engr.oregonstate.edu:9234/
*/
PORT = 9234; // Set a port number at the top so it's easy to change in the future

// Database
var db = require("./database/db-connector");

// Handlebars
var Promise = require("bluebird");

const { engine } = require("express-handlebars");
var exphbs = require("express-handlebars"); // Import express-handlebars
app.engine(".hbs", engine({ extname: ".hbs" })); // Create an instance of the handlebars engine to process templates
app.set("view engine", ".hbs"); // Tell express to use the handlebars engine whenever it encounters a *.hbs file.

// Serving static files in Express
app.use(express.static("public"));

/*
    ROUTES
*/

// app.get("/", function (req, res) {
//    let query1 = "SELECT * FROM Customers;"; // Define our query
//    let query2 = "SELECT * FROM Orders;"; // Define our query
//    let query3 = "SELECT * FROM Order_Details;"; // Define our query
//    let query4 = "SELECT * FROM Products;"; // Define our query

//    db.pool.query(query1, function (error, rows, fields) {
//       // Execute the query

//       let customers = rows;

//       db.pool.query(query2, function(error, rows, fields){
//          let ordersTable = rows;

//          db.pool.query(query3, function(error, rows, fields){
//             let ordersDetailsTable = rows;

//             db.pool.query(query4, function(error, rows, fields){
//                let productsTable = rows;

//                return res.render('index', {data: customers, orders: ordersTable, details: ordersDetailsTable, products: productsTable});
//             })

//          })

//       })
//    }); // an object where 'data' is equal to the 'rows' we
// }); // received back from the query

app.get("/", function (req, res) {
   let query1 = "SELECT * FROM Customers;"; // Define our query
   let query2 = "SELECT * FROM Orders;"; // Define our query
   let query3 = "SELECT * FROM Order_Details;"; // Define our query
   let query4 = "SELECT * FROM Products;"; // Define our query

   switch (req.query.select) {
      case "Customers":
         db.pool.query(query1, function (error, rows, fields) {
            // Execute the query
      
            let datas = rows;
      
            return res.render('index', {data: datas, customers: datas});
      
         });
         break;
      case "Orders":
         db.pool.query(query2, function (error, rows, fields) {
            // Execute the query
      
            let datas = rows;
      
            return res.render('index', {data: datas, orders: datas});
      
         });
         break;
      case "Order_Details":
         db.pool.query(query3, function (error, rows, fields) {
            // Execute the query
      
            let datas = rows;
      
            return res.render('index', {data: datas, details: datas});
      
         });
         break;
      case "Products":
         db.pool.query(query4, function (error, rows, fields) {
            // Execute the query
      
            let datas = rows;
      
            return res.render('index', {data: datas, products: datas});
      
         });
         break;

      case "Select a Table":
         db.pool.query(query1, function (error, rows, fields) {
            // Execute the query
      
            let datas = rows;
      
            return res.render('index', {data: datas, customers: datas});
      
         });
         break;
   }

}); // received back from the query

// POST ROUTES
// app.post("/add-person-ajax", function (req, res) {
//    // Capture the incoming data and parse it back to a JS object
//    let data = req.body;

//    // Capture NULL values
//    let phone = parseInt(data.phone);
//    if (isNaN(phone)) {
//       phone = "NULL";
//    }

//    // Create the query and run it on the database
//    query1 = `INSERT INTO Customers (first_name, last_name, phone) VALUES ('${data.first_name}', '${data.last_name}', ${phone});`;
//    db.pool.query(query1, function (error, rows, fields) {
//       // Check to see if there was an error
//       if (error) {
//          // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
//          console.log(error);
//          res.sendStatus(400);
//       } else {
//          // If there was no error, perform a SELECT * on bsg_people
//          query2 = `SELECT * FROM Customers;`;
//          db.pool.query(query2, function (error, rows, fields) {
//             // If there was an error on the second query, send a 400
//             if (error) {
//                // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
//                console.log(error);
//                res.sendStatus(400);
//             }
//             // If all went well, send the results of the query back.
//             else {
//                res.send(rows);
//             }
//          });
//       }
//    });
// });

app.post("/add-person-form", function (req, res) {
   // Capture the incoming data and parse it back to a JS object
   let data = req.body;


   // Create the query and run it on the database
   query1 = `INSERT INTO Customers (first_name, last_name, mid_name, phone, email, cusadd_line1, cusadd_line2, cusadd_city, cusadd_state, cusadd_zipcode) VALUES ('${data["input-fname"]}', '${data["input-lname"]}', '${data["input-mname"]}', '${data["input-phone"]}', '${data["input-email"]}', '${data["input-line1"]}', '${data["input-line2"]}', '${data["input-city"]}', '${data["input-state"]}', '${data["input-zipcode"]}')`;
   db.pool.query(query1, function (error, rows, fields) {
      // Check to see if there was an error
      if (error) {
         // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
         console.log(error);
         res.sendStatus(400);
      }
      // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
      // presents it on the screen
      else {
         res.redirect("/?select=Customers")
      }
   });
});

// Delete Route

app.delete("/delete-person-ajax/", function (req, res, next) {
   let data = req.body;
   let personID = parseInt(data.customer_id);
   let deleteBsg_Cert_People = `DELETE FROM Customers WHERE customer_id = ?`;

   // Run the 1st query
   db.pool.query(
      deleteBsg_Cert_People,
      [personID],
      function (error, rows, fields) {
         if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
         } else {
            res.sendStatus(204);
         }
      }
   );
});

app.put("/put-person-ajax", function (req, res, next) {
   let data = req.body;

   let homeworld = parseInt(data.homeworld);
   let person = parseInt(data.fullname);

   let queryUpdateWorld = `UPDATE Customers SET phone = ? WHERE customer_id = ?`;
   let selectWorld = `SELECT * FROM Customers WHERE customer_id = ?`;

   // Run the 1st query
   db.pool.query(
      queryUpdateWorld,
      [homeworld, person],
      function (error, rows, fields) {
         if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
         }

         // If there was no error, we run our second query and return that data so we can use it to update the people's
         // table on the front-end
         else {
            // Run the second query
            db.pool.query(
               selectWorld,
               [person],
               function (error, rows, fields) {
                  if (error) {
                     console.log(error);
                     res.sendStatus(400);
                  } else {
                     res.send(rows);
                  }
               }
            );
         }
      }
   );
});

/*
    LISTENER
*/

app.listen(PORT, function () {
   // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
   console.log(
      "Express started on http://localhost:" +
         PORT +
         "; press Ctrl-C to terminate."
   );
});
