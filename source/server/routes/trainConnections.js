// routes/trainConnections.js

const express = require('express');
const router = express.Router();
const createClient =  require('hafas-client');
const oebbProfile =  require('hafas-client/p/oebb/index.js');
const client = createClient.createClient(oebbProfile.profile, 'sleepy');

/**
 * @swagger
 * /api/trainConnections:
 *   get:
 *     summary: Retrieve a list of train connections
 *     responses:
 *       200:
 *         description: A list of train connections
 */
router.get('/trainConnections', async (req, res) => {
    const connections = await client.journeys('1231208', '1192101', {
        results: 2,remarks: false
    });
    const resCons= {
        "earlierRef": connections.earlierRef,
        "laterRef": connections.laterRef,
        "journeys": []
    }
    for(let i = 0; i < connections.journeys.length; i++) {
        let con = connections.journeys[i];

        resCons.journeys.push({
            "plannedDeparture": con.legs[0].plannedDeparture,
            "departureDelay": con.legs[0].departureDelay,
            "plannedArrival": con.legs[con.legs.length - 1].plannedArrival,
            "arrivalDelay": con.legs[con.legs.length - 1].arrivalDelay,
            "refreshToken": con.refreshToken,
            "legs": []
        });
        for(let j = 0; j < con.legs.length -1; j++) {
            resCons.journeys[i].legs.push({
            "name": con.legs[j].origin.name
            });
        }
    }
    res.json(resCons);
});
/**
 * @swagger
 * /api/locations:
 *   get:
 *     parameters:
 *       - in: query
 *         name: location
 *         schema:
 *           type: string
 *         required: true
 *         description: The location to search for train stations
 *     summary: Retrieve a list of train stations
 *     description: Returns a list of train stations matching the given location
 *     responses:
 *       200:
 *         description: A list of train stations
 */
router.get('/locations', async (req, res) => {
    location = req.query.location;
    const locations = await client.locations(location, {results: 5});
    res.json(locations);
});
module.exports = router;