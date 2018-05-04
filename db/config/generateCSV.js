// const AWS = require('aws-sdk');
const mongoose = require('mongoose');
const https = require('https');
const axios = require('axios');
const fetch = require('node-fetch');
const fs = require('fs');
const _ = require('lodash');

// const awsConfig = require('./aws.js');
// const mLabConfig = require('./mLab.js');

mongoose.connect('mongodb://localhost/starkiller-reviews');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  // we're connected!
  console.log('we are connected!');
});

let reviewSchema = {
  //reviewId : {type: Number, unique: true},
  locationId : Number,
  customerName : String, 
  customerProfilePhotoUrl : String,
  customerReview : String,
  createdAt : Date,
  ratingAccuracy: Number,
  ratingCommunication: Number,
  ratingCleanliness : Number,
  ratingCheckIn : Number,
  ratingLocation : Number,
  ratingValue : Number
}

let ReviewSchema = mongoose.Schema(reviewSchema);

let Review = mongoose.model('Review', ReviewSchema);

var customerReview = ['Great place to stay, made check in and out very easy and promptly responded to any questions we had. Lots of great restaurants in the area and it’s within walking distance of all the main sites and it’s five blocks from the train station. We would definitely recommend staying here.',
'Great place to stay and nice furniture', 'Exactly what we needed! Great value for a quaint little flat.', 'What a wonderful place and host. Nirs apartment is so cute and perfect. Can\'t wait to stay here again next time we are in milan.', 
'As many other reviews can attest, Nir is an exceptional host and his apartment was ideal for our brief stay in Milan. The apartment was a quick walk from the Milano Centrale station, and checking in was a breeze as Nir met us outside. We were given a thorough overview of Nir\'s immaculate home and a list of sights, dining options, and some transit help. The apartment was clean, quiet, and well-stocked with everything we needed, including some thoughtful touches like power adapters and bottled water. Highly recommend this listing!',
'Perfect little spot for our one night in Milan at the end of our honeymoon. It was in a great location... 10 min walk to train/bus station and within walking distance to the Duomo. Nir was a wonderful host! We ended up missing our train stop and our arrival time was later than I had anticipated, but Nir was still there smiling and waiting for us. He also gave us a map with many recommendations and told us about a restaurant near by called Da Oscar that was probably our favorite meal we had the whole time we were in Italy. Bed was comfy! Space was clean! Highly recommend!',
'Amazing place with a perfect location! Highly recommend!',
'The cancellation policy is very clear, if you try to cancel the entire stay two weeks in advance without a justified reason of course I do not accept it.   The gas pipes were replaced by new ones in the whole neighborhood and it is something that was not in my hands to solved, although there were only 3 days, and the group that you sent was compensated with dinner and biberes from the fridge. the guests were happy and understood. It does not seem right to me to complain when you were not at my house.   Everyone at home in Cuba and I, work hard to make the guests feel as best as possible in the stay at home and this is the first bad evaluation in more than 100 and I do not accept it.',
'This house is amazing. This is my 7th trip to Cuba and this is the nicest place I’ve stayed in by far. It’s very expensive, but divided between a group of 7, for a 4 day/3 night stay made it affordable. They arranged all cars, reservations, in-house massage treatments, meals, replenished fridge, etc. Four staff onsite! (Suzette, Jenny, Monica and Gabriel were amazing) 24 security and service... it’s as luxurious living as it gets in Cuba. The billiard room and white room and verandas and common spaces were all gorgeous. Rooms were immaculate. Highly recommend.'
];

var customerInfo = [
    {name: 'Carly',photoUrl: `https://s3.us-east-2.amazonaws.com/fantasybnb-profile-pics/customer1.jpg`},
    {name: 'Mike',photoUrl: `https://s3.us-east-2.amazonaws.com/fantasybnb-profile-pics/customer2.jpg` },
    {name: 'Crystal',photoUrl: `https://s3.us-east-2.amazonaws.com/fantasybnb-profile-pics/customer3.jpg`},
    {name: 'Lorella',photoUrl: `https://s3.us-east-2.amazonaws.com/fantasybnb-profile-pics/customer4.jpg`},
    {name: 'Joseph',photoUrl: `https://s3.us-east-2.amazonaws.com/fantasybnb-profile-pics/default.jpg`},
    {name: 'Rose',photoUrl: `https://s3.us-east-2.amazonaws.com/fantasybnb-profile-pics/customer6.jpg`},
    {name: 'Alex',photoUrl: `https://s3.us-east-2.amazonaws.com/fantasybnb-profile-pics/customer7.jpg`},
    {name: 'Joseph',photoUrl: `https://s3.us-east-2.amazonaws.com/fantasybnb-profile-pics/customer8.jpg`},
    {name: 'Julia', photoUrl: `https://s3.us-east-2.amazonaws.com/fantasybnb-profile-pics/customer9.jpg`},
    {name: 'Jim', photoUrl: `https://s3.us-east-2.amazonaws.com/fantasybnb-profile-pics/customer10.jpg`},
    {name: 'Eric', photoUrl: `https://s3.us-east-2.amazonaws.com/fantasybnb-profile-pics/customer11.jpg`},
    {name: 'Charles', photoUrl: `https://s3.us-east-2.amazonaws.com/fantasybnb-profile-pics/customer12.jpg`},
    {name: 'Jeff', photoUrl: `https://s3.us-east-2.amazonaws.com/fantasybnb-profile-pics/customer13.jpg`},
    {name: 'Joey', photoUrl: `https://s3.us-east-2.amazonaws.com/fantasybnb-profile-pics/customer14.jpg`},
    {name: 'Nick', photoUrl: `https://s3.us-east-2.amazonaws.com/fantasybnb-profile-pics/customer15.jpg`},
    {name: 'Vick', photoUrl: `https://s3.us-east-2.amazonaws.com/fantasybnb-profile-pics/customer16.jpg`},
    {name: 'Brian', photoUrl: `https://s3.us-east-2.amazonaws.com/fantasybnb-profile-pics/default.jpg`},
    {name: 'Ryan',photoUrl: `https://s3.us-east-2.amazonaws.com/fantasybnb-profile-pics/default.jpg`},
    {name: 'Liz',photoUrl: `https://s3.us-east-2.amazonaws.com/fantasybnb-profile-pics/default.jpg`},
    {name: 'Allie', photoUrl: `https://s3.us-east-2.amazonaws.com/fantasybnb-profile-pics/default.jpg`}, 
    {name: 'John', photoUrl: `https://s3.amazonaws.com/fantasybnb-profile-pics/default.jpg`},
    {name: 'Vanessa',photoUrl: `https://s3.amazonaws.com/fantasybnb-profile-pics/default.jpg`},
];

var generateReviewsNumber = function() {
    return Math.floor(5 + Math.random() * 6);
}

// var shuffleCustomerName = function(customer) {
//     for (var i = customer.length-1; i > 0; i--) {
//         var j = Math.floor(Math.random() * (i+1));
//         var temp = customer[i];
//         customer[i] = customer[j];
//         customer[j] = temp;
//     }
//     return customer;
// }

var randomUser = function() {
  return customerInfo[Math.floor(Math.random() * customerInfo.length)];
}

var generateRandomReviews = function() {
  return customerReview[Math.floor(Math.random() * customerReview.length)]; 
}

var generateRandomRating = function() {
    return Math.floor(Math.random() * 6);
}

var generateRandomDate = function() {
  var start = new Date(2018, 1, 1);
  var end = new Date(2018, 3, 31);
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString();
}

var generateRandomId = function() {
  return Math.floor(Math.random() * 10000001);
}


var appendFile = function(filename, string) {
  return new Promise(function(resolve, reject) {
    fs.appendFile(filename, string, function(err) {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    })
  })
}

var generateLine = function(review) {
  var line = '';
  for (var key in review) {
    line += review[key].toString() + '|';
  }
  return line.slice(0, -1) + '\n';
}

var filename = 'reviews.csv';

var populate = async function() {
  var fields = Object.keys(reviewSchema).join('|') + '\n';
  await appendFile(filename, fields)
    .then(() => {console.log('Wrote fields');});  
  var locationId = 0;
  for (var i = 0; i < 1000; i++) {
    let batch = "";
    for (var j = 0; j < 20000; j++) {
      if (j % 2 === 0) {
        locationId++;
      }
      let totalReviews = generateReviewsNumber();
      let user = randomUser();
      let rating = generateRandomRating();
      let review = {
        locationId : locationId,
        customerName : user.name, 
        customerProfilePhotoUrl : user.photoUrl,
        customerReview : generateRandomReviews(),
        createdAt : generateRandomDate(),
        ratingAccuracy: rating,
        ratingCommunication: rating,
        ratingCleanliness : rating,
        ratingCheckIn : rating,
        ratingLocation : rating,
        ratingValue : rating
      } 
      let reviewLine = generateLine(review);
      batch += reviewLine;
    }
    await appendFile(filename, batch)
      .then(() => {console.log('Wrote batch ' + i);});
    // await Review.insertMany(batch, (err) => {
    //   if (err) {
    //     console.log(err);
    //   } else {
    //     console.log('Uploaded batch ' + i);
    //   }
    // });
  }
};

populate();