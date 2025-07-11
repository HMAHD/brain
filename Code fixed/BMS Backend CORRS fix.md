- /var/www/bms_admin/backend/src/index.js

```js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const dbConnect = require("./config/dbConnect");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const clientRoutes = require("./routes/clientRoutes");
const roleTaskRoutes = require("./routes/asignRole&TaskRoutes");
const securityPrivacyRoutes = require("./routes/security&privacyRoutes");
const meetingSchedule = require("./routes/meetnigRoutes");
const complaintRoutes = require("./routes/complaintRoutes");
const documentRoutes = require("./routes/documentRoutes");
const usersRoutes = require("./routes/usersRoute");
const formRoutes = require("./routes/formRoutes");
const clientServiceManagementRoutes = require("./routes/clientServiceManagementRoutes");
const notificationsRoutes = require("./routes/notificationRoutes");
const roleRoutes = require("./routes/roleRoutes");

const cookieParser = require("cookie-parser");
const errorHandler = require("./middlewares/errorMiddleware");

dbConnect();

const app = express();

// Middleware for parsing JSON and cookies
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

// CORS Configuration
app.use(
  cors({
    origin: ["http://localhost:3000", "https://app.newoon.com"], // Add all allowed origins here
    credentials: true, // Allow cookies
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"], // Allow these HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allow these headers
  })
);

// Handle preflight requests globally
app.options("*", cors());

// Serve static files from the uploads directory
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/super-admin", userRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/roles-task", roleTaskRoutes);
app.use("/api/security-privacy", securityPrivacyRoutes);
app.use("/api/meeting-schedule", meetingSchedule);
app.use("/api/complaint", complaintRoutes);
app.use("/api/document", documentRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/forms", formRoutes);
app.use("/api/client-service", clientServiceManagementRoutes);
app.use("/api/notifications", notificationsRoutes);
app.use("/api/role", roleRoutes);

// Error Middleware
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 5000; // Default to port 5000 if no environment variable is set
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});

```
