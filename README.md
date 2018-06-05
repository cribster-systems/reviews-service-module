# Project Name

> The reviews component of an existing lodging app, with the backend modified to hold 10 million primary records and optimized to handle up to 1910 requests per second in development and 449 requests per second in production

## Related Projects

  - https://github.com/starkillersystems/images-service
  - https://github.com/teamName/booking-service-module
  - https://github.com/teamName/similar-listings-module

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

>  - Some usage instructions
>  - Before cloning, make sure that you have MongoDB and Redis installed, and make sure they are up and running
>  - Clone the repo to your local machine
>  - CD into the directory and run npm install
>  - Go to db/config/ and run node generateJSON.js, which will create a JSON representation of mock data
>  - Use the new JSON file to populate the MongoDB database
>  - Make sure NODE_ENV is set to development
>  - Run npm run react-dev in one terminal and npm run server-dev in another
>  - See the app running in localhost:3000!

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

## Development

For this project, I scaled the database of an existing lodging app to hold 10 million records to roughly simulate a large user base (although by industry averages, this is still a small size).
My ultimate goal was to enable this app to handle at least four hundred requests per second (RPS) in production.

Stress Testing (Development)
Used 2 stress-testing tools: Artillery & Siege
Config for each tool:

Siege: 
```
siege()
 .on(3000)
 .for(100000).times
 .get('/reviews/15000?index=1')
 .attack();
```


Artillery:
```
config:
 target: "http://localhost:3000/reviews"
 phases:
   - duration: 20
     arrivalRate: 20
scenarios:
 - name: "Browsing"
   flow:
   - loop:
     - get:
         url: "/{{ $loopCount }}?index=1"
         count: 5
```

Peak RPS before any server optimization:
<p>Artillery: 1,264</p>
<p>Siege: 1,213</p>

Peak RPS after implementing Node cluster:
<p>Artillery: 1,910</p>
<p>Siege: 2,100</p>

Great! All looks well! I then created Docker images for my individual service, my MongoDB database, and my Redis server. I deployed to Amazon with an EC2 instance (T2 Micro). I then stress tested my service again.

Stress Testing (Production)
Tool used: Artillery 

Artillery: 
```
config:
 target: "http://ec2-54-82-237-60.compute-1.amazonaws.com/reviews"
 phases:
   - duration: 20
     arrivalRate: 20
scenarios:
 - name: "Browsing"
   flow:
   - loop:
     - get:
         url: "/{{ $loopCount }}?index=1"
         count: 5
```

Initial testing in production with one EC2 instance:
<p>Peak RPS: 115</p>
What happened? Why is production RPS so much slower than development RPS? 
This was most likely related to my use of a T2 Micro instance in EC2, which only has 1GB of RAM and a single core, rendering my node cluster implementation ineffective. T2 Micro instance is not very well suited for production (At least for a backend of this size)

So what else could I do? Turns out AWS has Elastic Load Balancers, to which I can register several EC2 instances. The load balancer would handle all incoming traffic and spread the requests amongst my registered EC2 instances.

After implementing AWS Elastic Load Balancer with 10 EC2 instances, with one instance of Redis server and one instance of MongoDB server:
<p>Peak RPS: 329</p>
<p>As I expected, I saw almost a three-fold improvement, but was still a little short of my goal. I realized that a possible bottleneck could be that although I have ten EC2 instances, they all read from one MongoDB instance so reads from the database could be slowing down traffic.</p>

<p>After implementing Elastic Load Balancer for MongoDB instances and creating 5 instances:</p>
<p>Peak RPS: 449</p>
Indeed, spinning up new instances did increase RPS. The improvement was lower than I expected, however, but did allow me to reach my goal of at least 400 RPS. One big downside of this implementation that I realized was that it only works for reads from the database. If I had to implement database writes, how would I make the new info available to all the instances? For the scope of this project, I did not concern myself with database writes, but if I had to, I would have to use mongodb replication, with one master database to write to and secondary databases to copy the new changes into. 

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```

