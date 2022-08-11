// Get the objects we need to modify
let updatePersonForm = document.getElementById("update-person-form-ajax");

// Modify the objects we need
updatePersonForm.addEventListener("submit", function (e) {
   // Prevent the form from submitting
   e.preventDefault();

   // Get form fields we need to get data from
   let inputProductId = document.getElementById("myUpdatePid");
   let inputOrderId = document.getElementById("myUpdateOid");
   let inputQuantity = document.getElementById("input-qty-update");
   let inputSubtotal = document.getElementById("input-stotal-update");

   // Get the values from the form fields
   let productIdValue = inputProductId.value;
   let orderIdValue = inputOrderId.value;
   let quantityValue = inputQuantity.value;
   let subtotalValue = inputSubtotal.value;

   console.log(productIdValue)
   console.log(orderIdValue)

   // Put our data we want to send in a javascript object
   let data = {
      pid: productIdValue,
      oid: orderIdValue,
      quantity: quantityValue,
      subtotal: subtotalValue
   };

   // Setup our AJAX request
   var xhttp = new XMLHttpRequest();
   xhttp.open("PUT", "/put-person-ajax", true);
   xhttp.setRequestHeader("Content-type", "application/json");

   // Tell our AJAX request how to resolve
   xhttp.onreadystatechange = () => {
      if (xhttp.readyState == 4 && xhttp.status == 200) {
         // Add the new data to the table
         updateRow(xhttp.response, productIdValue, orderIdValue);
      } else if (xhttp.readyState == 4 && xhttp.status != 200) {
         console.log("There was an error with the input.");
      }
   };

   // Send the request and wait for the response
   xhttp.send(JSON.stringify(data));
   alert("Your Database had been updated!");
});

function updateRow(data, productId, orderId) {
   let parsedData = JSON.parse(data);

   let table = document.getElementById("detail-table");

   for (let i = 0, row; (row = table.rows[i]); i++) {
      //iterate through rows
      //rows would be accessed using the "row" variable assigned in the for loop
      if (table.rows[i].getAttribute("data-value") == orderId && table.rows[i].getAttribute("data-value2") == productId) {
         // Get the location of the row where we found the matching person ID
         let updateRowIndex = table.getElementsByTagName("tr")[i];

         // Get td of homeworld value
         let tdQuantity = updateRowIndex.getElementsByTagName("td")[3];
         let tdSubtotal = updateRowIndex.getElementsByTagName("td")[4];

         // Reassign homeworld to our value we updated to
         tdQuantity.innerHTML = parsedData[0].product_qty;
         tdSubtotal.innerHTML = parsedData[0].sub_total;
      }
   }
}
