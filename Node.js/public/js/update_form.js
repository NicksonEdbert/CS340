function updateForm(select) {
    var customerForm = document.getElementById('addCustomer');
    var orderForm = document.getElementById('addOrder');
    var detailForm = document.getElementById('addDetail');
    var productForm = document.getElementById('addProduct');

    customerForm.style.display = 'none';
    orderForm.style.display = 'none';
    detailForm.style.display = 'none';
    productForm.style.display = 'none';

    switch (select) {
        case "Customers":
            customerForm.style.display = 'block';
            break;
        
        case "Orders":
            orderForm.style.display = 'block';
            break;

        case "Order_Details":
            detailForm.style.display = 'block';
            break;

        case "Products":
            productForm.style.display = 'block';
            break;
    
        default:
            alert("Table not Found!")
            break;
    }
}

function updateTable (table) {
    var customerTable = document.getElementById('customerTable');
    var orderTable = document.getElementById('orderTable');
    var detailTable = document.getElementById('detailTable');
    var productTable = document.getElementById('productTable');


    customerTable.style.display = 'none';
    orderTable.style.display = 'none';
    detailTable.style.display = 'none';
    productTable.style.display = 'none';


    switch (table) {
        case "Customers":
            customerTable.style.display = 'block';
            break;
        
        case "Orders":
            orderTable.style.display = 'block';
            break;

        case "Order_Details":
            detailTable.style.display = 'block';
            break;

        case "Products":
            productTable.style.display = 'block';
            break;
    
        default:
            alert("Table not Found!")
            break;
    }
}