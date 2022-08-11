-- SELECT (One for each table)

    -- Get the list of all products for the user
        SELECT *
        FROM
            Products 

    -- Display all the details in order details
        SELECT *
        FROM
            Order_Details 

    -- Display the personal information of the customer
        SELECT *
        FROM
            Customers

    -- Display everything in Orders table for order status
        SELECT *
        FROM
            Orders

-- INSERT (At least 3)

    -- Add a new customer
        INSERT INTO
            Customers (first_name, last_name, mid_name, phone, email, cusadd_line1, cusadd_line2, cusadd_city, cusadd_state, cusadd_zipcode)
        VALUES (
            :fname_Input,
            :lname_Input,
            :phone_Input,
            :email_Input,
            :line1_Input, 
            :city_Input,
            :state_from_dropdown_Input,
            :zipcode_Input
            )

    -- Add new product
        INSERT INTO
            Products (product_name, product_des, price)
        VALUES (
            :pname_Input,
            :pdesc_Input,
            :price_Input
            )

    -- Add new order
        INSERT INTO
            Orders (order_date, order_total, customer_id, shippint_status)
        VALUES (
            :order_data_from_calendar,
            :computed_order_total,
            :customer_id_from_Customers_table,
            :shippint_status_from_enum_dropdown,
            )

    -- Add details for order in Order_Details
        INSERT INTO
            Order_Details (product_id, product_price, product_qty, sub_total)
        VALUES (
            :product_id_from_Products_table, 
            :product_price_from_Products_table, 
            :product_qty_Input, 
            :sub_total_computed
            )

-- UPDATE (At least one)

    -- Update a customer personal data
        UPDATE Order_Details
        SET
            product_qty = :quantityInput,
            sub_total = :subtotalInput
        WHERE
            order_id = :oidInput AND product_id = :pidInput;


-- DELETE (At least one)

    -- Delete a product
        DELETE FROM Customers
        WHERE
            product_id =
            :product_id_selected_from_product_id_list

-- SEARCH (At least one)

    -- Search for specific products
        SELECT *
        FROM Customers
        WHERE customer_id = :customerIdInput