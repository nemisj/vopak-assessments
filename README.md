# Task [![Build Status](https://travis-ci.org/nemisj/vopak-assessments.svg?branch=master)](https://travis-ci.org/nemisj/vopak-assessments)

Create a RESTful API (built with node.js with MongoDB Atlas as DB).
Please provide with the following URLs, PrintScreen and source code:

## URLs

- /currenttempincovilha
  You will need to provide the current temperature in Covilha, Portugal and the respective timestamp of the reading (not from the browser, but from the server).

- /avgtempinsfax
  Temperature Average in Sfax, Tunisia in June

## PrintScreen

MongoDB Collection and respective documents.

## SourceCode:

You are the one if you are able to do it using AWS Services like AWS Lambda + API Gateway + Cloud Formation and with a testing pipeline.
Gitlab or Github repo with the Nodejs code and cloud formation code (if you use AWS Services)

# Implementation

The core of the application is built using Express.js and Mongoose.js as ODM.
MongoDb collections can be found inside `src/models` folder.
An entry point to the application is in `src/server.js`. It can be run locally using `yarn dev`

To deploy and run this application as AWS lambdas, Serverless Framework is used.
Functions and API endpoints are specified inside `serverless.yml`. The entry point is `handler.js`

MongoDB documents are imported from `fixtures` into AtlasDB cluster.

CI/CD is implemented inside TravisCI. First tests are run, and then this app is deployed using a serverless command-line tool ( also through TravisCI ).

# My Notes

## Export DB

```
mongoexport --db test --collection locations --out /data/db/locations.json
mongoexport --db test --collection current_temperatures --out /data/db/current_temperatures.json
mongoexport --db test --collection historical_temperature_days --out /data/db/historical_temperature_days.json
```

## Import DB

```
mongoimport --uri=${MONGO_URL} -c locations --file /data/db/locations.json
mongoimport --uri=${MONGO_URL} -c current_temperatures --file /data/db/current_temperatures.json
mongoimport --uri=\${MONGO_URL} -c historical_temperature_days --file /data/db/historical_temperature_days.json
```
