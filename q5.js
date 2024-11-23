import { getListings } from "./db/myMongoDB.js";


import {Redis} from 'ioredis';
const redis = new Redis();

const tweets = await getListings()

//query 5
async function run() {
  try {
    const promises = tweets.map(l => {
      let key = 'tweets:' + l.user.screen_name
      let content_key = 'tweets:' + l.id    
      return Promise.all([
        redis.lpush(key, l.id),
        redis.hmset(content_key, l)
      ]);
    });
    await Promise.all(promises);

    console.log("test by find ones tweets, try to get tmrhyne whose tweet most")
    let user = 'tmrhyne'
    let total = await redis.llen('tweets:'+user)
    console.log(`tmrhyne posted ${total} tweets`)
    let list = await redis.lrange('tweets:'+user, 0, 10)
    console.log(`tmrhyne first 10 tweets`)
    console.log(list)
    let first = await redis.lpop('tweets:'+user)
    console.log(`pop first tweet ${first}`)
    let tweet = await redis.hgetall('tweets:'+first)
    console.log(tweet)
    let second = await redis.lindex('tweets:'+user, 0)
    console.log(`now new first tweet is ${second}`)
    let tweet_id = await redis.hget('tweets:'+second, 'text')
    console.log(`now text of first tweets is ${tweet_id} `)
    
  } catch (error) {
    console.error(error);
  } finally {
    await redis.disconnect();
  }
}
run()


