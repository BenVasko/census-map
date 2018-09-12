'use strict';

const data = {
    templateUrl: `scripts/components/dataVomit.html`,
    controller: ["CensusDataService","ColorService","AgeService","AgeService90", function(CensusDataService, ColorService, AgeService, AgeService90) {
        const vm = this;
        vm.legendTitle = "";
        vm.datas;
        vm.dataMode = 1;
        vm.stateID = null;
        // selecting the back button
        vm.button = angular.element(document.getElementsByTagName("button"));

        vm.getData = () => {
            CensusDataService.getStatePopulation().then((response)=> {
                vm.datas = response;
                ColorService.getColors(vm.datas);
                vm.total = 0;
                vm.legendTitle = "POPULATION IN MILLIONS";
                for(let i = 1; i < vm.datas.length; i++) {
                    vm.total += parseInt(vm.datas[i][0]);
                }
            });   
        };

        vm.getData();

        vm.getAgeData2010 = () => {
            CensusDataService.getStatePopAge().then((response)=>{
                vm.datas=response;

                vm.datas=AgeService.calculateAvgAge(vm.datas);
                console.log("State by age 2010: " + vm.datas);

                ColorService.getColors(vm.datas);
            });
        
        };
        vm.getAgeData2010();
      
  

        vm.getAgeData1990 = () => {           
            CensusDataService.getStatePopAge90().then((response)=>{
                vm.datas=response;
                console.log("Response is: ");
                console.log(vm.datas);
                vm.datas=AgeService90.calculateAvgAge(vm.datas);
                console.log("State by age 1990: " + vm.datas);
                ColorService.getColors(vm.datas);
            });
        }
        vm.getAgeData1990();
    

        // taz added functionality for dropdown select to call API
        vm.getCensusData = function(API){
            console.log(API);
            vm.dataMode = parseInt(API);
            if (vm.dataMode === 1) {
                // If we're in US mode
                if(!vm.stateID)
                {
                    vm.getData();
                    console.log(vm.datas);
                }
                // If we're in state mode, get the state data for the current state
                // Current State => vm.stateID
                else
                {
                    console.log(vm.stateID);
                    vm.getPopulationDataForState(vm.stateID);
                    console.log(vm.datas);
                }

            }
            if (vm.dataMode === 2) {
                vm.getAgeData2010();
                vm.legendTitle = "RACE DATA (BUT REALLY IT'S AGE DATA)";
                console.log('selected 2')
            }
            if (vm.dataMode === 3) {
                if(!vm.stateID) {
                    vm.getAgeData2010();
                    vm.legendTitle = "AVERAGE AGE";
                    console.log('selected 3');
                } else {
                    vm.getAgeDataForState(vm.stateID);
                }
            }
            if (vm.dataMode == 4) {
                if(!vm.stateID) {
                    vm.getPopPerSM();
                } else {
                    vm.getPopPerSMForState(vm.stateID);
                }
            }

        };

        // when you click on the map
        document.getElementById("map").addEventListener("click", (e) => {
            document.getElementById("map-scripts").innerHTML = "";
            // remove class of "ng-hide" so button will display
            vm.button.removeClass("ng-hide");
            // checking to see if you clicked on a state object
            // Check if we're in a state
            if(vm.stateID===null){
                if (angular.element(e.target).attr("class")){
                    vm.stateID = (angular.element(e.target).attr("class").slice(-2));
                } else if (e.target.innerHTML) {
                    vm.stateID = e.target.innerHTML;
                }
                let state1 = document.createElement("script");
                    state1.type = "text/javascript";
                    state1.src = `scripts/states/${vm.stateID}/mapdata.js`
                    state1.innerHTML = null;
                    document.getElementById("map-scripts").innerHTML = "";
                    document.getElementById("map-scripts").appendChild(state1);
                let state2 = document.createElement("script");
                    state2.type = "text/javascript";
                    state2.src = `scripts/states/${vm.stateID}/statemap.js`;
                    state2.innerHTML = null;
                    document.getElementById("map-scripts").appendChild(state2);

                vm.getCensusData(vm.dataMode);
            }
        });

        vm.hideButton = () => {
            document.getElementById("map-scripts").innerHTML = "";
            // add class of "ng-hide" again so button will be hidden
            vm.button.addClass("ng-hide");
            // Since we're going back, clear vm.stateID
            vm.stateID = null;

            let us1 = document.createElement("script");
                us1.type = "text/javascript";
                us1.src = `scripts/us-map/us-map-by-state/mapdata.js`
                us1.innerHTML = null;
                document.getElementById("map-scripts").appendChild(us1);
            let us2 = document.createElement("script");
                us2.type = "text/javascript";
                us2.src = `scripts/us-map/us-map-by-state/usmap.js`;
                us2.innerHTML = null;
                document.getElementById("map-scripts").appendChild(us2);

            vm.getCensusData(vm.dataMode);
        }

        vm.getPopulationDataForState = (stateID) => {
            let stateName = simplemaps_usmap_mapdata.state_specific[stateID].name;
            console.log(stateName);
            let censusStateID = CensusDataService.convertStateNameToCensusID(stateName);
            console.log(censusStateID);
            CensusDataService.getCountyPopulationForState(censusStateID).then((response) => {
                vm.datas = response;
                ColorService.getColorsForCounties(vm.datas);
            });
        };

        vm.getAgeDataForState = (stateID) => {
            let stateName = simplemaps_usmap_mapdata.state_specific[stateID].name;
            console.log(stateName);
            let censusStateID = CensusDataService.convertStateNameToCensusID(stateName);
            console.log(censusStateID);
            CensusDataService.getCountyPopAge(censusStateID).then((response) => {
                vm.datas = response;
                vm.datas = AgeService.calculateAvgAge(vm.datas, false);
                ColorService.getColorsForCounties(vm.datas);
            });
        }

        vm.getPopPerSM = () => {
            CensusDataService.getPopulationPerSquareMileForUS().then((response) => {
                ColorService.getColors(response);
            });
        }
    }]
};

angular.module('App').component("data", data);