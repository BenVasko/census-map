'use strict';

const data = {
    templateUrl: `scripts/components/dataVomit.html`,

    controller: ["CensusDataService","ColorService","AgeService","AgeService90", "DropdownDataService", "CountyNameService", function(CensusDataService, ColorService, AgeService, AgeService90, DropdownDataService, CountyNameService, DiversityService) {
        const vm = this;
        vm.legendTitle = "";
        vm.datas;
        vm.dataMode = 1;
        vm.year = 2000;
        vm.stateID = null;
        // selecting the back button
        vm.button = angular.element(document.getElementById("back-button"));
        vm.dataType = DropdownDataService.dataType;
        vm.listOfStates = DropdownDataService.listOfStates;
        vm.legend;

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
            vm.chooseDisplay();
        }

        vm.getData = () => {
            CensusDataService.getStatePopulation().then((response)=> {
                vm.datas = response;

                vm.legend = ColorService.getColors(vm.datas); 

                vm.total = 0;
                // vm.legendTitle = "POPULATION IN MILLIONS";
                for(let i = 1; i < vm.datas.length; i++) {
                    vm.total += parseInt(vm.datas[i][0]);
                }
            });   
        };

        vm.getPopulation2000 = () => {
            if(!vm.stateID) {
                // Get population for US
                CensusDataService.getStatePopulation00().then((response) => {
                    vm.datas = response;
                    vm.legend = ColorService.getColors(vm.datas); // ColorService.getColors returns the numbers to go in the legend.
                    vm.total = 0;
                    // vm.legendTitle = "POPULATION IN MILLIONS";
                    for(let i = 1; i < vm.datas.length; i++) {
                        vm.total += parseInt(vm.datas[i][0]);
                    }    
                });
            } else {
                // console.log("Called for a specific state " + vm.stateID);
                let censusStateID = vm.convertStateIDtoCode(vm.stateID);
                CensusDataService.getCountyPopulationForState00(censusStateID).then((response) => {
                    vm.datas = response;
                    vm.legend = ColorService.getColorsForCounties(vm.datas);
                });

            }
        }


        vm.getAgeData2010 = () => {
            CensusDataService.getStatePopAge().then((response)=>{
                vm.datas=response;

                vm.datas=AgeService.calculateAvgAge(vm.datas);
                // console.log("State by age 2010: " + vm.datas);

                vm.legend = ColorService.getColors(vm.datas);
            });
        
        };

        vm.getAgeData2000 = () => {
            if(!vm.stateID){
                CensusDataService.getStatePopAge00().then((response)=>{
                    vm.datas=response;

                    vm.datas=AgeService.calculateAvgAge(vm.datas);
                    // console.log("State by age 2000: " + vm.datas);

                    vm.legend = ColorService.getColors(vm.datas);
                });
            } else {
                let censusStateID = vm.convertStateIDtoCode(vm.stateID);
                CensusDataService.getCountyPopAge00(censusStateID).then((response)=> {
                    vm.datas = response;
                    vm.datas = AgeService.calculateAvgAge(vm.datas, false);
                    vm.legend = ColorService.getColorsForCounties(vm.datas);
                });
            }
        };

        vm.getAgeData1990 = () => {
            if(!vm.stateID) {         
                CensusDataService.getStatePopAge90().then((response)=>{
                    vm.datas=response;
                    // console.log("Response is: ");
                    // console.log(vm.datas);
                    vm.datas=AgeService90.calculateAvgAge(vm.datas, true);
                    // console.log("State by age 1990: " + vm.datas);
                    vm.legend = ColorService.getColors(vm.datas);
                });
            } else {
                // console.log(`Getting age data for 1990 for ${vm.stateID}`);
                let censusStateID = vm.convertStateIDtoCode(vm.stateID);
                CensusDataService.getCountyPopAge90(censusStateID).then((response) => {
                    vm.datas = response;
                    // console.log(vm.datas);
                    vm.datas = AgeService90.calculateAvgAge(vm.datas, false);
                    vm.legend = ColorService.getColorsForCounties(vm.datas);
                });
            }

        }

        // taz added functionality for dropdown select to call API
        vm.getCensusData = function(API){
            // console.log(API);
            vm.dataMode = parseInt(API.value);
            vm.chooseDisplay();
        };

        // functionality for the slider
        vm.chooseYear = (year) => {
            vm.year = year;
            if (year === 1990) {
                // console.log("YOU HAVE SELECTED 1990");
                vm.chooseDisplay();
            } else if (year === 2000) {
                // console.log("YOU HAVE SELECTED 2000");
                vm.chooseDisplay();
            } else if (year === 2010) {
                // console.log("YOU HAVE SELECTED 2010");
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

                vm.chooseDisplay();
            }

        vm.getPopulationDataForState = (stateID) => {

            let censusStateID = vm.convertStateIDtoCode(stateID);
            CensusDataService.getCountyPopulationForState(censusStateID).then((response) => {
                // console.log(response)
                vm.datas = response;
                vm.legend = ColorService.getColorsForCounties(vm.datas);
            });
        };

        vm.getAgeDataForState = (stateID) => {
            let censusStateID = vm.convertStateIDtoCode(stateID);
            CensusDataService.getCountyPopAge(censusStateID).then((response) => {
                // console.log('called');
                vm.datas = response;
                vm.datas = AgeService.calculateAvgAge(vm.datas, false);
                vm.legend = ColorService.getColorsForCounties(vm.datas);
            });
        }

        vm.getPopPerSM = (year) => {
            CensusDataService.getPopulationPerSquareMileForUS().then((response) => {
                vm.legend = ColorService.getColors(response);
            });
        };

        vm.getPopPerSM2000 = (year) => {
            CensusDataService.getPopulationPerSquareMileForUS2000().then((response) => {
                vm.legend = ColorService.getColors(response);
            });
        };

        vm.getPop1990 = () => {
            // Get for country if it's null
            if(vm.stateID === null) {
                CensusDataService.getStatePopulation90().then((response) => {
                    vm.legend = ColorService.getColors(response);
                });
            }
            // Get for state
            else {
                let stateCode = vm.convertStateIDtoCode(vm.stateID);
                // console.log("Get pop for state");
                CensusDataService.getCountyPopulationForState90(stateCode).then((response) => {
                    vm.legend = ColorService.getColorsForCounties(response);
                });
            }
        };

        vm.getPopDensity1990 = () => {
            if(vm.stateID === null) {
                CensusDataService.getPopulationPerSquareMileForUS1990().then((response) => {
                    vm.legend = ColorService.getColors(response);
                });
            } else {
                // console.log("Get Pop Density 1990");
                let censusStateID = vm.convertStateIDtoCode(vm.stateID);
                CensusDataService.getPopulationPerSquareMileForState1990(censusStateID).then((response) => {
                    vm.legend = ColorService.getColorsForCounties(response);
                });
            }
        }

        vm.getPopPerSMForState = (stateID) => {
            let censusStateID = vm.convertStateIDtoCode(vm.stateID);
            if(vm.year===2010){
                CensusDataService.getPopulationPerSquareMileForState2010(censusStateID).then((response) => {
                    vm.legend = ColorService.getColorsForCounties(response);
                });
            }
            else {
                let censusStateID = vm.convertStateIDtoCode(vm.stateID);
                CensusDataService.getPopulationPerSquareMileForState2000(censusStateID).then((response) => {
                    vm.legend = ColorService.getColorsForCounties(response);
                });

            }

        }

        vm.convertStateIDtoCode = (stateID) => {
            let stateName = simplemaps_usmap_mapdata.state_specific[stateID].name;
            // console.log(stateName);
            let censusStateID = CensusDataService.convertStateNameToCensusID(stateName);
            // console.log(censusStateID);
            return censusStateID;
        }

        vm.chooseDisplay = () => {
            if(vm.year===1990) {
                // 1990 API PULLS
                if(vm.dataMode === 1){
                    vm.legendTitle = "POPULATION";
                    vm.getPop1990();
                } else if (vm.dataMode === 2) {

                    CensusDataService.getStatePopRace90().then((response) => {
                        let diverse = DiversityService.diversityPercent(response);
                        console.log(response);
                        console.log(diverse);
                        ColorService.getColors(diverse);


                })
                } else if (vm.dataMode === 3) {
                    vm.legendTitle = "AVERAGE AGE";
                    vm.getAgeData1990();
                } else if (vm.dataMode === 4) {
                    vm.legendTitle = "POPULATION PER SQUARE MILE";
                    vm.getPopDensity1990();
                }
            } else if (vm.year === 2000) {
                // 2000 API PULLS
                if(vm.dataMode === 1){
                    
                    
                } else if (vm.dataMode === 2) 
                {
                    CensusDataService.getCountyPopRace00().then((response) => {
                        let diverse = DiversityService.diversityPercent(response);
                        console.log(response);
                        console.log(diverse);
                        ColorService.getColors(diverse);
                       
                    })
                } else if (vm.dataMode === 3) {
                    vm.legendTitle = "AVERAGE AGE";
                    vm.getAgeData2000();

                } else if (vm.dataMode === 4) {
                    vm.legendTitle = "POPULATION PER SQUARE MILE";
                    if(!vm.stateID) {
                        vm.getPopPerSM2000();
                    } else {
                        vm.getPopPerSMForState(vm.stateID);
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
                    vm.lengendTitle = "DIVERSITY";
                    CensusDataService.getStatePopRace().then((response) => {
                        let diverse = DiversityService.diversityPercent(response);
                        console.log(response);
                        console.log(diverse);
                        ColorService.getColors(diverse);
                    })
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

        // Default display when loading
        // vm.chooseDisplay(); <-- causes code to fire twice.

        // this is the list of county ids by state from the CountyNameService.js file
        vm.countiesByState = CountyNameService.state;
        console.log(vm.countiesByState);
        

    }]
};

angular.module('App').component("data", data);


