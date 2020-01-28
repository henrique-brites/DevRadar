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
        return response.json({ devs });
    }
}