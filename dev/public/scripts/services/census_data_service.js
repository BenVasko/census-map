'use strict';

function CensusDataService($http) {
    const dataHeaders = {
    //population
        totalPop: 'P0010001',
        totalPopRace: 'P0030001',
        totalPopAge: 'P0120001',
    //race
        white: 'P0030002',
        black:'P0030003',
        americanIndian: 'P0030004',
        asian: 'P0030005',
        hawaiian: 'P0030006',
        other: 'P0030007',
        multiple: 'P0030008',
    //age, male
        totalMalePop: 'P0120002',
        maleUnder5:'P0120003',
        male5_9:'P0120004',
        male10_14:'P0120005',
        male15_17:'P0120006',
        male18_19:'P0120007',
        male20:'P0120008',
        male21:'P0120009',
        male22_24:'P01200010',
        male25_29:'P0120011',
        male30_34:'P0120012',
        male35_39:'P0120013',
        male40_44:'P0120014',
        male45_49:'P0120015',
        male50_54:'P0120016',
        male55_59:'P0120017',
        male60_61:'P0120018',
        male62_64:'P0120019',
        male65_66:'P0120020',
        male67_69:'P0120021',
        male70_74:'P0120022',
        male75_79:'P0120023',
        male80_84:'P0120024',
        male85_over:'P0120025',
    //age, female 
        femaleUnder5:'P0120027',
        female5_9:'P0120028',
        female10_14:'P0120029',
        female15_17:'P0120030',
        female18_19:'P0120031',
        female20:'P0120032',
        female21:'P0120033',
        female22_24:'P01200034',
        female25_29:'P0120035',
        female30_34:'P0120036',
        female35_39:'P0120037',
        female40_44:'P0120038',
        female45_49:'P0120039',
        female50_54:'P0120040',
        female55_59:'P0120041',
        female60_61:'P0120042',
        female62_64:'P0120043',
        female65_66:'P0120044',
        female67_69:'P0120045',
        female70_74:'P0120046',
        female75_79:'P0120047',
        female80_84:'P0120048',
        female85_over:'P0120049'





    };
    const state = {
        alabama: "01",
        alaska: "02",
        arizona: "04",
        arkansas: "05",
        california: "06",
        colorado: "08",
        connecticut: "09",
        delaware: "10",
        district_of_columbia: "11",
        florida: "12",
        georgia: "13",
        hawaii: "15",
        idaho: "16",
        illinois: "17",
        indiana: "18",
        iowa: "19",
        kansas: "20",
        kentucky: "21",
        louisiana: "22",
        maine: "23",
        maryland: "24",
        massachusetts:"25",
        michigan: "26",
        minnesota: "27",
        mississippi: "28",
        missouri: "29",
        montana: "30",
        nebraska: "31",
        nevada: "31",
        new_hampshire: "33",
        new_jersery: "34",
        new_mexico: "35",
        new_york: "36",
        north_carolina: "37",
        north_dakota: "38",
        ohio: "39",
        oklahoma: "40",
        oregon: "41",
        pennsylvania: "42",
        rhode_island: "44",
        south_carolina: "45",
        south_dakota: "46",
        tennessee: "47",
        texas: "48",
        utah: "49",
        vermont: "50",
        virginia: "51",
        washington: "53",
        west_virginia: "54",
        wisconsin: "55",
        wyoming: "56", 
        puerto_rico: "72",
        all: "*"
    }

    const vm = this;

    vm.getStatePopulation = () => {
        return $http({
            url: `api.census.gov/data/2010/sf1?get=${dataHeaders.totalPop},NAME&for=state:${state.all}&key=a8ed8e7175e0f6f1c379233a5f3020105c645e2b`,
            method: 'GET'
        }).then((response) => {
            console.log('called getStatePopulation');
            console.log(response.data);
            return response.data;
        });
    };

    vm.getCountyPopulationForState = (targetState) => {
        return $http({
            url: `api.census.gov/data/2010/sf1?get=${dataHeaders.totalPop},NAME&for=county:*&in=state:${targetState}&key=a8ed8e7175e0f6f1c379233a5f3020105c645e2b`,
            method: 'GET'
        }).then((response) => {
            console.log(response.data);
            return response.data;
        });
    };
//_____________Getting populatations based on race by state__________________ 
    vm.getStatePopRace = () => {
        return $http({
            url:`api.census.gov/data/2010/sf1?get=${dataHeaders.white},${dataHeaders.black},${dataHeaders.americanIndian},${dataHeaders.asian},${dataHeaders.other},${dataHeaders.hawaiian},${dataHeaders.multiple},NAME&for=state:${state.all}&key=a8ed8e7175e0f6f1c379233a5f3020105c645e2b`,,
            method:'GET'
        }).then((response) => {
            console.log(response.data);
            return response.data
        })
    }
 

//_____________Getting populatations based on race by county__________________ 
vm.getCountyPopRace = (targetState) => {
    return $http({
        url:`api.census.gov/data/2010/sf1?get=${dataHeaders.white},${dataHeaders.black},${dataHeaders.americanIndian},${dataHeaders.asian},${dataHeaders.other},${dataHeaders.hawaiian},${dataHeaders.multiple},NAME&for=county:*&in=state:${targetState}&key=a8ed8e7175e0f6f1c379233a5f3020105c645e2b`,
        method:'GET'
    }).then((response) => {
        console.log(response.data)
        return response.data
    })
}

//_____________Getting age based on state__________________ 
vm.getStatePopAge = () => {
    return $http({
        url:
        method:'GET'
    }).then((response) => {
        console.log(response.data);
        return response.data
    })
}
//_____________Getting age based on county__________________ 
vm.getCountyPopAge = (targetState) => {
    return $http({
        url:
        method:'GET'
    }).then((response) => {
        console.log(response.data)
        return response.data
    })
}

}

angular.module("App").service("CensusDataService", CensusDataService);