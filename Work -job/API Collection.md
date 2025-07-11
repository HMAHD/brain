
---

### **1️⃣ Open Bruno and Set Up a New API Collection**

1. **Launch Bruno**.
2. Click on **"New Collection"** → Give it a name (e.g., `Car Scraper API`).
3. Inside the collection, click on **"New Request"**.

---

### **2️⃣ Test API Endpoints**

Now, create API requests for each of your Flask routes.

#### **🔹 Test Scraping Endpoint (`/scrape`)**

1. **Request Type**: `GET`
2. **URL**: `http://127.0.0.1:5000/scrape`
3. **Click Send** – It should trigger the scraper and return:
    
    ```json
    {
      "message": "Scraping completed and data saved.",
      "count": 10
    }
    ```
    
    _(The count will vary based on the data scraped.)_

---

#### **🔹 Get All Cars (`/cars`)**

1. **Request Type**: `GET`
2. **URL**: `http://127.0.0.1:5000/cars`
3. **Click Send** – It should return:
    
    ```json
    [
      {
        "_id": "65c1a9d79e01d3c5a6b5d0c8",
        "name": "Toyota Corolla",
        "price": "$15,000",
        "year": 2020
      },
      {
        "_id": "65c1a9d79e01d3c5a6b5d0c9",
        "name": "Honda Civic",
        "price": "$18,000",
        "year": 2021
      }
    ]
    ```
    
    _(Example response; actual data depends on MongoDB.)_

---

#### **🔹 Delete All Cars (`/delete`)**

1. **Request Type**: `DELETE`
2. **URL**: `http://127.0.0.1:5000/delete`
3. **Click Send** – It should return:
    
    ```json
    {
      "message": "All car records deleted.",
      "deleted_count": 10
    }
    ```
    

---

### **3️⃣ Debugging Tips**

- If you get `Connection Refused` → Ensure **Flask is running**.
- If API calls are failing:
    - **Check Flask logs** (`flask run` output).
    - **Check MongoDB connection** (Is MongoDB running? Is your URI correct?).
- If scraping takes too long:
    - Run **`await scrape_cars()`** manually in Python to see if it works.

---

### **1. Scrape and Save Product (POST Requests)**

These endpoints allow you to scrape and save product data from different e-commerce sites.

#### **Scrape and Save Product for Cargills**

- **URL:** `http://127.0.0.1:8000/scrape/cargills/initial`
- **Method:** `POST`
- **Body (JSON format):**
    
    ```json
    {
      "product_url": "https://www.cargillsonline.com/product-page",
      "product_name": "Example Cargills Product"
    }
    ```
    

#### **Scrape and Save Product for Keells**

- **URL:** `http://127.0.0.1:8000/scrape/keells/initial`
- **Method:** `POST`
- **Body (JSON format):**
    
    ```json
    {
      "product_url": "https://www.keellssuper.com/product-page",
      "product_name": "Example Keells Product"
    }
    ```
    

#### **Scrape and Save Product for Kapruka**

- **URL:** `http://127.0.0.1:8000/scrape/kapruka/initial`
- **Method:** `POST`
- **Body (JSON format):**
    
    ```json
    {
      "product_url": "https://www.kapruka.com/product-page",
      "product_name": "Example Kapruka Product"
    }
    ```
    

#### **Scrape and Save Product for Glomark**

- **URL:** `http://127.0.0.1:8000/scrape/glomark/initial`
- **Method:** `POST`
- **Body (JSON format):**
    
    ```json
    {
      "product_url": "https://www.glomark.lk/product-page",
      "product_name": "Example Glomark Product"
    }
    ```
    

#### **Scrape and Save Product for Lassana**

- **URL:** `http://127.0.0.1:8000/scrape/lassana/initial`
- **Method:** `POST`
- **Body (JSON format):**
    
    ```json
    {
      "product_url": "https://www.lassana.com/product-page",
      "product_name": "Example Lassana Product"
    }
    ```
    

#### **Scrape and Save Product for Spar2U**

- **URL:** `http://127.0.0.1:8000/scrape/spar2U/initial`
- **Method:** `POST`
- **Body (JSON format):**
    
    ```json
    {
      "product_url": "https://www.spar2u.lk/product-page",
      "product_name": "Example Spar2U Product"
    }
    ```
    

### **2. Update All Product Prices (PUT Requests)**

These endpoints will update the prices of products in your database by scraping the price again.

#### **Update All Product Prices for Cargills**

- **URL:** `http://127.0.0.1:8000/scrape/cargills/price_update`
- **Method:** `PUT`
- **Body:** No body is needed. Just send the PUT request to trigger the price update for all products.

#### **Update All Product Prices for Keells**

- **URL:** `http://127.0.0.1:8000/scrape/keells/price_update`
- **Method:** `PUT`
- **Body:** No body is needed.

#### **Update All Product Prices for Kapruka**

- **URL:** `http://127.0.0.1:8000/scrape/kapruka/price_update`
- **Method:** `PUT`
- **Body:** No body is needed.

#### **Update All Product Prices for Glomark**

- **URL:** `http://127.0.0.1:8000/scrape/glomark/price_update`
- **Method:** `PUT`
- **Body:** No body is needed.

#### **Update All Product Prices for Lassana**

- **URL:** `http://127.0.0.1:8000/scrape/lassana/price_update`
- **Method:** `PUT`
- **Body:** No body is needed.

#### **Update All Product Prices for Spar2U**

- **URL:** `http://127.0.0.1:8000/scrape/spar2U/price_update`
- **Method:** `PUT`
- **Body:** No body is needed.

### **3. Search Products (GET Request)**

This endpoint allows you to search for products across the scraped data.

#### **Search Products**

- **URL:** `http://127.0.0.1:8000/search/search_products`
- **Method:** `GET`
- **Query Parameters (optional):** You can add query parameters like `q` to search for specific products. For example:
    
    ```
    http://127.0.0.1:8000/search/search_products?q=Example Product
    ```
    

---

### **Testing in Postman or Bruno**

1. **Start Your FastAPI Application**: Run your FastAPI app using the following command:
    
    ```bash
    uvicorn main:app --reload
    ```
    
    Your app will be accessible at `http://127.0.0.1:8000`.
    
2. **Use Postman or Bruno**:
    
    - Open **Postman** or **Bruno**.
    - For each request, select the appropriate HTTP method (e.g., POST, PUT, GET).
    - Set the URL to the corresponding endpoint (e.g., `http://127.0.0.1:8000/scrape/cargills/initial`).
    - For POST and PUT requests, set the **Content-Type** to `application/json` and provide the appropriate JSON body (as shown above).
    - For GET requests (like search), you can add query parameters directly in the URL.
3. **Send Requests**:
    
    - Click **Send** to trigger the scraping or updating operations.
    - Check the response to verify that the operation was successful, such as receiving a product object or confirmation message.

By following these steps, you should be able to test all of the scraping and search endpoints in your FastAPI app using **Postman** or **Bruno**.