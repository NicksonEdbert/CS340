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

app.get("/", function (req, res) {
   let query1 = "SELECT * FROM Customers;"; // Define our query
   let query2 = "SELECT * FROM Orders;"; // Define our query
   let query3 = "SELECT * FROM Order_Details;"; // Define our query
   let query4 = "SELECT * FROM Products;"; // Define our query

   // Run the 1st query
   db.pool.query(query1, function(error, rows, fields){
        
      // Save the people
      let customer = rows;
      
      // Run the second query
      db.pool.query(query2, (error, rows, fields) => {
          
          // Save the planets
          let order = rows;

          db.pool.query(query3, (error, rows, fields) => {
          
            // Save the planets
            let detail = rows;

            db.pool.query(query4, (error, rows, fields) => {
          
               // Save the planets
               let product = rows;

               return res.render('index', {customers: customer, orders: order, details: detail, products: product});
           })
        })
      })
   });
}); 

// Add New Customer
app.post("/add-person-form", function (req, res) {
   // Capture the incoming data and parse it back to a JS object
   let data = req.body;

   // Create the query and run it on the database
   query1 = `INSERT INTO Customers (first_name, last_name, phone, email, cusadd_line1, cusadd_city, cusadd_state, cusadd_zipcode) VALUES ('${data["input-fname"]}', '${data["input-lname"]}', '${data["input-phone"]}', '${data["input-email"]}', '${data["input-line1"]}', '${data["input-city"]}', '${data["input-state"]}', '${data["input-zipcode"]}')`;
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

// Add New Order
app.post("/add-order-form", function (req, res) {
   // Capture the incoming data and parse it back to a JS object
   let data = req.body;

   // Create the query and run it on the database
   query1 = `INSERT INTO Orders (order_date, order_total, customer_id,
      shipping_status) VALUES ('${data["input-date"]}', '${data["input-total"]}', '${data["input-id"]}', '${data["input-status"]}')`;
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

// Add New Details
app.post("/add-detail-form", function (req, res) {
   // Capture the incoming data and parse it back to a JS object
   let data = req.body;


   // Create the query and run it on the database
   query1 = `INSERT INTO Order_Details (order_id, product_id,product_qty, sub_total) VALUES ('${data["input-oid"]}', '${data["input-pid"]}', '${data["input-qty"]}', '${data["input-stotal"]}')`;
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

// Add New Products
app.post("/add-product-form", function (req, res) {
   // Capture the incoming data and parse it back to a JS object
   let data = req.body;


   // Create the query and run it on the database
   query1 = `INSERT INTO Products (product_name, product_des, price) VALUES ('${data["input-pname"]}', '${data["input-desc"]}', '${data["input-price"]}')`;
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

// Update Route
app.put("/put-person-ajax", function (req, res, next) {
   let data = req.body;

   let pid = data.pid;
   let oid = data.oid;
   let quantity = data.quantity;
   let subtotal = data.subtotal;

   let queryUpdateWorld = `UPDATE Order_Details SET product_qty = ?, sub_total = ? WHERE product_id = ? AND order_id = ?`;
   let selectWorld = `SELECT * FROM Order_Details WHERE product_id = ? AND order_id = ?`;

   // Run the 1st query
   db.pool.query(
      queryUpdateWorld,
      [quantity, subtotal, pid, oid],
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
               [pid, oid],
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
