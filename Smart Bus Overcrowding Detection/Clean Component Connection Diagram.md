
## Physical Layout View

```
┌─────────────────────────────────────────────────────────────────────┐
│                         BUS CEILING                                 │
│                    ┌─────────────────┐                             │
│                    │   📷 CAMERA     │                             │
│                    │  ESP32-CAM      │                             │
│                    │  (GPIO 16,17)   │                             │
│                    └────────┬────────┘                             │
└─────────────────────────────┼─────────────────────────────────────┘
                              │ Serial
┌─────────────────────────────┼─────────────────────────────────────┐
│                         CONTROL BOX                                 │
│  ┌─────────────────────────┴──────────────────────────────────┐  │
│  │                     ESP32 DEVKIT C                          │  │
│  │  ┌────────────────────────────────────────────────────┐    │  │
│  │  │ GPIO  2: Entry IR    GPIO 25: Green LED           │    │  │
│  │  │ GPIO 15: Exit IR     GPIO 26: Yellow LED          │    │  │
│  │  │ GPIO 21: LCD SDA     GPIO 27: Red LED             │    │  │
│  │  │ GPIO 22: LCD SCL     GPIO 13: Camera Active LED   │    │  │
│  │  │ GPIO 32: Buzzer      GPIO 14: Mismatch LED        │    │  │
│  │  │ GPIO 34: Flow Pot    GPIO 16: Camera RX           │    │  │
│  │  │ GPIO 35: Acc. Pot    GPIO 17: Camera TX           │    │  │
│  │  │ GPIO 33: Fusion SW   GPIO  4: Camera Trigger Btn  │    │  │
│  │  └────────────────────────────────────────────────────┘    │  │
│  └─────────────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│                         DRIVER AREA                                 │
│  ┌───────────────┐  ┌─────────────────────┐  ┌─────────────┐     │
│  │  LCD DISPLAY  │  │    LED PANEL        │  │   BUZZER    │     │
│  │ ┌───────────┐ │  │  🟢 🟡 🔴 🔵 🟠    │  │     🔊      │     │
│  │ │Pass: 25/50│ │  │  G  Y  R  C  M      │  │             │     │
│  │ │Nearly Full│ │  │                     │  │             │     │
│  │ └───────────┘ │  └─────────────────────┘  └─────────────┘     │
│  └───────────────┘                                                 │
└────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│                      DOOR SENSORS                                   │
│  ENTRY DOOR                                    EXIT DOOR           │
│  ┌─────┐  ┌─────┐                    ┌─────┐  ┌─────┐           │
│  │ IR  │  │ IR  │                    │ IR  │  │ IR  │           │
│  │ TX  │→→│ RX  │                    │ TX  │→→│ RX  │           │
│  └─────┘  └─────┘                    └─────┘  └─────┘           │
└────────────────────────────────────────────────────────────────────┘
```

## Wiring Summary Table

|Component|Pin/Connection|Wire Color|Purpose|
|---|---|---|---|
|**IR Entry Sensor**|GPIO 2|Green|Digital Input|
|**IR Exit Sensor**|GPIO 15|Green|Digital Input|
|**Camera Module**|GPIO 16/17|Blue|Serial Comm|
|**LCD Display**|GPIO 21/22|Yellow|I2C Bus|
|**Status LEDs**|GPIO 25/26/27|Various|Status Output|
|**Camera LED**|GPIO 13|Blue|Camera Active|
|**Mismatch LED**|GPIO 14|Orange|Alert|
|**Buzzer**|GPIO 32|Red|Audio Alert|
|**Flow Pot**|GPIO 34|Purple|Analog Input|
|**Accuracy Pot**|GPIO 35|Purple|Analog Input|
|**Fusion Switch**|GPIO 33|Cyan|Digital Input|
|**Power**|VIN/GND|Red/Black|5V Supply|

## Data Flow Sequence

```
1. SENSORS → ESP32
   ├── IR Sensors: Instant detection (interrupt-based)
   ├── Camera: 2-second interval processing
   └── GPS: Continuous location updates

2. ESP32 PROCESSING
   ├── Count passengers (IR)
   ├── Validate with camera
   ├── Apply fusion algorithm
   └── Generate alerts if needed

3. OUTPUT ACTIONS
   ├── Update LCD display
   ├── Control LED states
   ├── Trigger buzzer alerts
   └── Send to cloud

4. CLOUD SYNC
   ├── WiFi transmission every 5s
   ├── MQTT protocol
   └── Dashboard updates
```

## System States

```
┌─────────────┬──────────────┬─────────────┬──────────────┐
│   STATE     │  OCCUPANCY   │    LEDs     │   DISPLAY    │
├─────────────┼──────────────┼─────────────┼──────────────┤
│  AVAILABLE  │    0-60%     │  🟢 ON      │ "Seats Avail"│
│  NEARLY FULL│   60-80%     │  🟡 ON      │ "Nearly Full"│
│  OVERCROWDED│   80-100%    │  🔴 ON      │ "OVERCROWDED"│
│  MISMATCH   │   Any        │  🟠 ON      │ Normal + "!" │
│  PROCESSING │   Any        │  🔵 BLINK   │ Normal       │
└─────────────┴──────────────┴─────────────┴──────────────┘
```