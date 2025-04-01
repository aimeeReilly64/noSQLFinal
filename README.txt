##
Database for Artisan Collective Backend – pulling from experience running my store, The Tangled Oak + Craft Collective

Backend API built with Node.js and MongoDB to manage vendors, products, sales, and rental agreements for a handmade artisan collective. This is just pretend data for the school assignment, but it reflects real-world use cases.

Node.js + Express.js
MongoDB (NoSQL database)
Mongoose (MongoDB ODM)
RESTful API
Postman

##Getting Started
Clone the Repository

git clone https://github.com/yourusername/aimee-final.git
cd aimee-final
Set Up Project Structure
npm install

Ensure the following are installed:
Node.js – https://nodejs.org
MongoDB (Local) – https://www.mongodb.com/try/download/community
Git – https://git-scm.com/downloads
Postman – https://www.postman.com/downloads/

MongoDB Setup
MongoDB Atlas
Create a cluster on MongoDB Atlas

Create a new database
Add collections: vendors, products, sales, rental_agreements

***Copy the connection string and update it in your code

Start MongoDB server with replication: 
"C:\Program Files\MongoDB\Server\8.0\bin\mongod.exe" --replSet rs1 --port 27017 --dbpath C:\replicaSet\rs0
"C:\Program Files\MongoDB\Server\8.0\bin\mongod.exe" --replSet rs1 --port 27018 --dbpath C:\replicaSet\rs1
"C:\Program Files\MongoDB\Server\8.0\bin\mongod.exe" --replSet rs1 --port 27019 --dbpath C:\replicaSet\rs2

In a new terminal, initialize the replica set:
rs.initiate()

Use MongoDB Compass to confirm your collections are there.

**Run the App
Open app.js
then run in terminal:
node app.js

This starts the local server (default is http://localhost:3000)

**Test with Postman
Open Postman
Set up an environment using http://localhost:3000

Use raw JSON format for POST request bodies

Run requests to validate that all endpoints are working

API Endpoints (Sample)
use aimeeFinal
Base URL: http://localhost:3000


Vendors
Method	Endpoint	Description
GET	/vendors	Get all vendors
POST	/vendors	Add a new vendor
GET	/vendors/:id	Get vendor by ID
PUT	/vendors/:id	Update vendor by ID
DELETE	/vendors/:id	Delete vendor by ID

Products
Method	Endpoint	Description
GET	/products	Get all products *(Note: This is duplicated in code—see note)
POST	/products	Add a new product

Sales
Method	Endpoint	Description
GET	/sales		Get all sales
POST	/sales		Record a new sale

Rental Agreements
Method	Endpoint		Description
GET	/rental-agreements	Get all rental agreements
POST	/rental-agreements	Add a new rental agreement
