# Employee Profile Generator

A simple React application that fetches and displays random employee profiles using the [JSONPlaceholder API](https://jsonplaceholder.typicode.com/).

## Features

- Fetches employee data from the JSONPlaceholder API
- Displays employee information including name, email, phone, and location
- Allows users to get a new random employee profile with a button click
- Responsive UI with loading and error states
- Fallback to sample data when the API is unavailable

## How to Use

1. Clone the repository
2. Install dependencies with `npm install`
3. Run the development server with `npm run dev`
4. Open the application in your browser
5. Click the "Get New Employee" button to fetch a new random employee profile

## Fallback Mechanism

If the JSONPlaceholder API is down or unreachable, the application will automatically:
- Display an appropriate error message
- Use sample employee data instead
- Allow you to continue testing the application functionality
- Clearly indicate when sample data is being used

## Technologies Used

- React
- JavaScript
- CSS
- Vite
- JSONPlaceholder API
- DiceBear Avatars API (for user profile pictures)

## Project Structure

- `App.jsx`: Main component that manages state and API calls
- `App.css`: Styling for the application
- `index.css`: Global styling
