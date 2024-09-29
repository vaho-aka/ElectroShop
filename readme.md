# ElectroShop | E-commerce App

[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-4.2.0-yellow.svg)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.3.1-06B6D4.svg)](https://tailwindcss.com/)
[![Redux](https://img.shields.io/badge/Redux-4.2.1-764ABC.svg)](https://redux.js.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18.x-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.18.2-lightgrey.svg)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-7.4.1-brightgreen.svg)](https://www.mongodb.com/)
[![Docker](https://img.shields.io/badge/Docker-blue.svg)](https://www.docker.com/)

ElectroShop is an e-commerce application built with the MERN stack (MongoDB, Express, React, Node.js) and Dockerized for seamless deployment. This project includes backend, frontend, and MongoDB services, with automatic database restoration.

## Features

- **Frontend**: React app for the e-commerce interface.
- **Backend**: Node.js server with Express for handling API requests.
- **MongoDB**: Database for storing product and user data.
- **Dockerized**: Run the entire stack with Docker Compose.

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Running the Project with Docker

### Step 1: Clone the Repository

```bash
git clone https://github.com/vaho-aka/ElectroShop.git
cd ElectroShop
```

### Step 2: Build and Run with Docker Compose

Use Docker Compose to build and start all the services (backend, frontend, and MongoDB).

```bash
docker-compose up --build
```

This will:

- Build the backend and frontend Docker images.
- Start the MongoDB service and restore the initial data from the dump file.
- Launch the backend on `http://localhost:5000` and the frontend on `http://localhost:5001`.

### Step 3: Access the Application

- **Frontend**: Open your browser and navigate to `http://localhost:5001`.
- **Backend**: API requests can be made to `http://localhost:5000`.

### Step 4: Check MongoDB Data Restoration

The `docker-compose` setup automatically restores data to the MongoDB database using the dump file in the `./database` directory. Ensure the data is restored by accessing the MongoDB container or checking via your backend API.

## Project Structure

```
ElectroShop/
│
├── Backend/                  # Backend service with Node.js and Express
├── Frontend/                 # Frontend service with React
├── database/                 # MongoDB dump directory
├── data/                     # MongoDB data volume
├── docker-compose.yml        # Docker Compose configuration file
├── Dockerfile                # Backend Dockerfile
└── Frontend/Dockerfile       # Frontend Dockerfile
```

## Environment Variables

Make sure to configure the following environment variables `.env` for the backend:

- **Backend (`backend/.env`)**:
  ```
  MONGO_URI=mongodb://mongodb:27017/ElectroShop
  PORT = 5000
  NODE_ENV = development
  JWT_SECRET =
  JWT_EXPIRES_IN =
  JWT_COOKIE_EXPIRES_IN =
  ```

## Stopping the Application

To stop the services, use:

```bash
docker-compose down
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
