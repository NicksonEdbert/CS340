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

    -- Display everything in Orders table

-- INSERT (At least 3)

    -- Add a new customer
        INSERT INTO
            Customers (first_name, last_name, mid_name, phone, email, cusadd_line1, cusadd_line2, cusadd_city, cusadd_state, cusadd_zipcode)
        VALUES (
            :fnameInput,
            :lnameInput,
            :midnameInput,
            :phoneInput,
            :emailInput,
            :line1Input, 
            :line2Input,
            :cityInput,
            :state_from_dropdown_Input,
            :zipcodeInput
            )

    -- Add new product
        INSERT INTO
            Products (product_name, product_des, price, stock)
        VALUES (
            :pnameInput,
            :pdescInput,
            :priceInput,
            :stockInput
            )

    -- Add new order
    -- Add items for order in Order_Details

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