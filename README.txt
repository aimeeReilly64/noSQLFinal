# Aimee Final NoSQL Assignment 
Database for Artisan Collective Backend - pulling  from experience running by store The Tangled Oak + Craft Collective

Backend API built with Node.js and MongoDB to manage vendors, products, sales, and rental agreements for a handmade artisan collective. This is just pretend data for the school assignment.

- Node.js + Express.js
- MongoDB (NoSQL database)
- Mongoose (MongoDB ODM)
- RESTful API
---

## Getting Started
### Clone the Repository

```bash
git clone https://github.com/yourusername/aimee-final.git
cd aimee-final

## Dependencies
npm install
Ensure the following are installed:

Node.js (v18 or later) – https://nodejs.org

MongoDB

Local: https://www.mongodb.com/try/download/community

Git – https://git-scm.com/downloads

Postman or Swagger UI for testing REST APIs (Postman recommended)
------------------------

> use aimee_final
Method	Endpoint	Description
GET	/api/vendors	Get all vendors
POST	/api/vendors	Add a vendor
GET	/api/products	List all products
POST	/api/sales	Record a sale
GET	/api/rentals	List rental agreements
