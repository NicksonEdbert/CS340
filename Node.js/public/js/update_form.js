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