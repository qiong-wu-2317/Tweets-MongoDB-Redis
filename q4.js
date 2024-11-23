import { createClient } from "redis";
import { getListings } from "./db/myMongoDB.js";



const client = createClient();

client.on("error", (err) => {
  console.log("Error " + err);
});



const tweets = await getListings()

//query 4
async function run() {
  try {
    await client.connect();
    await client.del("leaderboard")
    const promises = tweets.map(l => {
      return client.zIncrBy("leaderboard", 1, l.user.screen_name);
    });
    await Promise.all(promises);
    console.log("query4:")

    const list = await client.zRangeWithScores('leaderboard', '+inf', '-inf', {
      BY: 'SCORE',
      REV: true,
      LIMIT: {
        offset: 0,
        count: 10,
      },
      WITHSCORE: true
    });
    list.forEach((item, index) => {      
      console.log(`${index + 1}. ${item.value} ${item.score} tweets`);
    });
  } catch (error) {
    console.error(error);
  } finally {
    await client.disconnect();
  }
}
run()


