# Track It Backend

**Track It** is a Node.js/Express backend for tracking company onboarding to SokoFund. Features include:

- User authentication (JWT, admin-only access)
- Company management (CRUD)
- Onboarding workflow tracking (`unstarted`, `pending`, `on hold`, `done`)
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

Before starting, ensure you have installed:

- Node.js (v18+ recommended)
- npm (comes with Node.js)
- PostgreSQL (v14+ recommended)
- Optional: Postman or Insomnia for API testing

---

## Clone the Repository

```bash
git clone https://github.com/davy-mgr/track-it-backend.git
cd track-it-backend
Install Dependencies
npm install

Installs the following packages:

express → Web framework

pg → PostgreSQL client

bcrypt → Password hashing

jsonwebtoken → JWT authentication

dotenv → Environment variable management

nodemon → Development auto-reload

Set Up PostgreSQL

Install PostgreSQL from https://www.postgresql.org/download/

Open pgAdmin or psql.

Create a database:

CREATE DATABASE track_it;

Create the required tables:

-- Users table
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

-- Companies table
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

-- Onboarding table
CREATE TABLE onboarding (
  onboarding_id SERIAL PRIMARY KEY,
  company_id INT REFERENCES companies(id) ON DELETE CASCADE,
  status VARCHAR(20) DEFAULT 'unstarted',
  assigned_to INT REFERENCES users(id) ON DELETE SET NULL,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP
);

-- Messages table
CREATE TABLE messages (
  message_id SERIAL PRIMARY KEY,
  sender_id INT REFERENCES users(id) ON DELETE CASCADE,
  receiver_id INT REFERENCES users(id) ON DELETE CASCADE,
  message TEXT,
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
Environment Variables

Create a .env file in the root directory:

PORT=5000
DB_USER=postgres
DB_PASSWORD=your_db_password
DB_HOST=localhost
DB_NAME=track_it
DB_PORT=5432
JWT_SECRET=your_super_secure_secret_here

Notes:

Replace your_db_password with your PostgreSQL password.

Replace JWT_SECRET with a long, random string (used for JWT authentication).

.env is never committed to GitHub for security.

Run the Backend

For development with auto-reload:

npm run dev

Expected output:

PostgreSQL connected successfully
Track It Backend running on port 5000
Available API Endpoints
Authentication
Method	Endpoint	Access	Description
POST	/users/signup	Public	Create new admin user
POST	/users/login	Public	Login user, returns JWT
User Management (Admin Only)
Method	Endpoint	Access	Description
GET	/users	Admin	List all users
PUT	/users/:id	Admin	Update user info
DELETE	/users/:id	Admin	Delete user
Company Management
Method	Endpoint	Access	Description
POST	/companies	Admin	Add new company
GET	/companies	Admin	List all companies
PUT	/companies/:id	Admin	Update company
DELETE	/companies/:id	Admin	Delete company
Onboarding Workflow
Method	Endpoint	Access	Description
POST	/onboarding	Admin	Create onboarding record
GET	/onboarding	Admin	List all onboarding records
PUT	/onboarding/:id	Admin	Update status/assigned admin/notes
DELETE	/onboarding/:id	Admin	Delete onboarding record
Messaging (Admins)
Method	Endpoint	Access	Description
POST	/messages	Admin	Send a message to another admin
GET	/messages/:userId	Admin	Get messages for a user
Security Considerations

Never commit .env to GitHub

Use .gitignore to exclude node_modules/ and .env

Hash passwords with bcrypt

Protect routes with JWT (authMiddleware)

Admin-only routes use adminOnly middleware

Development Workflow

Start PostgreSQL service

Create .env with credentials

Run npm install

Start backend: npm run dev

Test endpoints using Postman, Insomnia, or frontend

Commit changes and push:

git add .
git commit -m "Update backend"
git push
