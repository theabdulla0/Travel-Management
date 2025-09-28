# Travel Planner 🧳✈️

A smart web application that helps you create personalized trip itineraries using an AI-powered chatbot. Simply answer a few questions about your travel preferences, and get a detailed day-by-day plan that's automatically saved for future reference.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Screenshots](#screenshots)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [Future Improvements](#future-improvements)
- [License](#license)

## Features

- **🤖 Smart Chatbot Interface** - Interactive bot that asks about your trip preferences
- **🎯 AI-Generated Itineraries** - Creates detailed day-by-day travel plans using Gemini AI
- **💾 Trip Saving** - Automatically saves your trips to MongoDB for later viewing
- **📱 Responsive Design** - Works perfectly on both desktop and mobile devices
- **🔒 Secure Authentication** - JWT-based authentication with cookie storage
- **📅 Timeline View** - Beautiful, expandable timeline format for your itinerary
- **🏨 Complete Trip Details** - Includes activities, hotels, meals, and travel tips

## Tech Stack

### Frontend
- **React** - User interface framework
- **Tailwind CSS** - Styling and responsive design
- **Axios** - API communication
- **React Icons** - Beautiful icons throughout the app

### Backend
- **Express.js** - Web server framework
- **MongoDB** - Database for storing trips
- **Mongoose** - MongoDB object modeling
- **JWT** - Secure authentication
- **Gemini AI API** - AI-powered trip generation

## Project Structure

```
travel-planner/
├── backend/
│   ├── models/
│   │   └── trip.model.js          # Trip data schema
│   ├── routes/
│   │   └── trip.js                # Trip-related API routes
│   ├── middlewares/
│   │   └── auth.middleware.js     # Authentication middleware
│   ├── config/
│   │   └── database.js            # Database connection
│   ├── .env                       # Environment variables
│   ├── index.js                   # Main server file
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── trips/
│   │   │   │   ├── TripChatBot.jsx    # Chatbot component
│   │   │   │   ├── ViewTrip.jsx       # Trip display component
│   │   │   │   └── EmptyBoxState.jsx  # Empty state component
│   │   │   └── ui/                    # Reusable UI components
│   │   ├── pages/
│   │   │   └── CreateTrip.jsx         # Main trip creation page
│   │   ├── App.jsx
│   │   └── index.jsx
│   └── package.json
└── README.md
```

## Prerequisites

Before you start, make sure you have these installed on your computer:

- **Node.js** (version 16 or higher) - [Download here](https://nodejs.org/)
- **MongoDB** - Either install locally or use [MongoDB Atlas](https://www.mongodb.com/atlas)
- **Git** - [Download here](https://git-scm.com/)

## Installation

### Step 1: Get the Code
```bash
git clone https://github.com/theabdulla0/Travel-Management.git
cd Travel-Management
```

### Step 2: Set Up the Backend
```bash
# Go to backend folder
cd backend

# Install required packages
npm install

# Start the backend server
npm start
```

### Step 3: Set Up the Frontend
```bash
# Open a new terminal and go to frontend folder
cd frontend

# Install required packages
npm install

# Start the React app
npm start
```

The app will open in your browser at `http://localhost:3000`

## Configuration

Create a `.env` file in the `backend` directory with these settings:

```env
PORT=3000
DB_URL=mongodb://localhost:27017/travel-planner
ACCESS_TOKEN_SECRET=your_super_secret_key_here
ACCESS_TOKEN_EXPIRES_IN=1d
REFRESH_TOKEN_SECRET=your_refresh_secret_key_here
REFRESH_TOKEN_EXPIRES_IN=7d
GEMINI_API_KEY=your_gemini_api_key_here
GOOGLE_APP_PASSWORD=your_google_app_password
GOOGLE_APP_GMAIL=your_gmail_address
URL=http://localhost:3000
```

**Important:** Replace the placeholder values with your actual credentials:
- Get your Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
- Set up Google App Password for email features
- Create strong, unique secrets for JWT tokens

## Usage

### Creating Your First Trip

1. **Open the App** - Navigate to `http://localhost:3000`
2. **Start Planning** - Click "Create New Trip" 
3. **Chat with the Bot** - Answer questions about:
   - Where you're starting from
   - Your destination
   - Group size (solo, couple, family, etc.)
   - Budget range
   - Trip duration
   - Your interests and preferences

4. **Get Your Plan** - The AI will generate a complete itinerary with:
   - Daily activities and attractions
   - Hotel recommendations
   - Meal suggestions
   - Travel tips

5. **Save & View** - Your trip is automatically saved and displayed in a beautiful timeline format

### Viewing Your Trips

- All generated trips are saved to your account
- Click on any day in the timeline to see detailed activities
- Expand sections to view hotels, meals, and recommendations

## API Endpoints

### Generate Trip Plan
```http
POST /api/ai
```
**Body:**
```json
{
  "plan": ["New York", "Paris", "2 people", "Medium budget", "5 days", "Culture, Food"]
}
```

**Response:**
```json
{
  "tripTitle": "5-Day Cultural Journey to Paris",
  "startingPoint": "New York",
  "destination": "Paris",
  "groupSize": "2 people",
  "budgetCategory": "Medium",
  "durationDays": 5,
  "interests": ["Culture", "Food"],
  "itinerary": [
    {
      "day": 1,
      "title": "Arrival & City Overview",
      "activities": ["Check into hotel", "Seine River walk"],
      "hotel": "Hotel Recommendation",
      "meals": ["Welcome dinner at local bistro"]
    }
  ],
  "recommendations": {
    "hotels": ["Hotel A", "Hotel B"],
    "restaurants": ["Restaurant 1", "Restaurant 2"],
    "travelTips": ["Tip 1", "Tip 2"]
  }
}
```

### Save Trip
```http
POST /api/trip/save-trip
```
Requires authentication. Saves the generated trip to the database.

## Screenshots

*Add screenshots of your application here once you have them*

- Chatbot interface
- Generated itinerary timeline
- Trip details view
- Mobile responsive design

## Troubleshooting

### Common Issues

**🔧 Trip Not Saving?**
- Check if you're logged in (JWT cookie present)
- Look at browser console for error messages
- Verify backend server is running

**🔧 ViewTrip Component Not Working?**
- Check browser console for error messages
- Ensure the API response matches expected format
- Verify trip data structure

**🔧 Authentication Problems?**
- Clear browser cookies and try again
- Check if JWT secret is set in `.env`
- Verify backend authentication middleware

**🔧 Can't Connect to Database?**
- Make sure MongoDB is running
- Check your database URL in `.env`
- Verify database permissions

## Contributing

I welcome contributions! Here's how you can help:

1. **Fork** this repository
2. **Create** a new branch (`git checkout -b feature/amazing-feature`)
3. **Make** your changes
4. **Test** everything works
5. **Commit** your changes (`git commit -m 'Add amazing feature'`)
6. **Push** to your branch (`git push origin feature/amazing-feature`)
7. **Open** a Pull Request

### What You Can Contribute
- Bug fixes
- New features
- UI improvements
- Documentation updates
- Test coverage

## Future Improvements

- [ ] Add trip editing and deletion features
- [ ] Implement trip sharing functionality
- [ ] Add photo upload for trips
- [ ] Create trip templates for popular destinations
- [ ] Add budget tracking features
- [ ] Implement user profiles and preferences
- [ ] Add offline mode support
- [ ] Create mobile app versions

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Made with ❤️ by [theabdulla0](https://github.com/theabdulla0)**

*Happy traveling! 🌍*