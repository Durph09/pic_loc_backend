const {v4: uuidv4} = require('uuid');

const HttpError = require('../models/http-error');


const getPlaceById = (req, res, next) => {
    const placeId = req.params.pid //{pid: 'p1}
    const place = DUMMY_PLACES.find(p => {
        return p.id === placeId;
    })
    
    if (!place) {
   throw new HttpError('Could not find for the provide id.', 404);
}
    res.json({place}); // => { place: place}
};


const getPlaceByUserId = (req, res, next) => {
    const userId = req.params.uid //{}
    const place = DUMMY_PLACES.find(p=> {
        return p.creator === userId;
    })
    if (!place) {
       return next(
        new HttpError ('Could not find a place for the provided user id,', 404)
       );
    }

    res.json({place});

}

const createPlace = (req, res, next) => {
    const { title, description, coordinates, address, creator } = req.body;
    // const title = req.body.title;
    const createdPlace = {
      id: uuidv4(),
      title,
      description,
      location: coordinates,
      address,
      creator
    };
  
    DUMMY_PLACES.push(createdPlace); //unshift(createdPlace)
  
    res.status(201).json({place: createdPlace});
  };

  const updatePlaceByPlaceId = (req, res, next) => {
    const placeId = req.params.pid  // the next lines identifies why the info is found.  URL or body
    const { title, description} = req.body; // grabs info from body

    const updatePlaceByPlaceId = {...DUMMY_PLACES.find(p=> p.id === placeId)};
    const placeIndex = DUMMY_PLACES.findIndex(p => p.id === placeId);
    updatePlaceByPlaceId.title = title;
    updatePlaceByPlaceId.description= description;
    DUMMY_PLACES[placeIndex] = updatePlaceByPlaceId;

    res.status(200).json({place: updatePlaceByPlaceId});
  };


  const deletePlaceByPlaceId = (req, res, next) => {
    
    const placeId = req.params.pid //{pid: 'p1}
    DUMMY_PLACES= DUMMY_PLACES.filter(p=> p.id !== placeId)
    res.status(200).json({message: 'deleted place'})
  }


let DUMMY_PLACES =[
    {
        id: 'p1',
        title: 'Empire State Building',
        description: 'One of the most famous sky scrapers in the world!',
        location: {
            lat: 40.7484474,
            lng: -73.9871516
        },
        address: '20 W 34th St, New York, NY 10001',
        creator: 'u1'
    }
];

exports.getPlaceById = getPlaceById;
exports.getPlaceByUserId = getPlaceByUserId;
exports.createPlace = createPlace;
exports.updatePlaceByPlaceId = updatePlaceByPlaceId;
exports.deletePlaceByPlaceId= deletePlaceByPlaceId;