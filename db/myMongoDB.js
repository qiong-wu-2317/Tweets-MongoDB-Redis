import { MongoClient } from "mongodb";
// Replace the uri string with your connection string.
const uri = "mongodb://localhost:27017";


export async function getListings(query = {}) {
  const client = new MongoClient(uri);
  try {
    const database = client.db("ieeevisTweets");
    const collection = database.collection("tweet");
    // Query for a movie that has the title 'Back to the Future'

    return await collection.find(query).toArray();
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}