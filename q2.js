import { createClient } from "redis";
import { getListings } from "./db/myMongoDB.js";



const client = createClient();

client.on("error", (err) => {
  console.log("Error " + err);
});



const tweets = await getListings()



//query 2

async function run() {
  try {
    await client.connect();
    await client.set("favoritesSum", "0");
    const promises = tweets.map(l => {
      return client.incrBy("favoritesSum", l['favorite_count'])
    });
    await Promise.all(promises);
    const q2_couont = await client.get("favoritesSum")
    console.log("query2:")
    console.log(`There were ${q2_couont} favorites`)
  } catch (error) {
    console.error(error);
  } finally {
    await client.disconnect();
  }
}
run()


