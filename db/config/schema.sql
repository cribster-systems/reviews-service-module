CREATE TABLE public.review (
  locationId INTEGER,
  customerName VARCHAR(8000), 
  customerProfilePhotoUrl VARCHAR(8000),
  customerReview VARCHAR(8000),
  createdAt TIMESTAMP WITH TIME ZONE,
  ratingAccuracy INTEGER,
  ratingCommunication INTEGER,
  ratingCleanliness INTEGER,
  ratingCheckIn INTEGER,
  ratingLocation INTEGER,
  ratingValue INTEGER
)

INSERT INTO public.review 
SELECT (data->>'locationId')::int as locationId, 
(data->>'customerName') as customerName, 
(data->>'customerProfilePhotoUrl') as customerProfilePhotoUrl, 
(data->>'customerReview') as customerReview, 
(data->>'createdAt')::date as createdAt,  
(data->>'ratingAccuracy')::int as ratingAccuracy, 
(data->>'ratingCommunication')::int as ratingCommunication, 
(data->>'ratingCleanliness')::int as ratingCleanliness, 
(data->>'ratingCheckIn')::int as ratingCheckIn, 
(data->>'ratingLocation')::int as ratingLocation, 
(data->>'ratingValue')::int as ratingValue 
FROM import.reviews