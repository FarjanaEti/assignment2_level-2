# RideFleet (Vehicle Rental System)

A robust and secure backend system for managing vehicle rentals, built with a modern Node.js and TypeScript stack.

## Live URL:https://assignment-2-ruby-zeta.vercel.app/

## Features

-->User Authentication: Secure registration and login using JWT and hashed passwords.
-->Role-Based Access: Admins can manage vehicles, bookings, and users; customers can browse and book vehicles.
-->Vehicle Management: Admins can add, update, or remove vehicles, along with real-time availability tracking.
-->Booking System: Customers can book vehicles for specific periods; prevents overlapping bookings.
-->Secure Operations: Passwords hashed with bcrypt and routes protected via JWT authentication.
-->Database Management: PostgreSQL database for storing users, vehicles, and bookings.

## Technology Stack

--> Backend: Node.js , TypeScript  
 -->Web Framework: Express.js  
 -->Database: PostgreSQL  
 -->Authentication: JSON Web Tokens (JWT)  
 -->Security: bcrypt for password hashing

## Setup and Usage Instructions

--> Node.js
-->npm or Yarn
-->PostgreSQL

### Installation

1. Clone the repository:https://github.com/FarjanaEti/assignment2_level-2
   cd assignment_level-2

   Install dependencies:

2. npm install
   or
   yarn install

3. Configure environment variables:
   Create a .env file in the root directory:

   PORT=5000

   DATABASE_URL=postgresql://username:password@localhost:5432/vehicle_rental

   JWT_SECRET=your_jwt_secret

4. Run the application:
   npm run dev
