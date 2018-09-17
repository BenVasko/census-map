'use strict';

function CensusDataService($http) {
    const vm = this;
    const dataHeaders = {
        key: 'a8ed8e7175e0f6f1c379233a5f3020105c645e2b',
//2010----------------------------------------------------
    //population 2010
        totalPop: 'P0010001',
        totalPopRace: 'P0030001',
        totalPopAge: 'P0120001',
    //race 2010
        white: 'P0030002',
        black:'P0030003',
        americanIndian: 'P0030004',
        asian: 'P0030005',
        hawaiian: 'P0030006',
        other: 'P0030007',
        multiple: 'P0030008',
    //age, male 2010
        totalMalePop: 'P0120002',
        maleUnder5:'P0120003',
        male5_9:'P0120004',
        male10_14:'P0120005',
        male15_17:'P0120006',
        male18_19:'P0120007',
        male20:'P0120008',
        male21:'P0120009',
        male22_24:'P0120010',
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
        //age, female 2010
        femaleUnder5:'P0120027',
        female5_9:'P0120028',
        female10_14:'P0120029',
        female15_17:'P0120030',
        female18_19:'P0120031',
        female20:'P0120032',
        female21:'P0120033',
        female22_24:'P0120034',
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
        female85_over:'P0120049',
//2000---------------------------------------------------------------------
        //population 2000
        totalPop00: 'P001001',
        totalPopRace00:'P003001',
        totalPopAge00:'P012001',
        //race 2000
        white00:'P003003',
        black00:'P003004',
        americanIndian00: 'P003005', 
        asian00: 'P003006',
        hawaiian00: 'P003007',
        other00:'P003008', 
        multiple00: 'P003009',
        //age, male 2000
        totalMalePop00: 'P012002',
        maleUnder5_00:'P012003',
        male5_9_00:'P012004',
        male10_14_00:'P012005',
        male15_17_00:'P012006',
        male18_19_00:'P012007',
        male20_00:'P012008',
        male21_00:'P012009',
        male22_24_00:'P012010',
        male25_29_00:'P012011',
        male30_34_00:'P012012',
        male35_39_00:'P012013',
        male40_44_00:'P012014',
        male45_49_00:'P012015',
        male50_54_00:'P012016',
        male55_59_00:'P012017',
        male60_61_00:'P012018',
        male62_64_00:'P012019',
        male65_66_00:'P012020',
        male67_69_00:'P012021',
        male70_74_00:'P012022',
        male75_79_00:'P012023',
        male80_84_00:'P012024',
        male85_over_00:'P012025',
        //age female 2000
        totalFemalePop_00: 'P012026',
        femaleUnder5_00:'P012027',
        female5_9_00:'P012028',
        female10_14_00:'P012029',
        female15_17_00:'P012030',
        female18_19_00:'P012031',
        female20_00:'P012032',
        female21_00:'P012033',
        female22_24_00:'P012034',
        female25_29_00:'P012035',
        female30_34_00:'P012036',
        female35_39_00:'P012037',
        female40_44_00:'P012038',
        female45_49_00:'P012039',
        female50_54_00:'P012040',
        female55_59_00:'P012041',
        female60_61_00:'P012042',
        female62_64_00:'P012043',
        female65_66_00:'P012044',
        female67_69_00:'P012045',
        female70_74_00:'P012046',
        female75_79_00:'P012047',
        female80_84_00:'P012048',
        female85_over_00:'P012049',
//1990--------------------------------------------------
        //population 1990
        totalPop90: 'P0010001',
        totalPopRace90: 'P0010001',
        totalPopAge90: 'P0120001',
        //race 1990
        white90:'P0070001',
        black90:'P0080002',
        americanIndian90: 'P0080003', 
        asian90: 'P0080004',
        hawaiian90: 'P0090017',
        other90:'P0080005', 
        // multiple90: '',

        //age, both sexes 1990
        under1_90:'P0110001',	
        a1_2_90:'P0110002',
        a3_4_90:'P0110003',
        a5_90:'P0110004',
        a6_90:'P0110005',
        a7_9_90:'P0110006',
        a10_11_90:'P0110007',
        a12_13_90:'P0110008',
        a14_90:'P0110009',
        a15_90:'P0110010',
        a16_90:'P0110011',
        a17_90:'P0110012',
        a18_90:'P0110013',
        a19_90:'P0110014',
        a20_90:'P0110015',
        a21_90:'P0110016',
        a22_24_90:'P0110017',
        a25_29_90:'P0110018',
        a30_34:'P0110019',
        a35_39_90:'P0110020',
        a40_44_90:'P0110021',
        a45_49_90:'P0110022',
        a50_54_90:'P0110023',
        a55_59_90:'P0110024',
        a60_61_90:'P0110025',
        a62_64_90:'P0110026',
        a65_69_90:'P0110027',
        a70_74_90:'P0110028',
        a75_79_90:'P0110029',
        a80_84_90:'P0110030',
        a_over_85_90:'P0110031',

   
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
        nevada: "32",
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

//___________Convert State Names to IDs_________________________
    vm.convertStateNameToCensusID = (stateName) => {
        let checkedName = stateName.replace(' ', '_').toLowerCase();
        return state[checkedName];
    }

//_______________Populations 2010_____________________________________________

    vm.getStatePopulation = () => {
        return $http({
            url: `https://api.census.gov/data/2010/sf1?get=${dataHeaders.totalPop},NAME&for=state:${state.all}&key=${dataHeaders.key}`,
            method: 'GET'
        }).then((response) => {
            return response.data;
        });
    };

    vm.getCountyPopulationForState = (targetState) => {
        return $http({
            url: `https://api.census.gov/data/2010/sf1?get=${dataHeaders.totalPop},NAME&for=county:*&in=state:${targetState}&key=${dataHeaders.key}`,
            method: 'GET'
        }).then((response) => {
            // console.log(response.data);
            return response.data;
        });
    };
//_____________2010 Getting populatations based on race by state__________________ 
    vm.getStatePopRace = () => {
        return $http({
            // url:`https://api.census.gov/data/2010/sf1?get=${dataHeaders.white},${dataHeaders.black},${dataHeaders.americanIndian},${dataHeaders.asian},${dataHeaders.other},${dataHeaders.hawaiian},${dataHeaders.multiple},NAME&for=state:${state.all}&key=${dataHeaders.key}`,
            url:`https://api.census.gov/data/2010/sf1?get=${dataHeaders.white},${dataHeaders.totalPopRace},NAME&for=state:${state.all}&key=${dataHeaders.key}`,
            method:'GET'
        }).then((response) => {

            return response.data
        })
    }
 

//_____________2010 Getting populatations based on race by county__________________ 
vm.getCountyPopRace = (targetState) => {
    return $http({
        // url:`https://api.census.gov/data/2010/sf1?get=${dataHeaders.white},${dataHeaders.black},${dataHeaders.americanIndian},${dataHeaders.asian},${dataHeaders.other},${dataHeaders.hawaiian},${dataHeaders.multiple},NAME&for=county:*&in=state:${targetState}&key=${dataHeaders.key}`,
        url:`https://api.census.gov/data/2010/sf1?get=${dataHeaders.white},${dataHeaders.totalPopRace},NAME&for=county:*&in=state:${targetState}&key=${dataHeaders.key}`,
        method:'GET'
    }).then((response) => {

        return response.data
    })
}

//_____________2010 Getting age based on state__________________ 
vm.getStatePopAge = () => {
    return $http({

        url: `https://api.census.gov/data/2010/sf1?get=${dataHeaders.maleUnder5},${dataHeaders.male5_9},${dataHeaders.male10_14},${dataHeaders.male15_17},${dataHeaders.male18_19},${dataHeaders.male20},${dataHeaders.male21},${dataHeaders.male22_24},${dataHeaders.male25_29},${dataHeaders.male30_34},${dataHeaders.male35_39},${dataHeaders.male40_44},${dataHeaders.male45_49},${dataHeaders.male50_54},${dataHeaders.male55_59},${dataHeaders.male60_61},${dataHeaders.male62_64},${dataHeaders.male65_66},${dataHeaders.male67_69},${dataHeaders.male70_74},${dataHeaders.male75_79},${dataHeaders.male80_84},${dataHeaders.male21},${dataHeaders.male85_over},${dataHeaders.femaleUnder5},${dataHeaders.female5_9},${dataHeaders.female10_14},${dataHeaders.female15_17},${dataHeaders.female18_19},${dataHeaders.female20},${dataHeaders.female21},${dataHeaders.female22_24},${dataHeaders.female25_29},${dataHeaders.female30_34},${dataHeaders.female35_39},${dataHeaders.female40_44},${dataHeaders.female45_49},${dataHeaders.female50_54},${dataHeaders.female55_59},${dataHeaders.female60_61},${dataHeaders.female62_64},${dataHeaders.female65_66},${dataHeaders.female67_69},${dataHeaders.female70_74},${dataHeaders.female75_79},${dataHeaders.female80_84},${dataHeaders.female85_over},NAME&for=state:${state.all}&key=${dataHeaders.key}`,
        method:'GET'
    }).then((response) => {
        // console.log(response.data);
        return response.data
    })
}
//_____________2010 Getting age based on county__________________ 
vm.getCountyPopAge = (targetState) => {
    return $http({
        url: `https://api.census.gov/data/2010/sf1?get=${dataHeaders.maleUnder5},${dataHeaders.male5_9},${dataHeaders.male10_14},${dataHeaders.male15_17},${dataHeaders.male18_19},${dataHeaders.male20},${dataHeaders.male21},${dataHeaders.male22_24},${dataHeaders.male25_29},${dataHeaders.male30_34},${dataHeaders.male35_39},${dataHeaders.male40_44},${dataHeaders.male45_49},${dataHeaders.male50_54},${dataHeaders.male55_59},${dataHeaders.male60_61},${dataHeaders.male62_64},${dataHeaders.male65_66},${dataHeaders.male67_69},${dataHeaders.male70_74},${dataHeaders.male75_79},${dataHeaders.male80_84},${dataHeaders.male21},${dataHeaders.male85_over},${dataHeaders.femaleUnder5},${dataHeaders.female5_9},${dataHeaders.female10_14},${dataHeaders.female15_17},${dataHeaders.female18_19},${dataHeaders.female20},${dataHeaders.female21},${dataHeaders.female22_24},${dataHeaders.female25_29},${dataHeaders.female30_34},${dataHeaders.female35_39},${dataHeaders.female40_44},${dataHeaders.female45_49},${dataHeaders.female50_54},${dataHeaders.female55_59},${dataHeaders.female60_61},${dataHeaders.female62_64},${dataHeaders.female65_66},${dataHeaders.female67_69},${dataHeaders.female70_74},${dataHeaders.female75_79},${dataHeaders.female80_84},${dataHeaders.female85_over},NAME&for=county:*&in=state:${targetState}&key=${dataHeaders.key}`,
        method:'GET'
    }).then((response) => {
        // console.log(response.data)
        return response.data
    })
}

//___________________2010 Population Density____________________
vm.getPopulationPerSquareMileForUS = () => {
    return $http({
        // This URL will return area in square meters
        url: `https://api.census.gov/data/2010/sf1?get=${dataHeaders.totalPop},AREALAND,NAME&for=state:${state.all}&key=${dataHeaders.key}`,
        method: `GET`
    }).then((response) => {
        let returnArray = [];
        // To convert meters to square miles, divide by 2,589,988
        const squareMetersInSquareMiles = 2589988;
        for(let i = 0; i < response.data.length; i++){
            // If the data value is a number (IE, it's not in the header)
            if(!isNaN(parseInt(response.data[i][0]))) {
                // Convert it to square miles
                let areaInSquareMiles = response.data[i][1] / squareMetersInSquareMiles;
                
                let popPerSquareMile = response.data[i][0] / areaInSquareMiles;
                // console.log(`Area of ${response.data[i][2]} is ${areaInSquareMiles} and population per square mile is ${popPerSquareMile}`);
                returnArray.push([popPerSquareMile, response.data[i][2], response.data[i][3]]);
            }
        }
        return returnArray;
    });
}

vm.getPopulationPerSquareMileForState2010 = (targetState) => {
    return $http({
        url: `https://api.census.gov/data/2010/sf1?get=${dataHeaders.totalPop},AREALAND,NAME&for=county:*&in=state:${targetState}&key=${dataHeaders.key}`,
        method: `GET`
    }).then((response) => {
        let returnArray = [];
        // To convert meters to square miles, divide by 2,589,988
        const squareMetersInSquareMiles = 2589988;
        for(let i = 0; i < response.data.length; i++){
            // If the data value is a number (IE, it's not in the header)
            if(!isNaN(parseInt(response.data[i][0]))) {
                // Convert it to square miles
                let areaInSquareMiles = response.data[i][1] / squareMetersInSquareMiles;
                
                let popPerSquareMile = response.data[i][0] / areaInSquareMiles;
                // console.log(`Area of ${response.data[i][2]} is ${areaInSquareMiles} and population per square mile is ${popPerSquareMile}`);
                returnArray.push([popPerSquareMile, response.data[i][2], response.data[i][3], response.data[i][4]]);
            }
        }
        // console.log(returnArray);
        return returnArray;
    });

}
// This currently returns an object with the name, totalpop, 
vm.getDataForState2010 = (targetState) => {
    return $http({
        url: `https://api.census.gov/data/2010/sf1?get=${dataHeaders.totalPop},AREALAND,NAME&for=state:${targetState}&key=${dataHeaders.key}`,
        method: `GET`
    }).then((response) => {
        // console.log(response.data);
        const squareMetersInSquareMiles = 2589988;
        let data = {
            areaName: response.data[1][2],
            totalPop: response.data[1][0],
            landSizeAreaInMiles: response.data[1][1] / squareMetersInSquareMiles,
            popPerSM: response.data[1][0] * squareMetersInSquareMiles / response.data[1][1]
        }
        return data;
    });
}

//___________________2000 populations _________________________________


vm.getStatePopulation00 = () => {
    return $http({
        url:`https://api.census.gov/data/2000/sf1?get=${dataHeaders.totalPop00},NAME&for=state:${state.all}&key=${dataHeaders.key}`,
        method: 'GET'
    }).then((response) => {
        // console.log(response.data);
        return response.data;
    });
};

vm.getCountyPopulationForState00 = (targetState) => {
    return $http({
        url: `https://api.census.gov/data/2000/sf1?get=${dataHeaders.totalPop00},NAME&for=county:*&in=state:${targetState}&key=${dataHeaders.key}`,
        method: 'GET'
    }).then((response) => {
        // console.log(response.data);
        return response.data;
    });
};
//_____________2000 Getting populatations based on race by state__________________ 
vm.getStatePopRace00 = () => {
    return $http({
        // url:`https://api.census.gov/data/2000/sf1?get=${dataHeaders.white00},${dataHeaders.black00},${dataHeaders.americanIndian00},${dataHeaders.asian00},${dataHeaders.other00},${dataHeaders.hawaiian00},${dataHeaders.multiple00},NAME&for=state:${state.all}&key=a8ed8e7175e0f6f1c379233a5f3020105c645e2b`,
        url:`https://api.census.gov/data/2000/sf1?get=${dataHeaders.white00},${dataHeaders.totalPopRace00},NAME&for=state:${state.all}&key=a8ed8e7175e0f6f1c379233a5f3020105c645e2b`,
        method:'GET'
    }).then((response) => {
        console.log(response.data);
        return response.data;
    })
}
//_____________2000 Getting populatations based on race by county__________________ 
vm.getCountyPopRace00 = (targetState) => {
    return $http({
        // url:`https://api.census.gov/data/2000/sf1?get=${dataHeaders.white00},${dataHeaders.black00},${dataHeaders.americanIndian00},${dataHeaders.asian00},${dataHeaders.other00},${dataHeaders.hawaiian00},${dataHeaders.multiple00},NAME&for=county:*&in=state:${targetState}&key=a8ed8e7175e0f6f1c379233a5f3020105c645e2b`,
        url:`https://api.census.gov/data/2000/sf1?get=${dataHeaders.white00},${dataHeaders.totalPopRace00},NAME&for=county:*&in=state:${targetState}&key=a8ed8e7175e0f6f1c379233a5f3020105c645e2b`,
        method:'GET'
    }).then((response) => {
        console.log(response.data)
        return response.data
    })
}
//_____________2000 Getting age based on state__________________ 
vm.getStatePopAge00 = () => {
    return $http({
        url: `https://api.census.gov/data/2000/sf1?get=${dataHeaders.maleUnder5_00},${dataHeaders.male5_9_00},${dataHeaders.male10_14_00},${dataHeaders.male15_17_00},${dataHeaders.male18_19_00},${dataHeaders.male20_00},${dataHeaders.male21_00},${dataHeaders.male22_24_00},${dataHeaders.male25_29_00},${dataHeaders.male30_34_00},${dataHeaders.male35_39_00},${dataHeaders.male40_44_00},${dataHeaders.male45_49_00},${dataHeaders.male50_54_00},${dataHeaders.male55_59_00},${dataHeaders.male60_61_00},${dataHeaders.male62_64_00},${dataHeaders.male65_66_00},${dataHeaders.male67_69_00},${dataHeaders.male70_74_00},${dataHeaders.male75_79_00},${dataHeaders.male80_84_00},${dataHeaders.male21_00},${dataHeaders.male85_over_00},${dataHeaders.femaleUnder5_00},${dataHeaders.female5_9_00},${dataHeaders.female10_14_00},${dataHeaders.female15_17_00},${dataHeaders.female18_19_00},${dataHeaders.female20_00},${dataHeaders.female21_00},${dataHeaders.female22_24_00},${dataHeaders.female25_29_00},${dataHeaders.female30_34_00},${dataHeaders.female35_39_00},${dataHeaders.female40_44_00},${dataHeaders.female45_49_00},${dataHeaders.female50_54_00},${dataHeaders.female55_59_00},${dataHeaders.female60_61_00},${dataHeaders.female62_64_00},${dataHeaders.female65_66_00},${dataHeaders.female67_69_00},${dataHeaders.female70_74_00},${dataHeaders.female75_79_00},${dataHeaders.female80_84_00},${dataHeaders.female85_over_00},NAME&for=state:${state.all}&key=a8ed8e7175e0f6f1c379233a5f3020105c645e2b`,
        method:'GET'
    }).then((response) => {
        // console.log(response.data);
        return response.data
    })
}
//_____________2000 Getting age based on county__________________ 
vm.getCountyPopAge00 = (targetState) => {
    return $http({
        // url: `https://api.census.gov/data/2000/sf1?get=${dataHeaders.maleUnder5_00},${dataHeaders.male5_9_00},${dataHeaders.male10_14_00},${dataHeaders.male15_17_00},${dataHeaders.male18_19_00},${dataHeaders.male20_00},${dataHeaders.male21_00},${dataHeaders.male22_24_00},${dataHeaders.male25_29_00},${dataHeaders.male30_34_00},${dataHeaders.male35_39_00},${dataHeaders.male40_44_00},${dataHeaders.male45_49_00},${dataHeaders.male50_54_00},${dataHeaders.male55_59_00},${dataHeaders.male60_61_00},${dataHeaders.male62_64_00},${dataHeaders.male65_66_00},${dataHeaders.male67_69_00},${dataHeaders.male70_74_00},${dataHeaders.male75_79_00},${dataHeaders.male80_84_00},${dataHeaders.male21_00},${dataHeaders.male85_over_00},${dataHeaders.femaleUnder5_00},${dataHeaders.female5_9_00},${dataHeaders.female10_14_00},${dataHeaders.female15_17_00},${dataHeaders.female18_19_00},${dataHeaders.female20_00},${dataHeaders.female21_00},${dataHeaders.female22_24_00},${dataHeaders.female25_29_00},${dataHeaders.female30_34_00},${dataHeaders.female35_39_00},${dataHeaders.female40_44_00},${dataHeaders.female45_49_00},${dataHeaders.female50_54_00},${dataHeaders.female55_59},${dataHeaders.female60_61_00},${dataHeaders.female62_64_00},${dataHeaders.female65_66_00},${dataHeaders.female67_69_00}${dataHeaders.female70_74_00},${dataHeaders.female75_79_00},${dataHeaders.female80_84_00},${dataHeaders.female85_over_00},NAME&for=*&in=state:${targetState}&key=a8ed8e7175e0f6f1c379233a5f3020105c645e2b`,
        url: `https://api.census.gov/data/2000/sf1?get=${dataHeaders.maleUnder5_00},${dataHeaders.male5_9_00},${dataHeaders.male10_14_00},${dataHeaders.male15_17_00},${dataHeaders.male18_19_00},${dataHeaders.male20_00},${dataHeaders.male21_00},${dataHeaders.male22_24_00},${dataHeaders.male25_29_00},${dataHeaders.male30_34_00},${dataHeaders.male35_39_00},${dataHeaders.male40_44_00},${dataHeaders.male45_49_00},${dataHeaders.male50_54_00},${dataHeaders.male55_59_00},${dataHeaders.male60_61_00},${dataHeaders.male62_64_00},${dataHeaders.male65_66_00},${dataHeaders.male67_69_00},${dataHeaders.male70_74_00},${dataHeaders.male75_79_00},${dataHeaders.male80_84_00},${dataHeaders.male21_00},${dataHeaders.male85_over_00},${dataHeaders.femaleUnder5_00},${dataHeaders.female5_9_00},${dataHeaders.female10_14_00},${dataHeaders.female15_17_00},${dataHeaders.female18_19_00},${dataHeaders.female20_00},${dataHeaders.female21_00},${dataHeaders.female22_24_00},${dataHeaders.female25_29_00},${dataHeaders.female30_34_00},${dataHeaders.female35_39_00},${dataHeaders.female40_44_00},${dataHeaders.female45_49_00},${dataHeaders.female50_54_00},${dataHeaders.female55_59_00},${dataHeaders.female60_61_00},${dataHeaders.female62_64_00},${dataHeaders.female65_66_00},${dataHeaders.female67_69_00},${dataHeaders.female70_74_00},${dataHeaders.female75_79_00},${dataHeaders.female80_84_00},${dataHeaders.female85_over_00},NAME&for=county:*&in=state:${targetState}&key=${dataHeaders.key}`,
        method:'GET'
    }).then((response) => {
        // console.log(response.data)
        return response.data
    })
}

vm.getPopulationPerSquareMileForUS2000 = () => {
    return $http({
        // This URL will return area in square meters
        url: `https://api.census.gov/data/2000/sf1?get=${dataHeaders.totalPop00},AREALAND,NAME&for=state:${state.all}&key=${dataHeaders.key}`,
        method: `GET`
    }).then((response) => {
        let returnArray = [];
        // To convert meters to square miles, divide by 2,589,988
        const squareMetersInSquareMiles = 2589988;
        for(let i = 0; i < response.data.length; i++){
            // If the data value is a number (IE, it's not in the header)
            if(!isNaN(parseInt(response.data[i][0]))) {
                // Convert it to square miles
                let areaInSquareMiles = response.data[i][1] / squareMetersInSquareMiles;
                
                let popPerSquareMile = response.data[i][0] / areaInSquareMiles;
                // console.log(`Area of ${response.data[i][2]} is ${areaInSquareMiles} and population per square mile is ${popPerSquareMile}`);
                returnArray.push([popPerSquareMile, response.data[i][2], response.data[i][3]]);
            }
        }
        return returnArray;
    });
}

vm.getPopulationPerSquareMileForState2000 = (targetState) => {
    return $http({
        url: `https://api.census.gov/data/2000/sf1?get=${dataHeaders.totalPop00},AREALAND,NAME&for=county:*&in=state:${targetState}&key=${dataHeaders.key}`,
        method: `GET`
    }).then((response) => {
        let returnArray = [];
        // To convert meters to square miles, divide by 2,589,988
        const squareMetersInSquareMiles = 2589988;
        for(let i = 0; i < response.data.length; i++){
            // If the data value is a number (IE, it's not in the header)
            if(!isNaN(parseInt(response.data[i][0]))) {
                // Convert it to square miles
                let areaInSquareMiles = response.data[i][1] / squareMetersInSquareMiles;
                
                let popPerSquareMile = response.data[i][0] / areaInSquareMiles;
                // console.log(`Area of ${response.data[i][2]} is ${areaInSquareMiles} and population per square mile is ${popPerSquareMile}`);
                returnArray.push([popPerSquareMile, response.data[i][2], response.data[i][3], response.data[i][4]]);
            }
        }
        // console.log(returnArray);
        return returnArray;
    });

}


//___________________1990 populations _________________________________
vm.getStatePopulation90 = () => {
    return $http({
        url: `https://api.census.gov/data/1990/sf1?get=${dataHeaders.totalPop90},ANPSADPI&for=state:${state.all}&key=${dataHeaders.key}`,
        method: 'GET'
    }).then((response) => {
        // console.log(response.data);
        return response.data;
    });
};

vm.getCountyPopulationForState90 = (targetState) => {
    return $http({
        url: `https://api.census.gov/data/1990/sf1?get=${dataHeaders.totalPop90},ANPSADPI&for=county:*&in=state:${targetState}&key=${dataHeaders.key}`,
        method: 'GET'
    }).then((response) => {
        // console.log(response.data);
        return response.data;
    });
};

//_____________1990 Getting populatations based on race by state__________________ 
vm.getStatePopRace90 = () => {
    return $http({
        // url:`https://api.census.gov/data/1990/sf1?get=${dataHeaders.white90},${dataHeaders.black90},${dataHeaders.americanIndian90},${dataHeaders.asian90},${dataHeaders.other90},${dataHeaders.hawaiian90},ANPSADPI&for=state:${state.all}&key=a8ed8e7175e0f6f1c379233a5f3020105c645e2b`,
        url:`https://api.census.gov/data/1990/sf1?get=${dataHeaders.white90},${dataHeaders.totalPopRace90},ANPSADPI&for=state:${state.all}&key=a8ed8e7175e0f6f1c379233a5f3020105c645e2b`,
        method:'GET'
    }).then((response) => {
        // console.log(response.data);
        return response.data
    })
}
//_____________1990 Getting populatations based on race by county__________________ 
vm.getCountyPopRace90 = (targetState) => {
    return $http({
        // url:`https://api.census.gov/data/1990/sf1?get=${dataHeaders.white90},${dataHeaders.black90},${dataHeaders.americanIndian90},${dataHeaders.asian90},${dataHeaders.other90},${dataHeaders.hawaiian90},ANPSADPI&for=county:*&in=state:${targetState}&key=a8ed8e7175e0f6f1c379233a5f3020105c645e2b`,
        url:`https://api.census.gov/data/1990/sf1?get=${dataHeaders.white90},${dataHeaders.totalPopRace90},ANPSADPI&for=county:*&in=state:${targetState}&key=a8ed8e7175e0f6f1c379233a5f3020105c645e2b`,
        method:'GET'
    }).then((response) => {
        // console.log(response.data)
        return response.data
    })
}
//_____________1990 Getting age based on state__________________ 

vm.getStatePopAge90 = () => {
    return $http({
        url: `https://api.census.gov/data/1990/sf1?get=${dataHeaders.under1_90},${dataHeaders.a1_2_90},${dataHeaders.a3_4_90},${dataHeaders.a5_90},${dataHeaders.a6_90},${dataHeaders.a7_9_90},${dataHeaders.a10_11_90},${dataHeaders.a12_13_90},${dataHeaders.a14_90},${dataHeaders.a15_90},${dataHeaders.a16_90},${dataHeaders.a17_90},${dataHeaders.a18_90},${dataHeaders.a19_90},${dataHeaders.a20_90},${dataHeaders.a21_90},${dataHeaders.a22_24_90},${dataHeaders.a25_29_90},${dataHeaders.a30_34},${dataHeaders.a35_39_90},${dataHeaders.a40_44_90},${dataHeaders.a45_49_90},${dataHeaders.a50_54_90},${dataHeaders.a55_59_90},${dataHeaders.a60_61_90},${dataHeaders.a62_64_90},${dataHeaders.a65_69_90},${dataHeaders.a70_74_90},${dataHeaders.a75_79_90},${dataHeaders.a80_84_90},${dataHeaders.a_over_85_90},ANPSADPI&for=state:${state.all}&key=a8ed8e7175e0f6f1c379233a5f3020105c645e2b`,
        method:'GET'
    }).then((response) => {
        // console.log(response.data);
        return response.data
    });
}
//_____________1990 Getting age based on county__________________ 
    vm.getCountyPopAge90 = (targetState) => {
        return $http({
            url: `https://api.census.gov/data/1990/sf1?get=${dataHeaders.under1_90},${dataHeaders.a1_2_90},${dataHeaders.a3_4_90},${dataHeaders.a5_90},${dataHeaders.a6_90},${dataHeaders.a7_9_90},${dataHeaders.a10_11_90},${dataHeaders.a12_13_90},${dataHeaders.a14_90},${dataHeaders.a15_90},${dataHeaders.a16_90},${dataHeaders.a17_90},${dataHeaders.a18_90},${dataHeaders.a19_90},${dataHeaders.a20_90},${dataHeaders.a21_90},${dataHeaders.a22_24_90},${dataHeaders.a25_29_90},${dataHeaders.a30_34},${dataHeaders.a35_39_90},${dataHeaders.a40_44_90},${dataHeaders.a45_49_90},${dataHeaders.a50_54_90},${dataHeaders.a55_59_90},${dataHeaders.a60_61_90},${dataHeaders.a62_64_90},${dataHeaders.a65_69_90},${dataHeaders.a70_74_90},${dataHeaders.a75_79_90},${dataHeaders.a80_84_90},${dataHeaders.a_over_85_90},ANPSADPI&for=county:*&in=state:${targetState}&key=a8ed8e7175e0f6f1c379233a5f3020105c645e2b`,
            method:'GET'
        }).then((response) => {
            // console.log(response.data)
            return response.data
        });
    }
    vm.getPopulationPerSquareMileForUS1990 = () => {
        return $http({
            // This URL will return area in square meters
            url: `https://api.census.gov/data/1990/sf1?get=${dataHeaders.totalPop90},AREALAND,ANPSADPI&for=state:${state.all}&key=${dataHeaders.key}`,
            method: `GET`
        }).then((response) => {
            let returnArray = [];
            // To convert meters to square miles, divide by 2,589,988
            const squareMetersInSquareMiles = 2589.988;
            for(let i = 0; i < response.data.length; i++){
                // If the data value is a number (IE, it's not in the header)
                if(!isNaN(parseInt(response.data[i][0]))) {
                    // Convert it to square miles
                    let areaInSquareMiles = response.data[i][1] / squareMetersInSquareMiles;
                    
                    let popPerSquareMile = response.data[i][0] / areaInSquareMiles;
                    // console.log(`Area of ${response.data[i][2]} is ${areaInSquareMiles} and population per square mile is ${popPerSquareMile}`);
                    returnArray.push([popPerSquareMile, response.data[i][2], response.data[i][3]]);
                }
            }
            return returnArray;
        });
    }
    vm.getPopulationPerSquareMileForState1990 = (targetState) => {
        return $http({
            url: `https://api.census.gov/data/1990/sf1?get=${dataHeaders.totalPop90},AREALAND,ANPSADPI&for=county:*&in=state:${targetState}&key=${dataHeaders.key}`,
            method: `GET`
        }).then((response) => {
            let returnArray = [];
            // To convert meters to square miles, divide by 2,589,988
            const squareMetersInSquareMiles = 2589.988;
            for(let i = 0; i < response.data.length; i++){
                // If the data value is a number (IE, it's not in the header)
                if(!isNaN(parseInt(response.data[i][0]))) {
                    // Convert it to square miles
                    let areaInSquareMiles = response.data[i][1] / squareMetersInSquareMiles;
                    
                    let popPerSquareMile = response.data[i][0] / areaInSquareMiles;
                    // console.log(`Area of ${response.data[i][2]} is ${areaInSquareMiles} and population per square mile is ${popPerSquareMile}`);
                    returnArray.push([popPerSquareMile, response.data[i][2], response.data[i][3], response.data[i][4]]);
                }
            }
            // console.log(returnArray);
            return returnArray;
        });

    }


}

angular.module("App").service("CensusDataService", CensusDataService);