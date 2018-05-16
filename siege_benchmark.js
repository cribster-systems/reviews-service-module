const siege = require('siege');

siege()
  .on('3000')
  .for(100000).times
  .get('/reviews/15000?index=1')
  .attack();