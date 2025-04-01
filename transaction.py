from pymongo import MongoClient
from bson import ObjectId

# Connect to your MongoDB replica set
client = MongoClient("mongodb://localhost:27017/?replicaSet=rs1")
db = client["shopDB"]
orders_collection = db["orders"]
customers_collection = db["customers"]
inventory_collection = db["inventory"]

def run_transaction():
    with client.start_session() as session:
        try:
            with session.start_transaction():
                print("Transaction started...")

                # Sample order data
                new_order = {
                    "_id": ObjectId(),
                    "customer_id": ObjectId("656f8f8e3fa44d8f52e92c9d"), 
                    "product": "Laptop",
                    "price": 350,
                    "quantity": 1,
                    "status": "Pending"
                }

                insert_result = orders_collection.insert_one(new_order, session=session)
                print("Inserted order with ID:", insert_result.inserted_id)

                update_result = customers_collection.update_one(
                    {"_id": new_order["customer_id"]},
                    {
                        "$push": {
                            "orders": {
                                "order_id": new_order["_id"],
                                "total": new_order["price"] * new_order["quantity"]
                            }
                        }
                    },
                    session=session
                )
                print("Customer update result:", update_result.modified_count)

                product = new_order["product"]
                quantity_ordered = new_order["quantity"]

            
                inventory_update_result = inventory_collection.update_one(
                    {"product_name": product},  
                    {"$inc": {"stock": -quantity_ordered}},  
                    session=session
                )
                print(f"Inventory update result for product '{product}':", inventory_update_result.modified_count)

                session.commit_transaction()
                print("Transaction committed successfully!")

        except Exception as e:
            print("Transaction aborted due to error:", e)
            session.abort_transaction()

run_transaction()
