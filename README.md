Travel Planner

Travel Planner is a web app that helps you make personalized trip itineraries with the help of a chatbot. You just answer a few questions about your trip, and the app creates a detailed plan for you. The plan is shown in a timeline format and also saved in a MongoDB database so you can look at it later.

The project has:

Frontend: React (with Tailwind CSS for styling)

Backend: Express.js with MongoDB

Authentication: JWT stored in cookies

Features

Chatbot Interface – A simple chatbot that asks about your trip (destination, budget, group size, etc.).

AI Trip Plans – Uses an AI API to generate day-by-day itineraries.

Save Trips – Trip plans are saved in MongoDB so you don’t lose them.

Timeline View – Itineraries are shown in a nice, expandable timeline.

Responsive Design – Works on desktop and mobile.

Authentication – Cookie-based login with JWT for security.

Project Structure
travel-planner/
├── backend/
│ ├── models/
│ │ └── trip.model.js # MongoDB schema for trips
│ ├── routes/
│ │ └── trip.js # Express routes for trip operations
│ ├── middlewares/
│ │ └── auth.middleware.js # JWT cookie authentication middleware
│ ├── config/
│ │ └── database.js # MongoDB connection configuration (optional)
│ ├── .env # Environment variables (e.g., MONGODB_URI, JWT_SECRET)
│ ├── index.js # Main Express server file
│ └── package.json # Backend dependencies
├── frontend/
│ ├── public/
│ │ ├── index.html # Main HTML file
│ │ ├── favicon.ico # Favicon
│ │ └── manifest.json # PWA manifest (optional)
│ ├── src/
│ │ ├── assets/ # Static assets (e.g., images, icons)
│ │ ├── components/
│ │ │ ├── common/
│ │ │ │ └── LayoutCommon.jsx # Common layout component
│ │ │ ├── trips/
│ │ │ │ ├── TripChatBot.jsx # Chatbot for trip planning
│ │ │ │ ├── ViewTrip.jsx # Trip plan display component
│ │ │ │ └── EmptyBoxState.jsx # Placeholder component
│ │ │ └── ui/ # UI components (e.g., Textarea, Button)
│ │ ├── pages/
│ │ └── CreateTrip.jsx # Main page for creating trips
│ │ ├── App.jsx # Root React component
│ │ ├── index.jsx # React entry point
│ │ ├── index.css # Global CSS (optional)
│ │ └── setupProxy.js # Proxy for API calls (optional, for development)
│ ├── .gitignore # Git ignore file
│ └── package.json # Frontend dependencies
└── README.md # This file

Prerequisites

Node.js: v16 or higher
MongoDB: Running locally or via a cloud provider (e.g., MongoDB Atlas)
Git: For cloning the repository

Installation

1. Clone the Repository
   git clone https://github.com/theabdulla0/Travel-Management.git
   cd Travel-Management

2. Backend Setup

Navigate to the backend directory:cd backend

Install dependencies:npm install

Create a .env file in the backend directory with the following:
PORT=3000
DB_URL=mongodb://localhost:27017/travel-planner
ACCESS_TOKEN_SECRET = your access token
ACCESS_TOKEN_EXPIRES_IN = 1d
REFRESH_TOKEN_SECRET = your refresh token
REFRESH_TOKEN_EXPIRES_IN = 7d

GEMINI_API_KEY= your ai-gemini key
GOOGLE_APP_PASSWORD = your google app password for nodemailer
GOOGLE_APP_GMAIL = your google app mail for nodemailer
URL = Backend url

Replace your_jwt_secret with a secure key for JWT signing.
Update MONGODB_URI if using a cloud database.

Start the backend server:npm start

3. Frontend Setup

Navigate to the frontend directory:cd frontend

Install dependencies:npm install

Start the React development server:npm start

The app will be available at http://localhost:3000.

Usage

Create a Trip:

Open the app in your browser.
Click "Create New Trip" in the chatbot interface.
Answer questions about your starting point, destination, group size, budget, duration, interests, and preferences.
The chatbot will generate a trip plan and display it in a timeline format.

View Trip Plan:

The generated trip plan appears in both the chatbot and the ViewTrip component.
Expand each day to see activities, hotel, and meal details.

Save Trip:

Trip plans are automatically saved to the database after generation.
Requires user authentication (JWT token stored in a cookie).

Authentication:

Log in to generate a JWT cookie (endpoint not shown; assumes a /login route).
The cookie is sent automatically with API requests.

API Endpoints
Backend Base URL: http://localhost:3000/api

POST /ai

Generates a trip plan based on user inputs.
Body: { plan: [string] } (array of user answers).
Response: { tripTitle, startingPoint, destination, groupSize, budgetCategory, durationDays, interests, itinerary, recommendations }

POST /trip/trip-save

Saves a trip plan to the database.
Body: { plan: { tripTitle, startingPoint, destination, groupSize, budgetCategory, durationDays, interests, itinerary, recommendations } }
Response: { message: "Trip saved successfully", trip: { \_id, tripDetails, createdBy, createdAt } }
Requires authentication (JWT cookie).

Dependencies
Backend

express: Web framework
mongoose: MongoDB ORM
jsonwebtoken: JWT authentication
cookie-parser: For parsing cookies
Others: See backend/package.json

Frontend

react: Frontend framework
axios: For API requests
react-icons: For icons (e.g., IoSend, HiChevronDown)
tailwindcss: For styling
Others: See frontend/package.json

Development
Backend

Run npm run dev with nodemon for hot reloading (add to package.json if needed).
Test endpoints using Postman or curl.

Frontend

Run npm start for development with hot reloading.
Use npm run build for production builds.

Troubleshooting

Trip Not Saving:

Check backend logs for SavePlan, Save trip before, or Error saving trip.
Verify the JWT cookie in the browser’s dev tools (Network tab).
Test /api/trip/trip-save with Postman to ensure the endpoint works.

ViewTrip Not Rendering:

Check frontend console for ViewTrip: trip prop received and ViewTrip: Invalid trip data.
Ensure the /api/ai response matches the expected structure:{
tripTitle: string,
startingPoint: string,
destination: string,
groupSize: string,
budgetCategory: string,
durationDays: number,
interests: string[],
itinerary: [{ day: number, title: string, activities: string[], hotel: string, meals: string[] }],
recommendations: { hotels: string[], restaurants: string[], travelTips: string[] }
}

Authentication Issues:

Ensure authMiddleware validates the JWT cookie correctly.
Check the cookie name (e.g., token) matches the backend’s expectation.

Future Improvements

Add an endpoint to fetch saved trips (/api/trip/trips).
Implement a UI to list and view saved trips.
Add input validation for user answers in TripChatBot.
Support editing and deleting saved trips.
Enhance EmptyBoxState for a richer empty state UI.

Contributing

Fork the repository.
Create a feature branch (git checkout -b feature/your-feature).
Commit changes (git commit -m "Add your feature").
Push to the branch (git push origin feature/your-feature).
Open a pull request.

License
MIT License. See LICENSE for details.
