# Tweets-MongoDB-Redis
Assignment 6

## install db
Run MongoDB thru docker
```
docker run --user=mongodb -p 27017:27017 --restart=no --runtime=runc -d mongodb/mongodb-community-server:latest
```
Download tweets database from https://johnguerra.co/viz/influentials/ieeevis2020/ieeevis2020Tweets.dump.bz2 <br />

decompress by running:
```
lbzip2 -d ieeevis2020Tweets.dump.bz2  
```
make sure that you have a ieeevis2020Tweets.dump file. <br />

import data into MongoDB
```
mongoimport -h localhost:27017 -d ieeevisTweets -c tweet --file ieeevis2020Tweets.dump
```

## initial node.js
in the root folder of the project
```
node install
```

## install Redix
docker run -d --name redis-stack -p 6379:6379 -p 8001:8001 redis/redis-stack:latest

## Query

* Query1: How many tweets are there? Create a tweetCount key that contains the total number of tweets in the database. For this, initialize tweetCount in 0 (SET), then query the tweets collection in Mongo and increase (INCR) tweetCount. Once the query is done, get the last value of tweetCount (GET) and print it in the console with a message that says "There were ### tweets", with ### being the actual number

```
node Query1.js
```

* Query 2: Compute and print the total number of favorites in the dataset. For this apply the same process as before, query all the tweets, start a favoritesSum key (SET), increment it by the number of favorites on each tweet (INCRBY), and then get the value (GET) and print it on the screen.

```
node Query2.js
```

* Query 3: Compute how many distinct users are there in the dataset. For this use a set by the screen_name, e.g. screen_names

```
node Query3.js
```

* Query 4: Create a leaderboard with the top 10 users with more tweets. Use a sorted set called leaderboard

```
node Query4.js
```

* Query 5: Create a structure that lets you get all the tweets for an specific user. Use lists for each screen_name e.g. a list with key tweets:duto_guerra that points to a list of all the tweet ids for duto_guerra, e.g. [123, 143, 173, 213]. and then a hash that links from tweetid to the tweet information e.g. tweet:123 which points to all the tweet attributes (i.e. user_name, text, created_at, etc)

```
node Query5.js
```



