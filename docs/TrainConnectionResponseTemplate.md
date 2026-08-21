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
            "destinationName": string,
            "plannedDeparture": DateTime,
            "departureDelay": int,
            "plannedDeparturePlatform": int,
            "plannedArrival": Datetime,
            "arrivalDelay": int,
            "plannedArrivalPlatform": int,
            "stops": [
                "plannedArrival": Datetime,
                "arrivalDelay": int,
                "name": string
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

**api/getStopOvers**

```json
"header": {
    "refreshToken": string
}
"body": {
    "legs":	[
        "stops": [
            "plannedArrival": Datetime,
            "arrivalDelay": int,
            "name": string
        ]
    ]
}
```

