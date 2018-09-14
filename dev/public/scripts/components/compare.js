"use strict";

const compare = {
    templateUrl: `scripts/components/compare.html`,
    controller: ["CensusDataService","ColorService","AgeService","AgeService90", "DropdownDataService", function(CensusDataService, ColorService, AgeService, AgeService90, DropdownDataService) {
        const vm = this;
        vm.listOfStates = DropdownDataService.listOfStates;

        vm.convertStateIDtoCode = (stateID) => {
            let stateName = simplemaps_usmap_mapdata.state_specific[stateID].name;
            console.log(stateName);
            let censusStateID = CensusDataService.convertStateNameToCensusID(stateName);
            console.log(censusStateID);
            return censusStateID;
        }

        vm.getPopulationDataForState = (stateID) => {
            let censusStateID = vm.convertStateIDtoCode(stateID);
            CensusDataService.getCountyPopulationForState(censusStateID).then((response) => {
                vm.datas = response;
                vm.total = 0;
                for(let i = 1; i < vm.datas.length; i++) {
                    vm.total += parseInt(vm.datas[i][0]);
                }
                console.log(`${vm.total} is the population of ${stateID}`)
            });
        };

        





    }]
};

angular.module("App").component("compare", compare);