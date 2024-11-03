# Documentation Supermarket_Frontend

This repository is part of a bigger project, including a frontend, backend and a database. It is the frontend of the project (who could have guessed). More documentation about the project can be found here https://github.com/Manu2505/Supermarket

# How to start the project
1. For this project you need to have "npm" installed, a package manager.
2. Open a terminal in an editor of your choice and type "npm install" or "npm install vite". This should install all needed packages.
3. To start the project type "npm run dev". The project is now running local on http://localhost:5173/

# Structure
The frontend consists of 4 different pages.
With the NavBar on the top you can switch between the different pages.

# Page 1 /item
Click on the navbar on "Store items" to open this page. This page is for the supermarket owner and employees. Here you can add new products into the database. You have to input a name, a category and a price for the item. If the item is a basic food item with a reduced tax rate (7% instead of 19%), you can select this as well with the radio buttons. After filling out all input fields you can post the item with a click on the button "Add Item". This will save the item into the MongoDB Cloud database. 

# Page 2 /cart
Click on the navbar on "Shopping cart" to open this page. This page is for everybody that is buying items of the store and symbolizes the shopping cart. Here you can add different products from the database into your cart. This is possible by scanning a barcode of the product (if the UUID would work, lol) or by putting in the UUID of a product into the input field. You can submit by clicking on the button "Add Item".
You can add all existing items and change the quantity by putting in the UUID again or with the buttons on the right. With the remove button you can remove all samples of one item out of your cart. All added items will be saved in an itemList in the database. After adding all wanted items, you can click on the buttons on the bottom and choose your desired form of payment. This will lead you the the receipt.

# Page 3 /receipt
Click on the navbar on "Receipt" to open this page. This page is for everybody that is paying for  items of the store and symbolizes the receipt. Here you can see all details abput your purchase: The different products of your shopping cart, how much they cost, taxes..... and most important, the total of the purchase. 
You can click on the button "Send Receipt" to send the receipt data to the database. This will also print a receipt with all the data.

# Page 4 /
Click on the navbar on "printItemLabel" to open this page. This page is for the shop owner and employees that want to print barcodes for items. You have to enter the UUID in the input field. By clicking on the button "Print Label" a label for the item is printed. This can be used for adding items to the cart (if the scanner works).


## Thank you for reading
