To connect your ESP32 to the dashboard when running in VS Code, here's how to set it up:

## 1. First, add WebSocket server to your ESP32 code (main.cpp):

Add this to your `platformio.ini`:

```ini
lib_deps = 
    marcoschwartz/LiquidCrystal_I2C@^1.1.4
    ottowinter/ESPAsyncWebServer-esphome@^3.1.0
    esphome/AsyncTCP-esphome@^2.0.1
    bblanchon/ArduinoJson@^6.21.3
```

Then add this code to your `main.cpp`:

```cpp
// Add these includes at the top
#include <ESPAsyncWebServer.h>
#include <AsyncTCP.h>
#include <ArduinoJson.h>

// Create AsyncWebServer object on port 80
AsyncWebServer server(80);
AsyncWebSocket ws("/ws");

// Add this function to handle WebSocket events
void onWsEvent(AsyncWebSocket * server, AsyncWebSocketClient * client, AwsEventType type, void * arg, uint8_t *data, size_t len){
  if(type == WS_EVT_CONNECT){
    Serial.println("WebSocket client connected");
    client->text("{\"message\":\"Connected to ESP32\"}");
  } else if(type == WS_EVT_DISCONNECT){
    Serial.println("WebSocket client disconnected");
  }
}

// Add this function to send data to dashboard
void sendDataToDashboard() {
  StaticJsonDocument<256> doc;
  
  doc["busId"] = busData.busId;
  doc["passengers"] = fusedPassengerCount;
  doc["capacity"] = MAX_CAPACITY;
  doc["occupancy"] = (float)fusedPassengerCount / MAX_CAPACITY * 100;
  doc["location"] = busData.currentLocation;
  doc["status"] = busData.status;
  doc["irCount"] = irPassengerCount;
  doc["cameraCount"] = cameraPassengerCount;
  doc["sensorAgreement"] = abs(irPassengerCount - cameraPassengerCount) <= 2;
  
  String jsonString;
  serializeJson(doc, jsonString);
  
  // Send to all connected clients
  ws.textAll(jsonString);
}

// In your setup() function, add:
void setup() {
  // ... your existing setup code ...
  
  // Initialize WebSocket
  ws.onEvent(onWsEvent);
  server.addHandler(&ws);
  
  // Start server
  server.begin();
  
  Serial.print("WebSocket server started at ws://");
  Serial.print(WiFi.localIP());
  Serial.println("/ws");
}

// In your loop() or sendToCloud() function, add:
void loop() {
  // ... your existing code ...
  
  // Send data to dashboard every 2 seconds
  static unsigned long lastDashboardUpdate = 0;
  if (millis() - lastDashboardUpdate > 2000) {
    sendDataToDashboard();
    lastDashboardUpdate = millis();
  }
  
  // Clean up WebSocket clients
  ws.cleanupClients();
}
```

## 2. Update your dashboard.js file:

Replace the WebSocket connection function in `dashboard.js`:

```javascript
// Add this at the top of dashboard.js
let ws = null;
let reconnectInterval = null;
const ESP32_IP = "192.168.1.100"; // Change this to your ESP32's IP address

// Add this function to connect to ESP32
function connectToESP32() {
    // Close existing connection if any
    if (ws) {
        ws.close();
    }
    
    const wsUrl = `ws://${ESP32_IP}/ws`;
    console.log(`Connecting to ESP32 at ${wsUrl}`);
    
    ws = new WebSocket(wsUrl);
    
    ws.onopen = () => {
        console.log('Connected to ESP32!');
        // Show connection status
        showConnectionStatus(true);
        
        // Clear reconnect interval
        if (reconnectInterval) {
            clearInterval(reconnectInterval);
            reconnectInterval = null;
        }
    };
    
    ws.onmessage = (event) => {
        try {
            const data = JSON.parse(event.data);
            updateDashboardWithRealData(data);
        } catch (e) {
            console.error('Error parsing data:', e);
        }
    };
    
    ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        showConnectionStatus(false);
    };
    
    ws.onclose = () => {
        console.log('Disconnected from ESP32');
        showConnectionStatus(false);
        
        // Try to reconnect every 5 seconds
        if (!reconnectInterval) {
            reconnectInterval = setInterval(() => {
                console.log('Attempting to reconnect...');
                connectToESP32();
            }, 5000);
        }
    };
}

// Add this function to update dashboard with real data
function updateDashboardWithRealData(data) {
    // Update main bus card
    document.getElementById('bus-passengers').textContent = `${data.passengers}/${data.capacity}`;
    document.getElementById('bus-location').textContent = data.location || 'Unknown';
    
    // Update occupancy bar
    const occupancyBar = document.getElementById('bus-occupancy-bar');
    occupancyBar.style.width = `${data.occupancy}%`;
    
    // Update status
    let status, statusGradient;
    if (data.occupancy >= 80) {
        status = 'OVERCROWDED';
        statusGradient = 'var(--gradient-danger)';
    } else if (data.occupancy >= 60) {
        status = 'NEARLY FULL';
        statusGradient = 'var(--gradient-warning)';
    } else {
        status = 'NORMAL';
        statusGradient = 'var(--gradient-success)';
    }
    
    document.getElementById('bus-status-badge').textContent = status;
    document.getElementById('bus-status-badge').style.setProperty('--status-gradient', statusGradient);
    document.getElementById('main-bus-card').style.setProperty('--status-gradient', statusGradient);
    occupancyBar.style.setProperty('--status-gradient', statusGradient);
    
    // Update sensor data if available
    if (data.irCount !== undefined && data.cameraCount !== undefined) {
        console.log(`IR: ${data.irCount}, Camera: ${data.cameraCount}, Agreement: ${data.sensorAgreement}`);
    }
}

// Add connection status indicator
function showConnectionStatus(connected) {
    const indicator = document.querySelector('.live-indicator');
    if (connected) {
        indicator.style.background = 'rgba(16, 185, 129, 0.1)';
        indicator.style.color = '#10b981';
        indicator.innerHTML = '<span class="live-dot" style="background: #10b981"></span>CONNECTED';
    } else {
        indicator.style.background = 'rgba(239, 68, 68, 0.1)';
        indicator.style.color = '#ef4444';
        indicator.innerHTML = '<span class="live-dot"></span>DISCONNECTED';
    }
}

// Modify the DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.body.setAttribute('data-theme', savedTheme);
    document.getElementById('theme-icon').className = savedTheme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
    
    // Initialize everything
    initializeCharts();
    initializeAnimations();
    
    // Try to connect to ESP32
    connectToESP32();
    
    // Keep simulated updates as fallback
    startRealTimeUpdates();
});
```

## 3. Set up your development environment:

### Step 1: Find your ESP32's IP address

Add this to your ESP32 code to print the IP:

```cpp
void setup() {
  // After WiFi connection
  Serial.print("ESP32 IP Address: ");
  Serial.println(WiFi.localIP());
}
```

### Step 2: Update dashboard.js with your ESP32's IP

```javascript
const ESP32_IP = "192.168.1.XXX"; // Replace with your ESP32's actual IP
```

### Step 3: Run your dashboard in VS Code

1. Install "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"
4. Dashboard opens at `http://127.0.0.1:5500`

### Step 4: Upload code to ESP32

1. Connect ESP32 to computer
2. In VS Code PlatformIO: Click Upload button (→)
3. Open Serial Monitor to see ESP32's IP address

### Step 5: Test the connection

1. Make sure ESP32 and your computer are on the same WiFi network
2. Dashboard should show "CONNECTED" when it connects to ESP32
3. Press buttons on ESP32 to see real-time updates

## 4. Troubleshooting:

### If connection fails:

1. **Check IP address**: Make sure you're using the correct ESP32 IP
2. **Same network**: Both devices must be on same WiFi
3. **Firewall**: Disable firewall temporarily to test
4. **Serial Monitor**: Check for errors in ESP32 serial output

### Add debug mode to dashboard:

```javascript
// Add this to see all WebSocket traffic
ws.onmessage = (event) => {
    console.log('Received:', event.data); // Debug line
    try {
        const data = JSON.parse(event.data);
        updateDashboardWithRealData(data);
    } catch (e) {
        console.error('Error parsing data:', e);
    }
};
```

## 5. Quick Test Setup:

Create a test button in your HTML to simulate data:

```html
<!-- Add this button to your dashboard -->
<button onclick="testESP32Connection()" style="position: fixed; bottom: 20px; right: 20px; padding: 10px;">
    Test ESP32 Connection
</button>
```

```javascript
// Add this function to dashboard.js
function testESP32Connection() {
    if (ws && ws.readyState === WebSocket.OPEN) {
        console.log('WebSocket is connected!');
        alert('Connected to ESP32 at ' + ESP32_IP);
    } else {
        console.log('WebSocket is not connected');
        alert('Not connected to ESP32. Trying to reconnect...');
        connectToESP32();
    }
}
```

Your dashboard will now receive real-time data from the ESP32 instead of simulated data!