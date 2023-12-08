# Heliverse Assignment

## Introduction

This is a full-stack web application that allows users to view and interact with a list of users. The application provides functionalities such as displaying users in a card format with pagination, searching users by name, applying filters, creating teams, and showing team details.

## Tech Stack

### Frontend
- React.js for UI components
- Redux for state management
- Tailwind CSS for styling

### Backend
- Node.js and Express.js for the server
- MongoDB for the database
- Mongoose for object modeling with MongoDB

## Features

### Frontend Features

1. **Display Users with Pagination:**
   - Users are displayed in a visually appealing card format with pagination, showing 20 users per page.

2. **Search by Name:**
   - Users can search for other users by typing their names. The list dynamically updates based on the search query.

3. **Filters:**
   - Three filters - Domain, Gender, and Availability are implemented.
   - Users can select multiple filters simultaneously to update the displayed user list.

4. **Create a Team:**
   - Users can create a team by selecting unique users based on domains and availability.

5. **Show Team Details:**
   - Once a team is created, the application displays details of the team, including the selected users' information.

6. **Responsive Design:**
   - The application is designed to be responsive and display properly on various screen sizes.

### Backend Features

1. **CRUD API:**
   - **GET /api/users:** Retrieve all users with pagination support.
   - **GET /api/users/:id:** Retrieve a specific user by ID.
   - **POST /api/users:** Create a new user.
   - **PUT /api/users/:id:** Update an existing user.
   - **DELETE /api/users/:id:** Delete a user.

2. **Filtering, Searching, and Pagination:**
   - Filtering logic for Domain, Gender, and Availability.
   - Searching logic to search for users by their names.
   - Pagination logic to retrieve a specific number of users per page.

3. **Team API Endpoints:**
   - **POST /api/team:** Create a new team by selecting users with unique domains and availability.
   - **GET /api/team/:id:** Retrieve the details of a specific team by ID.

## Usage

1. **Clone the Repository:**
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```
2. **Install Dependencies:**
    ```
    cd frontend
    npm install

    cd ../backend
    npm install
    ```
3. **Run the Application:**
    ```
    # Run frontend (in frontend folder)
    npm start

    # Run backend (in backend folder)
    npm start
    ``` 
4. **Open in Browser:**

    - Frontend: http://localhost:3000
    - Backend: http://localhost:5001

# Contact Information
For any concerns or questions, feel free to reach out via email at sutapalli.sns@gmail.com.

# Deployment Links
- Frontend: [Frontend Url](https://heliverse-beryl.vercel.app)
- Backend: [Backend Url](https://heliverse-backend-lo40.onrender.com)
