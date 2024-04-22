# A/B Testing with React and Node.js

This project demonstrates an A/B testing implementation using React.js for the frontend and Node.js with Express.js for the backend. It utilizes Redis for caching and consistent hashing for distributing layouts among users.

## Project Structure

The project consists of two main folders:

1. `client`: Contains the React.js frontend application.
2. `api`: Contains the Node.js backend server.

## Prerequisites

Before running the project, make sure you have the following installed:

- Node.js (v12 or above)
- Redis
- The project also has a docker file to run redis, use docker compose up -d

## Getting Started

To get started with the project, follow these steps:

1. Clone the repository:

git clone https://github.com/arunks2/AB-Testing-Demo.git

2. Navigate to the project directory:

3. Install the dependencies for the api:
cd api
npm install

4. Install the dependencies for the client:
cd ../client
npm install

5. Start the backend server:
cd ../api
node src/index.js

6. Start the frontend development server:
cd ../client
npm start

7. Open your browser and visit `http://localhost:3000` to see the application in action.

## Configuration

- The backend server runs on `http://localhost:3001`.
- The frontend development server runs on `http://localhost:3000`.
- Make sure the Redis server is running on the default port (6379).

## How It Works

- The backend server generates a unique `userId` for each user and stores it as a cookie.
- The server uses consistent hashing to assign a layout to each user based on their `userId`.
- The assigned layout is cached in Redis for subsequent requests.
- The frontend application fetches the assigned layout from the backend server and renders the corresponding layout component.

## Technologies Used

- React.js
- Node.js
- Express.js
- Redis
- Consistent Hashing

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please feel free to submit a pull request or open an issue.

## License

This project is licensed under the [MIT License](LICENSE).