// routes/trainConnections.js

const express = require('express');
const router = express.Router();
const createClient =  require('hafas-client');
const oebbProfile =  require('hafas-client/p/oebb/index.js');
const {route} = require("express/lib/application");
const client = createClient.createClient(oebbProfile.profile, 'sleepy');

/**
 * @swagger
 * /api/trainConnections:
 *   get:
 *     parameters:
 *       - in: query
 *         name: departureStation
 *         schema:
 *           type: string
 *         required: true
 *       - in: query
 *         name: arrivalStation
 *         schema:
 *           type: string
 *         required: true
 *       - in: query
 *         name: earlierRef
 *         schema:
 *           type: string
 *         required: false
 *       - in: query
 *         name: laterRef
 *         schema:
 *           type: string
 *         required: false
 *       - in: query
 *         name: departure
 *         schema:
 *           type: DateTime
 *         required: false
 *     summary: Retrieve a list of train connections
 *     responses:
 *       200:
 *         description: A list of train connections
 */
router.get('/trainConnections', async (req, res) => {
    const departureStation = req.query.departureStation;
    const arrivalStation = req.query.arrivalStation;
    const earlierRef = req.query.earlierRef;
    const laterRef = req.query.laterRef;
    const departure = new Date(req.query.departure).setHours(new Date(req.query.departure).getHours()-2);

    if(earlierRef != null && laterRef != null) {
        res.status(400).send("earlierRef and laterRef cannot be used together");
    }
    let connections;
    if(earlierRef != null){
        connections = await client.journeys(departureStation, arrivalStation, {
            results: 3,remarks: false,earlierThan:earlierRef
        });
    }else if(laterRef != null){
        connections = await client.journeys(departureStation, arrivalStation, {
            results: 3,remarks: false,laterThan:laterRef
        });
    }else if(departure != null){
        connections = await client.journeys(departureStation, arrivalStation, {
            results: 3,remarks: false,departure:departure
        });
    }else {
        connections = await client.journeys(departureStation, arrivalStation, {
            results: 3,remarks: false
        });
    }

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
            "plannedDeparturePlatform": con.legs[0].departurePlatform,
            "plannedArrival": con.legs[con.legs.length - 1].plannedArrival,
            "arrivalDelay": con.legs[con.legs.length - 1].arrivalDelay,
            "refreshToken": con.refreshToken,
            "legs": []
        });
        for(let j = 0; j < con.legs.length; j++) {
            let name = con.legs[j].line?.name ?? "Walk"
            if(name === "Walk"){
                continue;
            }
            if(name.endsWith(")")){
                name = name.substring(0,name.indexOf("("));
            }
            resCons.journeys[i].legs.push({
            "name": name
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
    const locations = await client.locations(location, { results: 600, subStops:false, entrance:false, addresses: false, poi: false});
    const resLocs= {
        "locs":[],
        "length":locations.length
    };
    for(let locs = 0; locs < locations.length; locs++) {
        resLocs.locs.push({
            "name": locations[locs].name,
            "id": locations[locs].id,
            "location": {
                "latitude": locations[locs].location.latitude,
                "longitude": locations[locs].location.longitude
            }
        });
    }
    res.json(resLocs);
});
/**
 * @swagger
 * /api/refreshJourney:
 *   get:
 *     parameters:
 *       - in: query
 *         name: refreshToken
 *         schema:
 *           type: array
 *         required: true
 *         description: The refresh token for the journey
 *     summary: Returns a TrainConnection
 *     description: Returns a connection
 *     responses:
 *       200:
 *         description: A connection
 */
router.get('/refreshJourney', async (req, res) => {
    const connection = await  client.refreshJourney(req.query.refreshToken,{stopovers: true});
    const resCon = {
        "legs":[]
    }
    for(let i = 0;i<connection.journey.legs.length;i++){
        let leg = connection.journey.legs[i]
        let lineName = leg.line?.name ?? "Walk";
        if(lineName.endsWith(")")){
            lineName = lineName.substring(0,lineName.indexOf("("));
        }
        resCon.legs.push({
            "name": lineName,
            "direction": leg.direction,
            "originName": leg.origin.name,
            "destinationName": leg.destination.name,
            "plannedDeparture": leg.plannedDeparture,
            "departureDelay": leg.departureDelay,
            "plannedDeparturePlatform": leg.departurePlatform,
            "plannedArrival" : leg.plannedArrival,
            "arrivalDelay" : leg.arrivalDelay,
            "plannedArrivalPlatform": leg.arrivalPlatform,
            "stops":[],
        });
        for(let j= 1;j<(leg.stopovers??[]).length-1;j++) {
            resCon.legs[i].stops.push({
                "plannedArrival": leg.stopovers[j].plannedArrival,
                "arrivalDelay": leg.stopovers[j].arrivalDelay,
                "name": leg.stopovers[j].stop.name
            });
        }
    }
    res.send(resCon);
});
/**
 * @swagger
 * /api/savedConnection:
 *   get:
 *     parameters:
 *       - in: query
 *         name: refreshTokens
 *         schema:
 *           type: string
 *         required: true
 *         description: The refresh tokens for the journeys
 *     summary: Returns TrainConnections
 *     description: Returns connections
 *     responses:
 *       200:
 *         description: A connection
 */
router.get('/savedConnection',async (req,res)=>{
    const tokens = req.query.refreshTokens;
    const resCons={"journeys":[]}
    for(let i = 0;i<tokens.length;i++){
        const connections = await client.refreshJourney(tokens[i],{subStops:false,remarks:false,entrances:false});
        let con = connections.journey;
        let origin = con.legs[0].origin.name;
        let destination = con.legs[con.legs.length-1].destination.name;
        if(con.legs[0].origin.name.endsWith(")")){
            origin = con.legs[0].origin.name.substring(0, con.legs[0].origin.name.indexOf("("));
        }
        if(con.legs[con.legs.length-1].destination.name.endsWith(")")){
            destination = con.legs[con.legs.length-1].destination.name.substring(0,con.legs[con.legs.length-1].destination.name.indexOf("("));
        }
            resCons.journeys.push({
                "plannedDeparture": con.legs[0].plannedDeparture,
                "departureDelay": con.legs[0].departureDelay,
                "plannedDeparturePlatform": con.legs[0].departurePlatform,
                "plannedArrival": con.legs[con.legs.length - 1].plannedArrival,
                "arrivalDelay": con.legs[con.legs.length - 1].arrivalDelay,
                "refreshToken": con.refreshToken,
                "originName":origin,
                "destinationName":destination
            });
    }
    res.send(resCons)
});

module.exports = router;
