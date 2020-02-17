const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
    async index( request, response) {
        const { latitude, longitude, techs} = request.query;

        const techsArray = parseStringAsArray(techs);

        const devs = await Dev.find({
           techs: {
                $in: techsArray,
           },
           location: {
               $near: {
                   $geometry: {
                       type: 'Point',
                       coordinates: [longitude, latitude],
                   },
                   $maxDistance: 10000,
               },
           },
        });
        // Busca todos os devs bum raio 10 km
        // Filtrar por tecnologias
        //console.log(devs);
        if (devs.length > 0) {
            return response.json({ devs });
            //return response.json(null);
        }
        //return response.json({ devs });
        return response.json(null);
        
    },
};