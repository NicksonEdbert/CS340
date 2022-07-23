-- SELECT (One for each table)

    -- Get the list of all products for the user
        SELECT product_name, product_des, price
        FROM
            Products 

    -- Display all the products in order details
        SELECT product_name, product_des, product_price, product_qty
        FROM
            Products NATURAL JOIN Order_Details 

    -- Display the personal information of the customer
        SELECT first_name, last_name, mid_name, phone, email, cusadd_line1, cusadd_line2, cusadd_city, cusadd_state, cusadd_zipcode
        FROM
            Customers 
        WHERE customer_id = :customer_id_Input

    -- Display everything in Orders table for order status
        SELECT order_id, order_date, order_total, customer_id, shippint_status, shipadd_line1, shippadd_line2, shippadd_city, shipadd_state, shippadd_zipcode
        FROM
            Orders 
        WHERE order_id = :order_id_Input

-- INSERT (At least 3)

    -- Add a new customer
        INSERT INTO
            Customers (first_name, last_name, mid_name, phone, email, cusadd_line1, cusadd_line2, cusadd_city, cusadd_state, cusadd_zipcode)
        VALUES (
            :fname_Input,
            :lname_Input,
            :midname_Input,
            :phone_Input,
            :email_Input,
            :line1_Input, 
            :line2_Input,
            :city_Input,
            :state_from_dropdown_Input,
            :zipcode_Input
            )

    -- Add new product
        INSERT INTO
            Products (product_name, product_des, price, stock)
        VALUES (
            :pname_Input,
            :pdesc_Input,
            :price_Input,
            :stock_Input
            )

    -- Add new order
        INSERT INTO
            Orders (order_date, order_total, customer_id, shippint_status, shipadd_line1, shippadd_line2, shippadd_city, shipadd_state, shippadd_zipcode)
        VALUES (
            :order_data_from_calendar,
            :computed_order_total,
            :customer_id_from_Customers_table,
            :shippint_status_from_enum_dropdown, 
            :shipadd_line1_Input, 
            :shippadd_line2_Input, 
            :shippadd_city_Input, 
            :shipadd_state_from_dropdown, 
            :shippadd_zipcode_Input
            )
    -- Add items for order in Order_Details
        INSERT INTO
            Order_Details (product_id, product_price, product_qty, discount, sub_total)
        VALUES (
            :product_id_from_Products_table, 
            :product_price_from_Products_table, 
            :product_qty_Input, 
            :discount_Input, 
            :sub_total_computed
            )

-- UPDATE (At least one)

    -- Update a customer personal data
        UPDATE bsg_people
        SET
            first_name = :fnameInput,
            last_name = :lnameInput,
            mid_name = :midnameInput,
            phone = :phoneInput,
            email = :emailInput,
            cusadd_line1 = :line1Input, 
            cusadd_line2 = :line2Input,
            cusadd_city = :cityInput,
            cusadd_state = :state_from_dropdown_Input,
            cusadd_zipcode = :zipcodeInput
        WHERE
            customer_id =
            :customer_id_from_customer_id_list 

-- DELETE (At least one)

    -- Delete a product
        DELETE FROM Products
        WHERE
            product_id =
            :product_id_selected_from_product_id_list

-- SEARCH (At least one)

    -- Search for specific products
        SELECT product_id, product_name, product_des, price, stock 
        FROM Products
        WHERE product_id = :productID_Input