const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');
const { findConnections, sendMessage } = require('../websocket');

module.exports = {
    async index(request, response) {
        try {
            const devs = await Dev.find();

            return response.json(devs); 
        } catch (err) {
            return response.status(400).send({error: 'Error loading devs'})
        }
    },

    async show(request, response) {

        try {
            const dev = await Dev.findOne({ _id: request.params.devId});
            if (dev) {
                return response.json(dev);
            }
        } catch (error) {
            return response.status(400).send({ error: 'Error loading dev' });
        }
        
        return response.status(400).send();

    },

    async store(request, response) {
        try {
            const { github_username, techs, latitude, longitude } = request.body;

            let dev = await Dev.findOne({ github_username });

            if (!dev) {
                const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
        
                const { name = login, avatar_url, bio } = apiResponse.data;
            
                const techsArray = parseStringAsArray(techs);
            
                const location = {
                    type: 'Point',
                    coordinates: [longitude, latitude],
                }                         
            
                dev = await Dev.create({
                    github_username,
                    name,
                    avatar_url,
                    bio,
                    techs: techsArray,
                    location,
                });

                // Filtrar as conexões que estão no máximo 10km de distância
                // e que o novo dev tenha pelo menos uma das tecnologias filtradas 
                const sendSocketMessageTo = findConnections(
                    { latitude, longitude },
                    techsArray,
                );

                sendMessage(sendSocketMessageTo, 'new-dev', dev);
;            };
            return response.json(dev);
        } catch (err) {
            return response.status(400).send({ error: 'Error creating new dev' });
        }
    },    

    async update(request, response) {
        //console.log(request.body);
        try {
            const { techs, latitude, longitude } = request.body; //github_username, 
             
             let dev = await Dev.findOne({ _id: request.params.devId});

            if (dev) {

                const apiResponse = await axios.get(`https://api.github.com/users/${dev.github_username}`);
        
                const { name = login, avatar_url, bio } = apiResponse.data;
            
                const techsArray = parseStringAsArray(techs);
            
                const location = {
                    type: 'Point',
                    coordinates: [longitude, latitude],
                }                         

                dev = await Dev.findByIdAndUpdate(request.params.devId, { //  findOneAndUpdate
                    name,
                    avatar_url,
                    bio,
                    techs: techsArray,
                    location,
                }, { new: true });

            };
            return response.json(dev);        
        } catch (err) {
            return response.status(400).send({ error: 'Error updating dev' });
        }        
      },

    async delete(request, response) {
        try {
            await Dev.findByIdAndDelete(request.params.devId); 
        
            return response.send('Dev Deletado!!');
            //return response.send();
        } catch (err) {
            return response.status(400).send({ error: 'Error deleting dev' });
        }
    },
};