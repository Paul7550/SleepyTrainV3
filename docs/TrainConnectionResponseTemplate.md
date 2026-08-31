**api/trainConnections**

```json
"header":{
    "departureStation": string,
    "arrivalStation": string,
    "earlierRef": Datetime,
    "laterRef": Datetime
},
"body":{
    "earlierRef": string,
    "laterRef": string,
    "journeys": [
        {
            "plannedDeparture": DateTime,
            "departureDelay": int,
            "plannedDeparturePlatform": int,
            "plannedArrival": Datetime,
            "arrivalDelay": int,
            "refreshToken": string,
            "legs": [
                "name": string,
            ]
        }
    ]
}
```

**api/refreshJourney**


``` json
"header":{
    "refreshToken":string
}
"body": {
    "legs": [
        {
            "name": string,
            "direction": string,
            "originName": string,
            "originId": int,
            "destinationName": string,
            "destinationId": int,
            "plannedDeparture": DateTime,
            "departureDelay": int,
            "plannedDeparturePlatform": int,
            "plannedArrival": Datetime,
            "arrivalDelay": int,
            "plannedArrivalPlatform": int,
            "stops": [
                "plannedArrival": Datetime,
                "arrivalDelay": int,
                "name": string,
                "id":  int,
        	]
        }
    ]
}
```

**api/locations**

```json
"header": {
    "location": string
}
"body": {
    "locs": [
        {
            "name": string,
            "id": int,
            "location":{
                "latitude": float,
                "longitude": float
            }
        }
    ]
}
```

**api/savedConnection**

```json
"header":{
    "refreshTokens":[]
}
"body":{
    journeys:[
        {
            "refreshToken":	string,
        	"originName": string,
            "destinationName": string,
            "plannedDeparture": DateTime,
            "departureDelay": int,
            "plannedDeparturePlatform": int,
            "plannedArrival": Datetime,
            "arrivalDelay": int,
        }
    ]
}
```

**api/checkForDelay**

```json
"header":{
    "refreshtokens":[],
    "stopIds":[]
}
"body":{
    "delay": int,
    "station": string,
    "arrivalTime": string
}
