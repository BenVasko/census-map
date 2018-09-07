'use strict';

function CensusDataService($http) {
    const dataHeaders = {
        totalPop = 'P0010001'
    };
    const state = {
        alabama = "01",
        alaska = "02",
        arizona = "04",
        arkansas = "05",
        california = "06",
        colorado = "08",
        connecticut = "09",
        delaware = "10",
        district_of_columbia = "11",
        florida = "12",
        georgia = "13",
        hawaii = "15",
        idaho = "16",
        illinois = "17",
        indiana = "18",
        iowa = "19",
        kansas = "20",
        kentucky = "21",
        louisiana = "22",
        maine = "23",
        maryland = "24",
        massachusetts ="25",
        michigan = "26",
        minnesota = "27",
        mississippi = "28",
        missouri = "29",
        montana = "30",
        nebraska = "31",
        nevada = "31",
        new_hampshire = "33",
        new_jersery = "34",
        new_mexico = "35",
        new_york = "36",
        north_carolina = "37",
        north_dakota = "38",
        ohio = "39",
        oklahoma = "40",
        oregon = "41",
        pennsylvania = "42",
        rhode_island = "44",
        south_carolina = "45",
        south_dakota = "46",
        tennessee = "47",
        texas = "48",
        utah = "49",
        vermont = "50",
        virginia = "51",
        washington = "53",
        west_virginia = "54",
        wisconsin = "55",
        wyoming = "56", 
        puerto_rico = "72"
    }


    return $http({
        url: `api.census.gov/data/2010/sf1?get=${dataHeaders.totalPop},NAME&for=state:*&key=a8ed8e7175e0f6f1c379233a5f3020105c645e2b`,
        method: 'GET'
    }).then((response) => {
        console.log(response.data);
        return response.data;
    })

}

angular.module("App").service("CensusDataService", CensusDataService);