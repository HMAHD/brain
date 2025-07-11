
### src/features/auth

``` js
import axios from "axios";

  

const BASE_URL =

  process.env.REACT_APP_BASE_URL?.replace(/\/$/, "") ||

  "https://pricingapi.se.lk/api";

const API_URL = "users"; // Removed the leading slash to avoid double slashes

  

// Configure axios to automatically add Authorization header

axios.interceptors.request.use((config) => {

  const user = JSON.parse(localStorage.getItem("user"));

  if (user?.token) {

    config.headers.Authorization = `Bearer ${user.token}`;

  }

  return config;

});

  

// Login user

const login = async (userData) => {

  try {

    const response = await axios.post(

      `${BASE_URL}/${API_URL}/login`, // ✅ Ensures proper API URL formatting

      userData

    );

    if (response.data) {

      localStorage.setItem("user", JSON.stringify(response.data));

    }

    return response.data;

  } catch (error) {

    console.error("Login API Error:", error.response?.data || error.message);

    throw error.response?.data || new Error("An unexpected error occurred");

  }

};

  

// Logout user

const logout = async () => {

  localStorage.removeItem("user");

};

  

const AuthService = {

  login,

  logout,

};

  

export default AuthService;
```

### src/features/shop

```js
import axios from "axios";

const BASE_URL =
  process.env.REACT_APP_BASE_URL?.replace(/\/$/, "") || "https://pricingapi.se.lk/api";
const API_URL = "shop"; // ✅ No leading/trailing slash

//@DESC CREATE SHOP
const createShop = async (shopData) => {
    try {
        const response = await axios.post(`${BASE_URL}/${API_URL}`, shopData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        if (!response.data) {
            throw new Error("Failed to create shop - No data returned");
        }

        return response.data;
    } catch (error) {
        console.error("Error creating shop:", error.message);
        throw error;
    }
};

//@DESC GET SHOPS
const getShops = async () => {
    const response = await axios.get(`${BASE_URL}/${API_URL}`);
    if (response.data) {
        return response.data;
    } else {
        console.error("Error fetching shops: No data returned");
        throw new Error("Failed to fetch shops");
    }
};

//@DESC UPDATE SHOP
const updateShop = async (shopId, shopData) => {
    const response = await axios.put(`${BASE_URL}/${API_URL}/${shopId}`, shopData);
    return response.data;
};

//@DESC DELETE SHOP
const deleteShop = async (shopId) => {
    const response = await axios.delete(`${BASE_URL}/${API_URL}/${shopId}`);
    return response.data;
};

//@DESC PARSE SHOP NAME TO SCRAPE
const PYTHON_BACKEND_URL =
  process.env.REACT_APP_PYTHON_BACKEND_URL?.replace(/\/$/, "") || "http://127.0.0.1:8001";

const parseShopNameToScrap = async (shopName) => {
    try {
        const response = await axios.post(`${PYTHON_BACKEND_URL}/scrape/${shopName}/price_update`);

        if (response.status === 200) {
            console.log(`++++++++++++++${response.data}++++++++++++++`);
            return response.data;
        } else {
            console.error("Error parsing shop name: Unexpected response status");
            throw new Error("Failed to parse shop name");
        }
    } catch (error) {
        console.error("Error parsing shop name:", error.message);
        throw error;
    }
};

const ShopService = {
    createShop,
    getShops,
    updateShop,
    deleteShop,
    parseShopNameToScrap
};

export default ShopService;

```

### src/features/user
```js
import axios from "axios";

const BASE_URL =
  process.env.REACT_APP_BASE_URL?.replace(/\/$/, "") || "https://pricingapi.se.lk/api";
const API_URL = "users"; // ✅ No leading/trailing slash

//@DESC CREATE USER
const createUser = async (userData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    const response = await axios.post(`${BASE_URL}/${API_URL}`, userData, config);
    return response.data;
};

//@DESC GET USERS
const getUsers = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    const response = await axios.get(`${BASE_URL}/${API_URL}`, config);
    return response.data;
};

//@DESC UPDATE USER
const updateUser = async (userID, userData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    const response = await axios.put(`${BASE_URL}/${API_URL}/${userID}`, userData, config);
    return response.data;
};

//@DESC DELETE USER
const deleteUser = async (userID, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    const response = await axios.delete(`${BASE_URL}/${API_URL}/${userID}`, config); // ✅ Fixed
    return response.data;
};

const UserService = {
    createUser,
    getUsers,
    updateUser,
    deleteUser
};

export default UserService;

```


### src/features/item
```js
// src/features/item/ItemService.js
import axios from "axios";

const BASE_URL =
  process.env.REACT_APP_BASE_URL?.replace(/\/$/, "") || "https://pricingapi.se.lk/api";
const API_URL = "item"; // ✅ No leading/trailing slash

// Fetch all items
const fetchItems = async () => {
    const response = await axios.get(`${BASE_URL}/${API_URL}`);
    return response.data;
};

// Fetch a single item by ID
const fetchItemById = async (id) => {
    const response = await axios.get(`${BASE_URL}/${API_URL}/${id}`);
    return response.data;
};

// Create a new item
const createItem = async (itemData) => {
    const response = await axios.post(`${BASE_URL}/${API_URL}`, itemData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
};

// Update an item by ID
const updateItem = async (id, itemData) => {
    const response = await axios.put(`${BASE_URL}/${API_URL}/${id}`, itemData);
    return response.data;
};

// Delete an item by ID
const deleteItem = async (id) => {
    await axios.delete(`${BASE_URL}/${API_URL}/${id}`);
    return id;
};

const ItemService = {
    fetchItems,
    fetchItemById,
    createItem,
    updateItem,
    deleteItem,
};

export default ItemService;

```

### src/features/category

```js
// src/features/category/CategoryService.js
import axios from "axios";

const BASE_URL =
  process.env.REACT_APP_BASE_URL?.replace(/\/$/, "") || "https://pricingapi.se.lk/api";
const API_URL = "category"; // ✅ No leading/trailing slash

// Fetch all categories
const fetchCategories = async () => {
    const response = await axios.get(`${BASE_URL}/${API_URL}`);
    return response.data;
};

// Create a new category
const createCategory = async (categoryData) => {
    const response = await axios.post(`${BASE_URL}/${API_URL}`, categoryData);
    return response.data;
};

// Update a category by ID
const updateCategory = async (id, categoryData) => {
    const response = await axios.put(`${BASE_URL}/${API_URL}/${id}`, categoryData);
    return response.data;
};

// Delete a category by ID
const deleteCategory = async (id) => {
    await axios.delete(`${BASE_URL}/${API_URL}/${id}`);
    return id;
};

const CategoryService = {
    fetchCategories,
    createCategory,
    updateCategory,
    deleteCategory,
};

export default CategoryService;

```


### env
```ls
# The port for the backend API

REACT_APP_API_URL=https://pricingapi.se.lk/

# Secret key for any encryption or JWTs

REACT_APP_SECRET_KEY=12345

# Other optional environment variables:

REACT_APP_FEATURE_FLAG=true

REACT_APP_PYTHON_BACKEND_URL=https://127.0.0.1:8001

REACT_APP_BASE_URL=https://pricingapi.se.lk/api
```