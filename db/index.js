const mongoose = require('mongoose');
// mongoose.connect(`mongodb://localhost/review`, {
//     useMongoClient: true,
// });
// const mLabConfig = require('./config/mLab.js');
mongoose.connect('mongodb://localhost/starkiller-reviews');



//create a review schema
let ReviewSchema = mongoose.Schema({
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
});

let Review = mongoose.model('Review', ReviewSchema);

//save reviews in db
let save = function(sampleReviews, callback) {
    let sampleReviewsObject = sampleReviews.map (function(review) {

        return new Review ({
            locationId : review.locationId,
            customerName : review.customerName, 
            customerProfilePhotoUrl : review.customerProfilePhotoUrl,
            customerReview : review.customerReview,
            createdAt : new Date(),
            ratingAccuracy: review.ratingAccuracy,
            ratingCommunication : review.ratingCommunication,
            ratingCleanliness : review.ratingCleanliness,
            ratingCheckIn : review.ratingCheckIn,
            ratingLocation : review.ratingLocation,
            ratingValue : review.ratingValue
        });
    });
    Review.create(sampleReviewsObject, function(err, results) {
        if (err) {
            console.log('error in db while adding into db-', err);
            callback(err, null)
            return;
        }
        console.log('saved into db successfully-',results);

        callback(null, results);
    })
}
// get reviews from db
let find = function(locationId, callback) {
    Review.find({'locationId': locationId}, function(err, results) {
        if (err) {
            callback(err, null);
            return;
        }
        // console.log('inside db find-', results);

        callback(null, results);
        return;
    })
}
module.exports.save = save;
module.exports.find = find;

// var sampleReviews = 
//     [{
//         locationId : 1,
//         customerName : 'customer1', 
//         customerProfilePhotoUrl : 'url1',
//         customerReview : 'text1',
//         ratingAccuracy : 1,
//         ratingCommunication : 1,
//         ratingCleanliness : 1,
//         ratingCheckIn : 1,
//         ratingLocation : 1,
//         ratingValue : 1
//     },
//     {
//         locationId : 2,
//         customerName : 'customer2', 
//         customerProfilePhotoUrl : 'url2',
//         customerReview : 'text2',
//         ratingAccuracy : 1,
//         ratingCommunication : 1,

//         ratingCleanliness : 1,
//         ratingCheckIn : 1,
//         ratingLocation : 1,
//         ratingValue : 1
//     },
//     {
//         locationId : 3,
//         customerName : 'customer3', 
//         customerProfilePhotoUrl : 'url3',
//         customerReview : 'text3',
//         ratingAccuracy : 1,
//         ratingCommunication : 1,
//         ratingCleanliness : 1,
//         ratingCheckIn : 1,
//         ratingLocation : 1,
//         ratingValue : 1
    // },
    // {
    //     locationId : 4,
    //     customerName : 'customer4', 
    //     customerProfilePhotoUrl : 'url4',
    //     customerReview : 'text4',
    //     ratingAccuracy : 1,
    //     ratingCommunication : 1,
    //     ratingCleanliness : 1,
    //     ratingCheckIn : 1,
    //     ratingLocation : 1,
    //     ratingValue : 1
    // },
//     {
//         locationId : 5,
//         customerName : 'customer5', 
//         customerProfilePhotoUrl : 'url5',
//         customerReview : 'text5',
//         ratingAccuracy : 1,
//         ratingCommunication : 1,
//         ratingCleanliness : 1,
//         ratingCheckIn : 1,
//         ratingLocation : 1,
//         ratingValue : 1
//     },
//     {
//         locationId : 6,
//         customerName : 'customer6', 
//         customerProfilePhotoUrl : 'url6',
//         customerReview : 'text6',
//         ratingAccuracy : 1,
//         ratingCommunication : 1,
//         ratingCleanliness : 1,
//         ratingCheckIn : 1,
//         ratingLocation : 1,
//         ratingValue : 1
//     },
//     {
//         locationId : 7,
//         customerName : 'customer7', 
//         customerProfilePhotoUrl : 'url7',
//         customerReview : 'text7',
//         ratingAccuracy : 1,
//         ratingCommunication : 1,
//         ratingCleanliness : 1,
//         ratingCheckIn : 1,
//         ratingLocation : 1,
//         ratingValue : 1
//     },
//     {
//         locationId : 8,
//         customerName : 'customer8', 
//         customerProfilePhotoUrl : 'url8',
//         customerReview : 'text8',
//         ratingAccuracy : 1,
//         ratingCommunication : 1,
//         ratingCleanliness : 1,
//         ratingCheckIn : 1,
//         ratingLocation : 1,
//         ratingValue : 1
//     },
//     {
//         locationId : 9,
//         customerName : 'customer9', 
//         customerProfilePhotoUrl : 'url9',
//         customerReview : 'text9',
//         ratingAccuracy : 1,
//         ratingCommunication : 1,
//         ratingCleanliness : 1,
//         ratingCheckIn : 1,
//         ratingLocation : 1,
//         ratingValue : 1
//     },
//     {
//         locationId : 10,
//         customerName : 'customer10', 
//         customerProfilePhotoUrl : 'url10',
//         customerReview : 'text10',
//         ratingAccuracy : 1,
//         ratingCommunication : 1,
//         ratingCleanliness : 1,
//         ratingCheckIn : 1,
//         ratingLocation : 1,
//         ratingValue : 1
//     },
//     {
//         locationId : 11,
//         customerName : 'customer11', 
//         customerProfilePhotoUrl : 'url11',
//         customerReview : 'text11',
//         ratingAccuracy : 1,
//         ratingCommunication : 1,
//         ratingCleanliness : 1,
//         ratingCheckIn : 1,
//         ratingLocation : 1,
//         ratingValue : 1
//     },
//     {
//         locationId : 12,
//         customerName : 'customer12', 
//         customerProfilePhotoUrl : 'url12',
//         customerReview : 'text12',
//         ratingAccuracy : 1,
//         ratingCommunication : 1,
//         ratingCleanliness : 1,
//         ratingCheckIn : 1,
//         ratingLocation : 1,
//         ratingValue : 1
//     },
//     {
//         locationId : 13,
//         customerName : 'customer13', 
//         customerProfilePhotoUrl : 'url13',
//         customerReview : 'text13',
//         ratingAccuracy : 1,
//         ratingCommunication : 1,
//         ratingCleanliness : 1,
//         ratingCheckIn : 1,
//         ratingLocation : 1,
//         ratingValue : 1
//     },
//     {
//         locationId : 14,
//         customerName : 'customer14', 
//         customerProfilePhotoUrl : 'url14',
//         customerReview : 'text14',
//         ratingAccuracy : 1,
//         ratingCommunication : 1,
//         ratingCleanliness : 1,
//         ratingCheckIn : 1,
//         ratingLocation : 1,
//         ratingValue : 1
//     },
//     {
//         locationId : 15,
//         customerName : 'customer15', 
//         customerProfilePhotoUrl : 'url15',
//         customerReview : 'text15',
//         ratingAccuracy : 1,
//         ratingCommunication : 1,
//         ratingCleanliness : 1,
//         ratingCheckIn : 1,
//         ratingLocation : 1,
//         ratingValue : 1
//     }
//     ];
// save(sampleReviews, function(err, results) {
//     if (err) {
//         console.log('error ocured in saving to db-', err);
//     }
//     console.log('results saving to db-', results);
// });

// // // //create fake data using faker.js
// // // const sampleReviewsFromFaker = {
// // //     locationId : 3,
// // //     customerName : 'customer3', 
// // //     customerProfilePhotoUrl : 'url3',
// // //     customerReview : 'text3',
// // //     createdAt : new Date(),
// // //     ratingCleanliness : 1,
// // //     ratingCheckIn : 1,
// // //     ratingLocation : 1,
// // //     ratingValue : 1
// // // }

// [{
//     "locationId" : 20,
//     "customerName" : "customer16", 
//     "customerProfilePhotoUrl" : "/pics/default.jpg",
//     "customerReview" : "text15",
//     "ratingAccuracy" : 1,
//     "ratingCommunication" : 1,
//     "ratingCleanliness" : 1,
//     "ratingCheckIn" : 1,
//     "ratingLocation" : 1,
//     "ratingValue" : 1
// }]

