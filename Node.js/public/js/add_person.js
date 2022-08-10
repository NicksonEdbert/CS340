// Get the objects we need to modify
let addPersonForm = document.getElementById("add-person-form-ajax");

// Modify the objects we need
addPersonForm.addEventListener("submit", function (e) {
   // Prevent the form from submitting
   e.preventDefault();

   // GET DATA
   // Get form fields we need to get data from
   let inputFirstName = document.getElementById("input-fname");
   let inputLastName = document.getElementById("input-lname");
   let inputMiddleName = document.getElementById("input-mname");
   let inputPhone = document.getElementById("input-phone");
   let inputEmail = document.getElementById("input-email");
   let inputLine1 = document.getElementById("input-line1");
   let inputLine2 = document.getElementById("input-line2");
   let inputCity = document.getElementById("input-city");
   let inputState = document.getElementById("input-state");
   let inputZipcode = document.getElementById("input-zipcode");

   // Get the values from the form fields
   let firstNameValue = inputFirstName.value;
   let lastNameValue = inputLastName.value;
   let middleNameValue = inputMiddleName.value;
   let phoneValue = inputPhone.value;
   let emailValue = inputEmail.value;
   let line1Value = inputLine1.value;
   let line2Value = inputLine2.value;
   let cityValue = inputCity.value;
   let stateValue = inputState.value;
   let zipcodeValue = inputZipcode.value;

   // PUT DATA
   // Put our data we want to send in a javascript object
   let data = {
      first_name: firstNameValue,
      last_name: lastNameValue,
      middle_name: middleNameValue,
      phone: phoneValue,
      email: emailValue,
      line1: line1Value,
      line2: line2Value,
      city: cityValue,
      state: stateValue,
      zipcode: zipcodeValue
   };

   // Setup our AJAX request
   var xhttp = new XMLHttpRequest();
   xhttp.open("POST", "/add-person-ajax", true);
   xhttp.setRequestHeader("Content-type", "application/json");

   // Tell our AJAX request how to resolve
   xhttp.onreadystatechange = () => {
      if (xhttp.readyState == 4 && xhttp.status == 200) {
         // Add the new data to the table
         addRowToTable(xhttp.response);

         // Clear the input fields for another transaction
         inputFirstName.value = "";
         inputLastName.value = "";
         inputMiddleName.value = "";
         inputPhone.value = "";
         inputEmail.value = "";
         inputLine1.value = "";
         inputLine2.value = "";
         inputCity.value = "";
         inputState.value = "";
         inputZipcode.value = "";
      } else if (xhttp.readyState == 4 && xhttp.status != 200) {
         console.log("There was an error with the input.");
      }
   };

   // Send the request and wait for the response
   xhttp.send(JSON.stringify(data));
});

// Creates a single row from an Object representing a single record from
// bsg_people
addRowToTable = (data) => {
   // Get a reference to the current table on the page and clear it out.
   let currentTable = document.getElementById("people-table");

   // Get the location where we should insert the new row (end of table)
   let newRowIndex = currentTable.rows.length;

   // Get a reference to the new row from the database query (last object)
   let parsedData = JSON.parse(data);
   let newRow = parsedData[parsedData.length - 1];

   // Create a row and 10 cells
   let row = document.createElement("TR");
   let idCell = document.createElement("TD");
   let firstNameCell = document.createElement("TD");
   let lastNameCell = document.createElement("TD");
   let middleNameCell = document.createElement("TD");
   let phoneCell = document.createElement("TD");
   let emailCell = document.createElement("TD");
   let line1Cell = document.createElement("TD");
   let line2Cell = document.createElement("TD");
   let cityCell = document.createElement("TD");
   let stateCell = document.createElement("TD");
   let zipcodeCell = document.createElement("TD");

   // Fill the cells with correct data
   idCell.innerText = newRow.id;
   firstNameCell.innerText = newRow.first_name;
   lastNameCell.innerText = newRow.last_name;
   middleNameCell.innerText = newRow.mid_name;
   phoneCell.innerText = newRow.phone;
   emailCell.innerText = newRow.email;
   line1Cell.innerText = newRow.cusadd_line1;
   line2Cell.innerText = newRow.cusadd_line2;
   cityCell.innerText = newRow.cusadd_city;
   stateCell.innerText = newRow.cusadd_state;
   zipcodeCell.innerText = newRow.cusadd_zipcode;

   // Add the cells to the row
   row.appendChild(idCell);
   row.appendChild(firstNameCell);
   row.appendChild(lastNameCell);
   row.appendChild(middleNameCell);
   row.appendChild(phoneCell);
   row.appendChild(emailCell);
   row.appendChild(line1Cell);
   row.appendChild(line2Cell);
   row.appendChild(cityCell);
   row.appendChild(stateCell);
   row.appendChild(zipcodeCell);

   // Add a row attribute so the deleteRow function can find a newly added row
   row.setAttribute("data-value", newRow.id);

   // Add the row to the table
   currentTable.appendChild(row);

   // Start of new Step 8 code for adding new data to the dropdown menu for updating people

   // Find drop down menu, create a new option, fill data in the option (full name, id),
   // then append option to drop down menu so newly created rows via ajax will be found in it without needing a refresh
   let selectMenu = document.getElementById("mySelect");
   let option = document.createElement("option");
   option.text = newRow.first_name + " " + newRow.last_name;
   option.value = newRow.customer_id;
   selectMenu.add(option);
   // End of new step 8 code.
};
