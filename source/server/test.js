const test = {
    "earlierRef": "3|OB|MT#14#97056#97056#97091#97091#0#0#165#97017#1#0#5018#0#0#-2147483648#1#2|PDH#945de0d1424f4e92ceff0a95822c1ef5|RD#6082026|RT#85705|US#1|RS#INIT",
    "laterRef": "3|OF|MT#14#97069#97069#97167#97167#0#0#485#97057#2#0#410#0#0#-2147483648#1#2|PDH#945de0d1424f4e92ceff0a95822c1ef5|RD#6082026|RT#85705|US#1|RS#INIT",
    "journeys": [
        {
            "type": "journey",
            "legs": [
                {
                    "origin": {
                        "type": "stop",
                        "id": "8100990",
                        "name": "Hausleiten b.Stockerau Bahnhof",
                        "location": {
                            "type": "location",
                            "id": "8100990",
                            "latitude": 48.391297,
                            "longitude": 16.107321
                        },
                        "products": {
                            "nationalExpress": false,
                            "national": false,
                            "interregional": false,
                            "regional": true,
                            "suburban": true,
                            "bus": false,
                            "ferry": false,
                            "subway": false,
                            "tram": false,
                            "onCall": false
                        }
                    },
                    "destination": {
                        "type": "stop",
                        "id": "8100236",
                        "name": "Wien Floridsdorf Bahnhof",
                        "location": {
                            "type": "location",
                            "id": "8100236",
                            "latitude": 48.256387,
                            "longitude": 16.400046
                        },
                        "products": {
                            "nationalExpress": false,
                            "national": false,
                            "interregional": false,
                            "regional": true,
                            "suburban": true,
                            "bus": false,
                            "ferry": false,
                            "subway": false,
                            "tram": false,
                            "onCall": false
                        }
                    },
                    "departure": "2026-08-06T09:36:00+02:00",
                    "plannedDeparture": "2026-08-06T09:36:00+02:00",
                    "departureDelay": 0,
                    "arrival": "2026-08-06T10:11:00+02:00",
                    "plannedArrival": "2026-08-06T10:11:00+02:00",
                    "arrivalDelay": 0,
                    "reachable": true,
                    "tripId": "2|#VN#1#ST#1785750053#PI#0#ZI#355489#TA#0#DA#60826#1S#8100202#1T#928#LS#8100236#LT#1011#PU#81#RT#1#CA#s#ZE#4#ZB#S 4     #PC#5#FR#8100202#FT#928#TO#8100236#TT#1011#",
                    "line": {
                        "type": "line",
                        "id": "at-obb-vor-s4",
                        "fahrtNr": "28409",
                        "name": "S 4 (Zug-Nr. 28409)",
                        "public": true,
                        "adminCode": "81____",
                        "productName": "S",
                        "mode": "train",
                        "product": "suburban",
                        "operator": {
                            "type": "operator",
                            "id": "nahreisezug",
                            "name": "Nahreisezug"
                        }
                    },
                    "direction": "Wien Floridsdorf",
                    "arrivalPlatform": "1",
                    "plannedArrivalPlatform": "1",
                    "arrivalPrognosisType": "prognosed",
                    "departurePlatform": "2",
                    "plannedDeparturePlatform": "2",
                    "departurePrognosisType": "prognosed",
                    "cycle": {
                        "min": 7200,
                        "max": 7200,
                        "nr": 2
                    },
                    "alternatives": [
                        {
                            "tripId": "2|#VN#1#ST#1785750053#PI#0#ZI#355572#TA#0#DA#60826#1S#8100202#1T#1128#LS#8100236#LT#1211#PU#81#RT#1#CA#s#ZE#4#ZB#S 4     #PC#5#FR#8100202#FT#1128#TO#8100236#TT#1211#",
                            "line": {
                                "type": "line",
                                "id": "at-obb-vor-s4",
                                "fahrtNr": "28489",
                                "name": "S 4 (Zug-Nr. 28489)",
                                "public": true,
                                "adminCode": "81____",
                                "productName": "S",
                                "mode": "train",
                                "product": "suburban",
                                "operator": {
                                    "type": "operator",
                                    "id": "nahreisezug",
                                    "name": "Nahreisezug"
                                }
                            },
                            "direction": "Wien Floridsdorf",
                            "when": "2026-08-06T11:36:00+02:00",
                            "plannedWhen": "2026-08-06T11:36:00+02:00",
                            "delay": null
                        },
                        {
                            "tripId": "2|#VN#1#ST#1785750053#PI#0#ZI#355633#TA#0#DA#60826#1S#8100202#1T#1328#LS#8100236#LT#1411#PU#81#RT#1#CA#s#ZE#4#ZB#S 4     #PC#5#FR#8100202#FT#1328#TO#8100236#TT#1411#",
                            "line": {
                                "type": "line",
                                "id": "at-obb-vor-s4",
                                "fahrtNr": "28569",
                                "name": "S 4 (Zug-Nr. 28569)",
                                "public": true,
                                "adminCode": "81____",
                                "productName": "S",
                                "mode": "train",
                                "product": "suburban",
                                "operator": {
                                    "type": "operator",
                                    "id": "nahreisezug",
                                    "name": "Nahreisezug"
                                }
                            },
                            "direction": "Wien Floridsdorf",
                            "when": "2026-08-06T13:36:00+02:00",
                            "plannedWhen": "2026-08-06T13:36:00+02:00",
                            "delay": null
                        }
                    ]
                }
            ],
            "refreshToken": "¶HKI¶T$A=1@O=Hausleiten b.Stockerau Bahnhof@L=8100990@a=128@$A=1@O=Wien Floridsdorf Bahnhof@L=8100236@a=128@$202608060936$202608061011$S 4     $$1$$$$$$¶KRCC¶#VE#1#MRTF#",
            "cycle": {
                "min": 7200
            }
        },
        {
            "type": "journey",
            "legs": [
                {
                    "origin": {
                        "type": "stop",
                        "id": "312352",
                        "name": "Hausleiten b.Stockerau Bahnhof (Bahnhofstraße)",
                        "location": {
                            "type": "location",
                            "id": "312352",
                            "latitude": 48.391756,
                            "longitude": 16.104948
                        },
                        "products": {
                            "nationalExpress": false,
                            "national": false,
                            "interregional": false,
                            "regional": false,
                            "suburban": false,
                            "bus": true,
                            "ferry": false,
                            "subway": false,
                            "tram": false,
                            "onCall": false
                        }
                    },
                    "destination": {
                        "type": "stop",
                        "id": "321031",
                        "name": "Tulln/Donau Schubertpark",
                        "location": {
                            "type": "location",
                            "id": "321031",
                            "latitude": 48.330422,
                            "longitude": 16.048739
                        },
                        "products": {
                            "nationalExpress": false,
                            "national": false,
                            "interregional": false,
                            "regional": false,
                            "suburban": false,
                            "bus": true,
                            "ferry": false,
                            "subway": false,
                            "tram": false,
                            "onCall": false
                        }
                    },
                    "departure": "2026-08-06T09:49:00+02:00",
                    "plannedDeparture": "2026-08-06T09:49:00+02:00",
                    "departureDelay": null,
                    "arrival": "2026-08-06T10:05:00+02:00",
                    "plannedArrival": "2026-08-06T10:05:00+02:00",
                    "arrivalDelay": null,
                    "reachable": true,
                    "tripId": "2|#VN#1#ST#1785750053#PI#0#ZI#395808#TA#0#DA#60826#1S#310130#1T#910#LS#321031#LT#1005#PU#81#RT#1#CA#Bus#ZE#800#ZB#Bus 800 #PC#6#FR#310130#FT#910#TO#321031#TT#1005#",
                    "line": {
                        "type": "line",
                        "id": "vor-98-800",
                        "fahrtNr": "914427",
                        "name": "Bus 800",
                        "public": true,
                        "adminCode": "v12Pos",
                        "productName": "Bus",
                        "mode": "bus",
                        "product": "bus",
                        "operator": {
                            "type": "operator",
                            "id": "osterreichische-postbus-aktiengesellschaft",
                            "name": "Österreichische Postbus Aktiengesellschaft"
                        }
                    },
                    "direction": "Tulln/Donau Schubertpark",
                    "arrivalPlatform": "A",
                    "plannedArrivalPlatform": "A",
                    "arrivalPrognosisType": "prognosed",
                    "departurePlatform": null,
                    "plannedDeparturePlatform": null,
                    "departurePrognosisType": "prognosed"
                },
                {
                    "origin": {
                        "type": "stop",
                        "id": "321031",
                        "name": "Tulln/Donau Schubertpark",
                        "location": {
                            "type": "location",
                            "id": "321031",
                            "latitude": 48.330422,
                            "longitude": 16.048739
                        },
                        "products": {
                            "nationalExpress": false,
                            "national": false,
                            "interregional": false,
                            "regional": false,
                            "suburban": false,
                            "bus": true,
                            "ferry": false,
                            "subway": false,
                            "tram": false,
                            "onCall": false
                        }
                    },
                    "destination": {
                        "type": "stop",
                        "id": "321031",
                        "name": "Tulln/Donau Schubertpark",
                        "location": {
                            "type": "location",
                            "id": "321031",
                            "latitude": 48.330422,
                            "longitude": 16.048739
                        },
                        "products": {
                            "nationalExpress": false,
                            "national": false,
                            "interregional": false,
                            "regional": false,
                            "suburban": false,
                            "bus": true,
                            "ferry": false,
                            "subway": false,
                            "tram": false,
                            "onCall": false
                        }
                    },
                    "departure": "2026-08-06T10:05:00+02:00",
                    "plannedDeparture": "2026-08-06T10:05:00+02:00",
                    "departureDelay": null,
                    "arrival": "2026-08-06T10:05:00+02:00",
                    "plannedArrival": "2026-08-06T10:05:00+02:00",
                    "arrivalDelay": null,
                    "public": true,
                    "walking": true,
                    "distance": null
                },
                {
                    "origin": {
                        "type": "stop",
                        "id": "321031",
                        "name": "Tulln/Donau Schubertpark",
                        "location": {
                            "type": "location",
                            "id": "321031",
                            "latitude": 48.330422,
                            "longitude": 16.048739
                        },
                        "products": {
                            "nationalExpress": false,
                            "national": false,
                            "interregional": false,
                            "regional": false,
                            "suburban": false,
                            "bus": true,
                            "ferry": false,
                            "subway": false,
                            "tram": false,
                            "onCall": false
                        }
                    },
                    "destination": {
                        "type": "stop",
                        "id": "319501",
                        "name": "Tullnerfeld Bahnhof (Südseite)",
                        "location": {
                            "type": "location",
                            "id": "319501",
                            "latitude": 48.294511,
                            "longitude": 15.996206
                        },
                        "products": {
                            "nationalExpress": false,
                            "national": true,
                            "interregional": false,
                            "regional": false,
                            "suburban": false,
                            "bus": true,
                            "ferry": false,
                            "subway": false,
                            "tram": false,
                            "onCall": false
                        }
                    },
                    "departure": "2026-08-06T10:10:00+02:00",
                    "plannedDeparture": "2026-08-06T10:10:00+02:00",
                    "departureDelay": null,
                    "arrival": "2026-08-06T10:24:00+02:00",
                    "plannedArrival": "2026-08-06T10:24:00+02:00",
                    "arrivalDelay": null,
                    "reachable": true,
                    "tripId": "2|#VN#1#ST#1785750053#PI#0#ZI#386535#TA#1#DA#60826#1S#321160#1T#1005#LS#319242#LT#1055#PU#81#RT#1#CA#Bus#ZE#442#ZB#Bus 442 #PC#6#FR#321160#FT#1005#TO#319242#TT#1055#",
                    "line": {
                        "type": "line",
                        "id": "vor-93-442",
                        "fahrtNr": "909869",
                        "name": "Bus 442",
                        "public": true,
                        "adminCode": "v12Pos",
                        "productName": "Bus",
                        "mode": "bus",
                        "product": "bus",
                        "operator": {
                            "type": "operator",
                            "id": "osterreichische-postbus-aktiengesellschaft",
                            "name": "Österreichische Postbus Aktiengesellschaft"
                        }
                    },
                    "direction": "Neulengbach Stadt Bahnhst (Bahnstraße)",
                    "arrivalPlatform": "X",
                    "plannedArrivalPlatform": "X",
                    "arrivalPrognosisType": "prognosed",
                    "departurePlatform": "B",
                    "plannedDeparturePlatform": "B",
                    "departurePrognosisType": "prognosed",
                    "cycle": {
                        "min": 420,
                        "max": 3180,
                        "nr": 6
                    },
                    "alternatives": [
                        {
                            "tripId": "2|#VN#1#ST#1785750053#PI#0#ZI#385909#TA#1#DA#60826#1S#321031#1T#1033#LS#321039#LT#1100#PU#81#RT#1#CA#Bus#ZE#409#ZB#Bus 409 #PC#6#FR#321031#FT#1033#TO#321039#TT#1100#",
                            "line": {
                                "type": "line",
                                "id": "vor-93-409",
                                "fahrtNr": "909695",
                                "name": "Bus 409",
                                "public": true,
                                "adminCode": "v12Pos",
                                "productName": "Bus",
                                "mode": "bus",
                                "product": "bus",
                                "operator": {
                                    "type": "operator",
                                    "id": "osterreichische-postbus-aktiengesellschaft",
                                    "name": "Österreichische Postbus Aktiengesellschaft"
                                }
                            },
                            "direction": "Sieghartskirchen Karl-Berger-Platz",
                            "when": "2026-08-06T10:33:00+02:00",
                            "plannedWhen": "2026-08-06T10:33:00+02:00",
                            "delay": null
                        },
                        {
                            "tripId": "2|#VN#1#ST#1785750053#PI#0#ZI#386358#TA#1#DA#60826#1S#321031#1T#1040#LS#319501#LT#1110#PU#81#RT#1#CA#Bus#ZE#410#ZB#Bus 410 #PC#6#FR#321031#FT#1040#TO#319501#TT#1110#",
                            "line": {
                                "type": "line",
                                "id": "vor-93-410",
                                "fahrtNr": "909827",
                                "name": "Bus 410",
                                "public": true,
                                "adminCode": "v12Pos",
                                "productName": "Bus",
                                "mode": "bus",
                                "product": "bus",
                                "operator": {
                                    "type": "operator",
                                    "id": "osterreichische-postbus-aktiengesellschaft",
                                    "name": "Österreichische Postbus Aktiengesellschaft"
                                }
                            },
                            "direction": "Tullnerfeld Bahnhof (Südseite)",
                            "when": "2026-08-06T10:40:00+02:00",
                            "plannedWhen": "2026-08-06T10:40:00+02:00",
                            "delay": null
                        },
                        {
                            "tripId": "2|#VN#1#ST#1785750053#PI#0#ZI#385909#TA#2#DA#60826#1S#321031#1T#1133#LS#321039#LT#1200#PU#81#RT#1#CA#Bus#ZE#409#ZB#Bus 409 #PC#6#FR#321031#FT#1133#TO#321039#TT#1200#",
                            "line": {
                                "type": "line",
                                "id": "vor-93-409",
                                "fahrtNr": "909692",
                                "name": "Bus 409",
                                "public": true,
                                "adminCode": "v12Pos",
                                "productName": "Bus",
                                "mode": "bus",
                                "product": "bus",
                                "operator": {
                                    "type": "operator",
                                    "id": "osterreichische-postbus-aktiengesellschaft",
                                    "name": "Österreichische Postbus Aktiengesellschaft"
                                }
                            },
                            "direction": "Sieghartskirchen Karl-Berger-Platz",
                            "when": "2026-08-06T11:33:00+02:00",
                            "plannedWhen": "2026-08-06T11:33:00+02:00",
                            "delay": null
                        },
                        {
                            "tripId": "2|#VN#1#ST#1785750053#PI#0#ZI#386655#TA#0#DA#60826#1S#321160#1T#1135#LS#321229#LT#1226#PU#81#RT#1#CA#Bus#ZE#443#ZB#Bus 443 #PC#6#FR#321160#FT#1135#TO#321229#TT#1226#",
                            "line": {
                                "type": "line",
                                "id": "vor-93-443",
                                "fahrtNr": "909917",
                                "name": "Bus 443",
                                "public": true,
                                "adminCode": "v12Pos",
                                "productName": "Bus",
                                "mode": "bus",
                                "product": "bus",
                                "operator": {
                                    "type": "operator",
                                    "id": "osterreichische-postbus-aktiengesellschaft",
                                    "name": "Österreichische Postbus Aktiengesellschaft"
                                }
                            },
                            "direction": "Würmla Kirchenplatz",
                            "when": "2026-08-06T11:41:00+02:00",
                            "plannedWhen": "2026-08-06T11:41:00+02:00",
                            "delay": null
                        },
                        {
                            "tripId": "2|#VN#1#ST#1785750053#PI#0#ZI#386535#TA#2#DA#60826#1S#321160#1T#1205#LS#319242#LT#1255#PU#81#RT#1#CA#Bus#ZE#442#ZB#Bus 442 #PC#6#FR#321160#FT#1205#TO#319242#TT#1255#",
                            "line": {
                                "type": "line",
                                "id": "vor-93-442",
                                "fahrtNr": "909870",
                                "name": "Bus 442",
                                "public": true,
                                "adminCode": "v12Pos",
                                "productName": "Bus",
                                "mode": "bus",
                                "product": "bus",
                                "operator": {
                                    "type": "operator",
                                    "id": "osterreichische-postbus-aktiengesellschaft",
                                    "name": "Österreichische Postbus Aktiengesellschaft"
                                }
                            },
                            "direction": "Neulengbach Stadt Bahnhst (Bahnstraße)",
                            "when": "2026-08-06T12:10:00+02:00",
                            "plannedWhen": "2026-08-06T12:10:00+02:00",
                            "delay": null
                        }
                    ]
                },
                {
                    "origin": {
                        "type": "stop",
                        "id": "319501",
                        "name": "Tullnerfeld Bahnhof (Südseite)",
                        "location": {
                            "type": "location",
                            "id": "319501",
                            "latitude": 48.294511,
                            "longitude": 15.996206
                        },
                        "products": {
                            "nationalExpress": false,
                            "national": true,
                            "interregional": false,
                            "regional": false,
                            "suburban": false,
                            "bus": true,
                            "ferry": false,
                            "subway": false,
                            "tram": false,
                            "onCall": false
                        }
                    },
                    "destination": {
                        "type": "stop",
                        "id": "8102059",
                        "name": "Tullnerfeld Bahnhof",
                        "location": {
                            "type": "location",
                            "id": "8102059",
                            "latitude": 48.295275,
                            "longitude": 15.996529
                        },
                        "products": {
                            "nationalExpress": true,
                            "national": true,
                            "interregional": true,
                            "regional": true,
                            "suburban": true,
                            "bus": false,
                            "ferry": false,
                            "subway": false,
                            "tram": false,
                            "onCall": false
                        }
                    },
                    "departure": "2026-08-06T10:24:00+02:00",
                    "plannedDeparture": "2026-08-06T10:24:00+02:00",
                    "departureDelay": null,
                    "arrival": "2026-08-06T10:28:00+02:00",
                    "plannedArrival": "2026-08-06T10:28:00+02:00",
                    "arrivalDelay": null,
                    "public": true,
                    "walking": true,
                    "distance": 88
                },
                {
                    "origin": {
                        "type": "stop",
                        "id": "8102059",
                        "name": "Tullnerfeld Bahnhof",
                        "location": {
                            "type": "location",
                            "id": "8102059",
                            "latitude": 48.295275,
                            "longitude": 15.996529
                        },
                        "products": {
                            "nationalExpress": true,
                            "national": true,
                            "interregional": true,
                            "regional": true,
                            "suburban": true,
                            "bus": false,
                            "ferry": false,
                            "subway": false,
                            "tram": false,
                            "onCall": false
                        }
                    },
                    "destination": {
                        "type": "stop",
                        "id": "8100514",
                        "name": "Wien Meidling Bahnhof",
                        "location": {
                            "type": "location",
                            "id": "8100514",
                            "latitude": 48.174532,
                            "longitude": 16.333966
                        },
                        "products": {
                            "nationalExpress": true,
                            "national": true,
                            "interregional": true,
                            "regional": true,
                            "suburban": true,
                            "bus": false,
                            "ferry": false,
                            "subway": false,
                            "tram": false,
                            "onCall": false
                        }
                    },
                    "departure": "2026-08-06T10:43:00+02:00",
                    "plannedDeparture": "2026-08-06T10:43:00+02:00",
                    "departureDelay": 0,
                    "arrival": "2026-08-06T10:56:00+02:00",
                    "plannedArrival": "2026-08-06T10:56:00+02:00",
                    "arrivalDelay": 0,
                    "reachable": true,
                    "tripId": "2|#VN#1#ST#1785750053#PI#0#ZI#358671#TA#2#DA#60826#1S#8100002#1T#811#LS#8100353#LT#1127#PU#81#RT#1#CA#IC#ZE#547#ZB#IC 547  #PC#2#FR#8100002#FT#811#TO#8100353#TT#1127#",
                    "line": {
                        "type": "line",
                        "id": "ic-547",
                        "fahrtNr": "547",
                        "name": "IC 547",
                        "public": true,
                        "adminCode": "81____",
                        "productName": "IC",
                        "mode": "train",
                        "product": "national",
                        "operator": {
                            "type": "operator",
                            "id": "nahreisezug",
                            "name": "Nahreisezug"
                        }
                    },
                    "direction": "Flughafen Wien",
                    "currentLocation": {
                        "type": "location",
                        "latitude": 48.008339,
                        "longitude": 13.687281
                    },
                    "arrivalPlatform": "6",
                    "plannedArrivalPlatform": "6",
                    "arrivalPrognosisType": "prognosed",
                    "departurePlatform": "1",
                    "plannedDeparturePlatform": "1",
                    "departurePrognosisType": "prognosed",
                    "cycle": {
                        "min": 3600,
                        "max": 3600,
                        "nr": 3
                    }
                },
                {
                    "origin": {
                        "type": "stop",
                        "id": "8100514",
                        "name": "Wien Meidling Bahnhof",
                        "location": {
                            "type": "location",
                            "id": "8100514",
                            "latitude": 48.174532,
                            "longitude": 16.333966
                        },
                        "products": {
                            "nationalExpress": true,
                            "national": true,
                            "interregional": true,
                            "regional": true,
                            "suburban": true,
                            "bus": false,
                            "ferry": false,
                            "subway": false,
                            "tram": false,
                            "onCall": false
                        }
                    },
                    "destination": {
                        "type": "stop",
                        "id": "912005",
                        "name": "Wien Meidling Bahnhof (U6)",
                        "location": {
                            "type": "location",
                            "id": "912005",
                            "latitude": 48.174127,
                            "longitude": 16.331449
                        },
                        "products": {
                            "nationalExpress": false,
                            "national": false,
                            "interregional": false,
                            "regional": false,
                            "suburban": false,
                            "bus": false,
                            "ferry": false,
                            "subway": true,
                            "tram": false,
                            "onCall": false
                        }
                    },
                    "departure": "2026-08-06T10:56:00+02:00",
                    "plannedDeparture": "2026-08-06T10:56:00+02:00",
                    "departureDelay": 0,
                    "arrival": "2026-08-06T11:02:00+02:00",
                    "plannedArrival": "2026-08-06T11:02:00+02:00",
                    "arrivalDelay": 0,
                    "public": true,
                    "walking": true,
                    "distance": 192
                },
                {
                    "origin": {
                        "type": "stop",
                        "id": "912005",
                        "name": "Wien Meidling Bahnhof (U6)",
                        "location": {
                            "type": "location",
                            "id": "912005",
                            "latitude": 48.174127,
                            "longitude": 16.331449
                        },
                        "products": {
                            "nationalExpress": false,
                            "national": false,
                            "interregional": false,
                            "regional": false,
                            "suburban": false,
                            "bus": false,
                            "ferry": false,
                            "subway": true,
                            "tram": false,
                            "onCall": false
                        }
                    },
                    "destination": {
                        "type": "stop",
                        "id": "921008",
                        "name": "Wien Floridsdorf Bahnhof (U6)",
                        "location": {
                            "type": "location",
                            "id": "921008",
                            "latitude": 48.256154,
                            "longitude": 16.400495
                        },
                        "products": {
                            "nationalExpress": false,
                            "national": false,
                            "interregional": false,
                            "regional": false,
                            "suburban": false,
                            "bus": false,
                            "ferry": false,
                            "subway": true,
                            "tram": false,
                            "onCall": false
                        }
                    },
                    "departure": "2026-08-06T11:02:00+02:00",
                    "plannedDeparture": "2026-08-06T11:02:00+02:00",
                    "departureDelay": null,
                    "arrival": "2026-08-06T11:27:00+02:00",
                    "plannedArrival": "2026-08-06T11:27:00+02:00",
                    "arrivalDelay": null,
                    "reachable": true,
                    "tripId": "2|#VN#1#ST#1785750053#PI#0#ZI#272967#TA#25#DA#60826#1S#923054#1T#1052#LS#921008#LT#1127#PU#81#RT#1#CA#U#ZE#U6#ZB#      U6#PC#8#FR#923054#FT#1052#TO#921008#TT#1127#",
                    "line": {
                        "type": "line",
                        "id": "vor-21-u6",
                        "fahrtNr": "958150",
                        "name": "U6",
                        "public": true,
                        "adminCode": "v04WL_",
                        "productName": "U",
                        "mode": "train",
                        "product": "subway",
                        "operator": {
                            "type": "operator",
                            "id": "wiener-linien-gmbh-co-kg",
                            "name": "Wiener Linien GmbH & Co KG"
                        }
                    },
                    "direction": "Floridsdorf",
                    "arrivalPlatform": "1",
                    "plannedArrivalPlatform": "1",
                    "arrivalPrognosisType": "prognosed",
                    "departurePlatform": "1",
                    "plannedDeparturePlatform": "1",
                    "departurePrognosisType": "prognosed",
                    "cycle": {
                        "min": 120,
                        "max": 240,
                        "nr": 34
                    }
                }
            ],
            "refreshToken": "¶HKI¶T$A=1@O=Hausleiten b.Stockerau Bahnhof (Bahnhofstraße)@L=312352@a=128@$A=1@O=Tulln/Donau Schubertpark@L=321031@a=128@$202608060949$202608061005$Bus 800 $$1$$$$$$§T$A=1@O=Tulln/Donau Schubertpark@L=321031@a=128@$A=1@O=Tullnerfeld Bahnhof (Südseite)@L=319501@a=128@$202608061010$202608061024$Bus 442 $$1$$$$$$§W$A=1@O=Tullnerfeld Bahnhof (Südseite)@L=319501@a=128@$A=1@O=Tullnerfeld Bahnhof@L=8102059@a=128@$202608061024$202608061028$$$1$$$$$$§T$A=1@O=Tullnerfeld Bahnhof@L=8102059@a=128@$A=1@O=Wien Meidling Bahnhof@L=8100514@a=128@$202608061043$202608061056$IC 547  $$1$$$$$$§W$A=1@O=Wien Meidling Bahnhof@L=8100514@a=128@$A=1@O=Wien Meidling Bahnhof (U6)@L=912005@a=128@$202608061056$202608061102$$$1$$$$$$§T$A=1@O=Wien Meidling Bahnhof (U6)@L=912005@a=128@$A=1@O=Wien Floridsdorf Bahnhof (U6)@L=921008@a=128@$202608061102$202608061127$      U6$$1$$$$$$¶KRCC¶#VE#1#MRTF#",
            "cycle": {
                "min": 3600
            }
        }
    ],
    "realtimeDataUpdatedAt": 1785999406
}