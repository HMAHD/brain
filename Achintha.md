## Detailed Plan

1. **Update the Navbar component**
    - Modify the Activities dropdown to link to new age-specific activity pages
2. **Create a new model for activities**
    - Create a new model in the backend for storing activities with age groups, titles, descriptions, steps, and images
3. **Create backend routes for activities**
    - Create routes to fetch activities by age group
    - Create routes to fetch a specific activity by ID
4. **Create frontend pages**
    - Create an ActivityList page to display activities for a specific age group
    - Create an ActivityDetails page to show full details of a specific activity
5. **Update App.jsx**
    - Add new routes for the activity pages
## Summary of Implementation

1. **Navbar Component**:
    - Updated the Activities dropdown menu to link to age-specific activity pages (1-5 years)
2. **Backend**:
    - Created a new `childActivityModel.js` with fields for title, description, age group, steps, materials, benefits, and images
    - Created routes in `childActivity.js` for CRUD operations on activities
3. **Frontend**:
    - Created `ActivityList.jsx` to display activities for a specific age group
    - Created `ActivityDetails.jsx` to show full details of a specific activity including steps, materials, and images
    - Added routes in `App.jsx` for the new activity pages
4. **Sample Data**:
    - Added sample activity data for demonstration purposes

## How It Works

1. When a user clicks on an age group in the Activities dropdown (e.g., "1 Year"), they are taken to `/activities/1-year`
2. The `ActivityList` component displays cards for all activities for that age group
3. When a user clicks on an activity card, they are taken to `/activity/:id` to see the full details
4. The `ActivityDetails` component displays comprehensive information about the activity, including:
    - Title and description
    - Benefits
    - Materials needed
    - Step-by-step instructions with images
    - Photos of the activity

