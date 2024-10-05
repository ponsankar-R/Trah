# TRAH

*TRAH* (Transportation Hub) is a web-based application designed to optimize the transportation industry by providing a platform for truck owners to manage their trucks and for customers to book trucks efficiently. The platform aims to reduce empty backhauls, improve logistics efficiency, and provide a seamless experience for all users.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Installation](#installation)
4. [Usage](#usage)
5. [Technology Stack](#technology-stack)
6. [AI Integration](#ai-integration)
7. [Contributing](#contributing)
8. [License](#license)

---

## Project Overview

TRAH is a two-part application:

- *Truck Owners*: A panel where truck owners can register their trucks, view verification statuses, and receive booking requests.
- *Customers*: A platform for customers to book trucks for transportation, view available trucks, and track deliveries.

The application aims to eliminate wasted journeys (empty backhauls), reducing operational inefficiencies and improving cost-effectiveness for both truck owners and customers.

---

## Features

### For Truck Owners:
- Register trucks with details such as capacity, type, and availability.
- Track the status of each truck (e.g., Available, Booked, On Travel, Under Verification).
- Request bookings for available trucks.

### For Customers:
- Search for available trucks based on cargo needs and trip details.
- Book trucks directly through the platform.
- Track ongoing deliveries.

### AI-Powered Predictions:
- *Cost Prediction*: AI system recommends transportation costs based on cargo type, distance, weather, and driver experience.
- *Generative AI Path Prediction*: An AI-powered feature that helps predict the optimal route and time for trucks based on historical data, current traffic conditions, and weather forecasts, allowing better efficiency in deliveries.

---

## Installation

To run this project locally, follow these steps:

1. Clone the repository:
   git clone https://github.com/ponsankar-R/Trah.git
   cd TRAH/REACT/my-app
   
2. Install dependencies:
  npm install

3. Run the frontend:
  npm start

4. Run the backend
   cd src/backend
   node db.js

5. Visit the site
   Visit http://localhost:3000 in your browser to access the platform.

## Usage
Truck Owners: Register and manage your trucks, and receive bookings from customers.
Customers: Search for trucks, book transportation services, and track deliveries.

## Technology Stack
**Frontend**: React.js, Tailwind CSS
**Backend**: Node.js, Express.js
**Database**: MongoDB (can be configured offline)
**AI Tools**: Intel oneAPI toolkit for prediction models
**Additional Tools**: Generative AI for path prediction integration
AI Integration
The platform integrates AI models to enhance the user experience
**Cost Prediction System**: The AI model predicts transportation costs based on parameters such as distance, cargo type, weather, and driver experience.
**Generative AI Path Prediction**: This feature optimizes truck routes by predicting the best path and time to ensure timely delivery while minimizing fuel consumption. It takes into account real-time traffic, weather, and historical data, enhancing logistics efficiency.

## Contributing
We welcome contributions! To contribute to this project:

Fork the repository.
Create a new feature branch (git checkout -b feature/your-feature).
Commit your changes (git commit -m 'Add your feature').
Push to the branch (git push origin feature/your-feature).
Open a Pull Request.

## License
This project is licensed under the MIT License. See the LICENSE file for more information.
