Track It Backend
Prerequisites

Before starting, ensure you have installed:

Node.js (v18+ recommended)

npm (comes with Node.js)

PostgreSQL (v14+ recommended)

Optional: Postman or Insomnia for testing APIs

Clone the repository

In your terminal:

git clone https://github.com/davy-mgr/track-it-backend.git
cd track-it-backend
Install dependencies
npm install

This installs all required packages, including:

express → Web framework

pg → PostgreSQL client

bcrypt → Password hashing

jsonwebtoken → JWT authentication

dotenv → Environment variable management

nodemon → Development auto-reload

Set up PostgreSQL

Install PostgreSQL using https://www.postgresql.org/download/

Open pgAdmin or psql

Create a database:

CREATE DATABASE track_it;

Create tables. Example for Users:

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
Environment variables

Create a .env file in the root of the project:

PORT=5000
DB_USER=postgres
DB_PASSWORD=your_db_password
DB_HOST=localhost
DB_NAME=track_it
DB_PORT=5432
JWT_SECRET=your_super_secure_secret_here

Replace your_db_password with your PostgreSQL password

Replace JWT_SECRET with a long, random secret for JWT

Database setup

Ensure PostgreSQL service is running

Use pgAdmin or psql to connect to the database with credentials from .env

Make sure tables are created as above

Run the backend

For development (auto-reload with nodemon):

npm run dev

You should see:

PostgreSQL connected successfully
Track It Backend running on port 5000
Available API endpoints
Authentication
Method	Endpoint	Access	Description
POST	/users/signup	Public	Create new admin user
POST	/users/login	Public	Login user, returns JWT
User Management (Admin only)
Method	Endpoint	Access	Description
GET	/users	Admin	Get all users
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
Security considerations

Never commit .env to GitHub.

Use .gitignore to exclude node_modules/ and .env.

Hash passwords with bcrypt.

Protect all routes with JWT (authMiddleware).

Use adminOnly middleware for admin-only routes.

Development workflow

Start PostgreSQL

Create .env from example and set credentials

Run npm install

Start backend: npm run dev

Use Postman or frontend to test endpoints

Tips for collaborators

Copy .env.example to .env and fill in your credentials

Run npm install to get dependencies

Use JWT from login for protected endpoints: Authorization: Bearer <token>

Admin accounts can manage users, companies, and onboarding
