
### Step 1: Data Collection from Wokwi Simulation
### Step 2: Collecting Data from Wokwi

1. **Run your simulation** for each test scenario (10 minutes each)
2. **Copy all Serial Monitor output** to a text file
3. **Save each scenario** separately (e.g., `scenario1_light_traffic.txt`)

### Step 3: Quick Data Collection Method

If you can't export serial data, manually record these metrics every 30 seconds:

```excel
Time | IR_Count | Camera_Count | Fused_Count | Occupancy% | Mismatch_LED | Alerts
0:00 | 12       | 13          | 13          | 26%        | OFF          | 0
0:30 | 15       | 17          | 16          | 32%        | ON           | 0
1:00 | 22       | 22          | 22          | 44%        | OFF          | 0
...
```

### Step 4: Creating Infographics

#### Using Excel/Google Sheets (Easiest):

1. **KPI Summary Dashboard**:
    
    - Create gauge charts for each KPI
    - Use conditional formatting (red/yellow/green)
    - Add sparklines for trends
2. **Comparison Charts**:
    
    - Bar chart: IR vs Camera vs Fusion accuracy
    - Line graph: Occupancy over time
    - Pie chart: Time distribution (normal/crowded/overcrowded)
3. **Heat Map** (in Excel):
    
    - Rows: Bus stops
    - Columns: Time slots
    - Cell colors: Occupancy levels
    - Use conditional formatting

#### Using Free Online Tools:

1. **Canva** (www.canva.com):
    
    - Search "Dashboard" templates
    - Input your KPI values
    - Customize colors to match your theme
2. **Google Data Studio**:
    
    - Import CSV data
    - Create interactive dashboards
    - Export as images for report
3. **Flourish** (flourish.studio):
    
    - Upload data
    - Create animated visualizations
    - Embed or screenshot

### Step 5: Essential Visualizations for Your Report### Step 6: Writing Your Evaluation Section

Here's a template structure for your evaluation section:### Step 7: Running Tests in Wokwi

Here's your testing checklist:### Step 8: Excel Template for Visualizations

Here's what to create in Excel/Google Sheets:

```excel
Sheet 1: Raw Data
Time | IR_Count | Camera_Count | Fused_Count | Occupancy% | Sensor_Match | Alert
(Enter your data here)

Sheet 2: Summary Stats
Metric                    | Value    | Target  | Status
Detection Accuracy        | 94.8%    | >90%    | ✓ PASS
Sensor Agreement Rate     | 87.3%    | >85%    | ✓ PASS  
Average Response Time     | 87ms     | <1000ms | ✓ PASS
System Uptime            | 100%     | >99%    | ✓ PASS
Boarding Rejection Rate   | 3.6%     | <5%     | ✓ PASS

Sheet 3: Scenario Results
(Create comparison table)

Sheet 4: Visualizations
- Chart 1: Line graph of occupancy over time
- Chart 2: Bar chart comparing sensor accuracies
- Chart 3: Pie chart of time in each state
- Chart 4: Cost-benefit timeline
```

### Final Tips for Success:

1. **Run each test scenario completely** - Don't skip steps
2. **Take plenty of screenshots** - You'll need them for the report
3. **Record unexpected behaviors** - These make great discussion points
4. **Calculate all KPIs** - Even if some don't meet targets
5. **Be honest about limitations** - This shows critical thinking

### For Your Report Graphics:

Use these color schemes for consistency:

- **Green** (#27AE60): Good performance, available seats
- **Yellow** (#F39C12): Warning, nearly full
- **Red** (#E74C3C): Alert, overcrowded
- **Blue** (#3498DB): Camera/technology elements
- **Gray** (#7F8C8D): Baseline/comparison data

