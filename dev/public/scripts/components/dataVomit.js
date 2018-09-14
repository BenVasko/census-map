'use strict';

const data = {
    templateUrl: `scripts/components/dataVomit.html`,
    controller: ["CensusDataService","ColorService","AgeService","AgeService90", "DropdownDataService", "DiversityService", function(CensusDataService, ColorService, AgeService, AgeService90, DropdownDataService, DiversityService) {
        const vm = this;
        vm.legendTitle = "";
        vm.datas;
        vm.dataMode = 1;
        vm.stateID = null;
        // selecting the back button
        vm.button = angular.element(document.getElementById("back-button"));
        vm.dataType = DropdownDataService.dataType;
        vm.listOfStates = DropdownDataService.listOfStates;

        // the function that will append script tags for state maps to index
        vm.appendStateScripts = () => {
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
        // vm.getAgeData2010();

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
        // vm.getAgeData1990();
    

        // taz added functionality for dropdown select to call API
        vm.getCensusData = function(API){
            console.log(API);
            vm.dataMode = parseInt(API.value);
            vm.chooseDisplay();
        };

        // functionality for the slider
        vm.chooseYear = (year) => {
            vm.year = year;
            if (year === 1990) {
                console.log("YOU HAVE SELECTED 1990");
                vm.chooseDisplay();
            } else if (year === 2000) {
                console.log("YOU HAVE SELECTED 2000");
                vm.chooseDisplay();
            } else if (year === 2010) {
                console.log("YOU HAVE SELECTED 2010");
                vm.getAgeData2010();
                vm.chooseDisplay();
            }
        }

        // selecting a state in mobile and tablet will show that map
        vm.selectStateMap = (ID) => {
            if (ID !== null) {
                vm.stateID = ID
                document.getElementById("map-scripts").innerHTML = "";
                vm.button.removeClass("ng-hide");
                vm.appendStateScripts();
                ID = null;
            }
        }

        // when you click on the map
        document.getElementById("map").addEventListener("click", (e) => {
            // Check if we're in a state
            if(vm.stateID===null){
                document.getElementById("map-scripts").innerHTML = "";
                // remove class of "ng-hide" so button will display
                vm.button.removeClass("ng-hide");
                // checking to see if you clicked on a state object
                if (angular.element(e.target).attr("class")){
                    vm.stateID = (angular.element(e.target).attr("class").slice(-2));
                    vm.appendStateScripts();
                } else if (e.target.innerHTML) {
                    vm.stateID = e.target.innerHTML;
                    vm.appendStateScripts();
                }
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

        vm.getPopPerSM = (year) => {
            CensusDataService.getPopulationPerSquareMileForUS().then((response) => {
                ColorService.getColors(response);
            });
        };

        vm.getPopPerSM2000 = (year) => {
            CensusDataService.getPopulationPerSquareMileForUS2000().then((response) => {
                ColorService.getColors(response);
            });
        };

        vm.getPop1990 = () => {
            // Get for country if it's null
            if(vm.stateID === null) {
                CensusDataService.getStatePopulation90().then((response) => {
                    ColorService.getColors(response);
                });
            }
            // Get for state
            else {
                CensusDataService.getCountyPopulationForState90(vm.stateID).then((response) => {
                    ColorService.getColorsForCounties(response);
                });
            }
        };

        vm.getPopDensity1990 = () => {
            if(vm.stateID === null) {
                CensusDataService.getPopulationPerSquareMileForUS1990().then((response) => {
                    ColorService.getColors(response);
                });
            } else {

            }
        }

        vm.getPopPerSMForState = (year, stateID) => {
            console.log("NOT YET FINISHED!!!!")
        }

        vm.chooseDisplay = () => {
            if(vm.year===1990) {
                // 1990 API PULLS
                if(vm.dataMode === 1){
                    if(!vm.stateID){
                        vm.getPop1990();
                    } else {

                    }
                } else if (vm.dataMode === 2) {
                    if(!vm.stateID){
                        vm.getAgeData1990();
                    } else {
                        
                    }

                } else if (vm.dataMode === 3) {
                    if(!vm.stateID){
                        vm.getAgeData1990();
                    } else {
                        
                    }

                } else if (vm.dataMode === 4) {
                    if(!vm.stateID){
                        vm.getPopDensity1990();
                    } else {
                        
                    }

                }
            } else if (vm.year === 2000) {
                // 2000 API PULLS
                if(vm.dataMode === 1){
                    
                } else if (vm.dataMode === 2) {
                    CensusDataService.getStatePopRace00().then((response) => {
                        ColorService.getColors(response)
                    })

                } else if (vm.dataMode === 3) {

                } else if (vm.dataMode === 4) {
                    vm.legendTitle = "POPULATION PER SQUARE MILE";
                    if(!vm.stateID) {
                        vm.getPopPerSM2000();
                    } else {
                        vm.getPopPerSMForState(2000, vm.stateID);
                    }
                }
            } else {
                // 2010 API PULLS
                if(vm.dataMode === 1){
                    vm.legendTitle = "POPULATION";
                    if(!vm.stateID)
                    {
                        vm.getData();
                    } else {
                        vm.getPopulationDataForState(vm.stateID);
                    }
                } else if (vm.dataMode === 2) {
                    vm.legendTitle = "DIVERSITY: NOT IMPLEMENTED";
                    if(!vm.stateID) {
                        vm.getAgeData2010();
                    } else {
                        vm.getAgeDataForState(vm.stateID);
                    }    
                } else if (vm.dataMode === 3) {
                    vm.legendTitle = "AVERAGE AGE";
                    if(!vm.stateID) {
                        vm.getAgeData2010();
                    } else {
                        vm.getAgeDataForState(vm.stateID);
                    }
                } else if (vm.dataMode === 4) {
                    vm.legendTitle = "POPULATION PER SQUARE MILE";
                    if(!vm.stateID) {
                        vm.getPopPerSM();
                    } else {
                        vm.getPopPerSMForState(vm.stateID);
                    }
                }
            }
        }
    }]
};

angular.module('App').component("data", data);
