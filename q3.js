import { createClient } from "redis";
import { getListings } from "./db/myMongoDB.js";



const client = createClient();

client.on("error", (err) => {
  console.log("Error " + err);
});



const tweets = await getListings()

//query 3

async function run() {
  try {
    await client.connect();
    await client.del("screen_names")
    const promises = tweets.map(l => {
      return client.sAdd("screen_names", l.user.screen_name)
    });
    await Promise.all(promises);
    const q3_couont = await client.sCard("screen_names")
    console.log("query3:")
    console.log(`There were ${q3_couont} distinct users`)
  } catch (error) {
    console.error(error);
  } finally {
    await client.disconnect();
  }
}
run()



