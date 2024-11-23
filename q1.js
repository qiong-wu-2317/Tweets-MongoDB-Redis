import { createClient } from "redis";
import { getListings } from "./db/myMongoDB.js";



const client = createClient();

client.on("error", (err) => {
  console.log("Error " + err);
});



const tweets = await getListings()


//query 1


async function run() {
  try {
    await client.connect();
    await client.set("tweetCount", "0");
    const promises = tweets.map(()=> {
      return client.incr("tweetCount")
    });
    await Promise.all(promises);
    const q1_count = await client.get("tweetCount")
    console.log("query1:")
    console.log(`There were ${q1_count} tweets`)
  } catch (error) {
    console.error(error);
  } finally {
    // Disconnect the client
    await client.disconnect();
  }
}
run()


