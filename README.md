# Track It Backend

Track It is a Node.js/Express backend for tracking company onboarding to SokoFund.

## Features

- User authentication (JWT, admin-only access)
- Company management (CRUD)
- Onboarding workflow tracking (unstarted, pending, on hold, done)
- Messaging between admins
- Admin-only account management
- PostgreSQL database integration

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Clone the Repository](#clone-the-repository)
3. [Install Dependencies](#install-dependencies)
4. [Set Up PostgreSQL](#set-up-postgresql)
5. [Environment Variables](#environment-variables)
6. [Database Setup](#database-setup)
7. [Run the Backend](#run-the-backend)
8. [Available API Endpoints](#available-api-endpoints)
9. [Security Considerations](#security-considerations)
10. [Development Workflow](#development-workflow)
11. [Tips for Collaborators](#tips-for-collaborators)

---

## Prerequisites

- **Node.js**: v18 or higher
- **npm**: (comes with Node.js)
- **PostgreSQL**: v14 or higher
- **Optional**: Postman or Insomnia for API testing

---

## Clone the Repository

Install Dependencies
Bash

npm install

Core Packages:

    express: Web framework

    pg: PostgreSQL client

    bcrypt: Password hashing

    jsonwebtoken: JWT authentication

    dotenv: Environment variable management

    nodemon: Development auto-reload

Set Up PostgreSQL

    Install PostgreSQL from postgresql.org.

    Create the database via psql or pgAdmin:
    SQL

    CREATE DATABASE track_it;

Environment Variables

Create a .env file in the root directory:
Code snippet

PORT=5000
DB_USER=postgres
DB_PASSWORD=your_db_password
DB_HOST=localhost
DB_NAME=track_it
DB_PORT=5432
JWT_SECRET=your_super_secure_secret_here

    Note: .env is ignored by git to keep your credentials safe.

Database Setup

Run these commands to initialize your tables:
Users Table
SQL

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  email VARCHAR(100) UNIQUE NOT NULL,
  phone VARCHAR(20),
  position VARCHAR(50),
  username VARCHAR(50),
  password VARCHAR(255) NOT NULL,
  role VARCHAR(20) DEFAULT 'admin',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP
);

Companies Table
SQL

CREATE TABLE companies (
  id SERIAL PRIMARY KEY,
  company_name VARCHAR(100) NOT NULL,
  industry VARCHAR(50),
  country VARCHAR(50),
  company_size VARCHAR(50),
  website VARCHAR(255),
  contact_person VARCHAR(50),
  contact_email VARCHAR(100),
  contact_phone VARCHAR(20),
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP
);

Onboarding & Messages
SQL

CREATE TABLE onboarding (
  onboarding_id SERIAL PRIMARY KEY,
  company_id INT REFERENCES companies(id) ON DELETE CASCADE,
  status VARCHAR(20) DEFAULT 'unstarted',
  assigned_to INT REFERENCES users(id) ON DELETE SET NULL,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP
);

CREATE TABLE messages (
  message_id SERIAL PRIMARY KEY,
  sender_id INT REFERENCES users(id) ON DELETE CASCADE,
  receiver_id INT REFERENCES users(id) ON DELETE CASCADE,
  message TEXT,
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

Available API Endpoints
Authentication
Method	Endpoint	Access	Description
POST	/users/signup	Public	Create new admin user
POST	/users/login	Public	Login user, returns JWT
Company & Workflow
Method	Endpoint	Access	Description
GET	/companies	Admin	List all companies
POST	/companies	Admin	Add new company
PUT	/onboarding/:id	Admin	Update status/notes
GET	/messages/:id	Admin	Get user messages
Run the Backend
Bash

npm run dev

Tips for Collaborators

    Always pull the latest code before starting work.

    Use consistent naming (snake_case) for database fields.

    Write clear commit messages.
