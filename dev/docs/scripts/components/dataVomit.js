'use strict';

const data = {
    templateUrl: `scripts/components/dataVomit.html`,

    controller: ["CensusDataService","ColorService","AgeService","AgeService90", "DropdownDataService", "CountyNameService", "DiversityService", "CompareService", "$location", function(CensusDataService, ColorService, AgeService, AgeService90, DropdownDataService, CountyNameService, DiversityService, CompareService, $location) {
        const vm = this;
        vm.legendTitle = "";
        vm.datas;
        vm.dataMode = 1;
        vm.year = 2000;
        vm.stateID = null;
        // selecting the back button
        vm.button = angular.element(document.getElementById("back-button"));
        vm.countySearch = angular.element(document.getElementById("county-search"));
        vm.dataType = DropdownDataService.dataType;
        vm.listOfStates = DropdownDataService.listOfStates;
        vm.legend;
        vm.arrayOfArrays = ColorService.arrayOfArrays;
        vm.geographyKeys = ColorService.geographyKeys;

        // the function that will append script tags for state maps to index
        vm.appendStateScripts = () => {
            if(vm.stateID !== null && vm.stateID.length === 2) {
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
            } else {
                vm.hideButton();
            }
        }

        vm.getData = () => {
            CensusDataService.getStatePopulation().then((response)=> {
                vm.datas = response;
                vm.legend = ColorService.getColors(vm.datas)[0]; 

                vm.total = 0;
                // vm.legendTitle = "POPULATION IN MILLIONS";
                for(let i = 1; i < vm.datas.length; i++) {
                    vm.total += parseInt(vm.datas[i][0]);
                }
            });   
        };
        // this is the default api reqeust on page load.
        vm.getPopulation2000 = () => {
            if(!vm.stateID) {
                // Get population for US
                CensusDataService.getStatePopulation00().then((response) => {
                    vm.datas = response;
                    vm.legend = ColorService.getColors(vm.datas)[0]; // ColorService.getColors returns the numbers to go in the legend.
                    // console.log(vm.legend)[0];
                    vm.total = 0;
                    // vm.legendTitle = "POPULATION IN MILLIONS";
                    for(let i = 1; i < vm.datas.length; i++) {
                        vm.total += parseInt(vm.datas[i][0]);
                    }    
                });
            } else {
                let censusStateID = vm.convertStateIDtoCode(vm.stateID);
                CensusDataService.getCountyPopulationForState00(censusStateID).then((response) => {
                    vm.datas = response;
                    vm.legend = ColorService.getColorsForCounties(vm.datas)[0];
                });

            }
        }


        vm.getAgeData2010 = () => {
            CensusDataService.getStatePopAge().then((response)=>{
                vm.datas=response;

                vm.datas=AgeService.calculateAvgAge(vm.datas);

                vm.legend = ColorService.getColors(vm.datas)[0];
            });
        
        };

        vm.getAgeData2000 = () => {
            if(!vm.stateID){
                CensusDataService.getStatePopAge00().then((response)=>{
                    vm.datas=response;

                    vm.datas=AgeService.calculateAvgAge(vm.datas);

                    vm.legend = ColorService.getColors(vm.datas)[0];
                });
            } else {
                let censusStateID = vm.convertStateIDtoCode(vm.stateID);
                CensusDataService.getCountyPopAge00(censusStateID).then((response)=> {
                    vm.datas = response;
                    vm.datas = AgeService.calculateAvgAge(vm.datas, false);
                    vm.legend = ColorService.getColorsForCounties(vm.datas)[0];
                });
            }
        };

        vm.getAgeData1990 = () => {
            if(!vm.stateID) {         
                CensusDataService.getStatePopAge90().then((response)=>{
                    vm.datas=response;
                    vm.datas=AgeService90.calculateAvgAge(vm.datas, true);
                    vm.legend = ColorService.getColors(vm.datas)[0];
                });
            } else {
                let censusStateID = vm.convertStateIDtoCode(vm.stateID);
                CensusDataService.getCountyPopAge90(censusStateID).then((response) => {
                    vm.datas = response;
                    vm.datas = AgeService90.calculateAvgAge(vm.datas, false);
                    vm.legend = ColorService.getColorsForCounties(vm.datas)[0];
                });
            }

        }

        // taz added functionality for dropdown select to call API
        vm.getCensusData = function(API){ 
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
        // document.getElementById("map").addEventListener("click", (e) => {
            $(document).on("click", "path", function(e){
            // Check if we're in a state
            if(vm.stateID===null){
                document.getElementById("map-scripts").innerHTML = "";
                // remove class of "ng-hide" so button will display
                vm.countySearch.removeClass("ng-hide");
                vm.button.removeClass("ng-hide");
                // checking to see if you clicked on a state object

                // if (angular.element(e.target).attr("class")){
                    vm.stateID = (angular.element(e.target).attr("class").slice(-2));
                    console.log(vm.stateID);
                    vm.appendStateScripts();
                // } else if (e.target.innerHTML) {
                //     vm.stateID = e.target.innerHTML;
                //     vm.appendStateScripts();
                // }
            }
        
        });

        // when you click the tspan of the map also
        $(document).on("click", "tspan", function(e){
            // Check if we're in a state
            if(vm.stateID===null){
                document.getElementById("map-scripts").innerHTML = "";
                // remove class of "ng-hide" so button will display
                vm.countySearch.removeClass("ng-hide");
                vm.button.removeClass("ng-hide");
                // checking to see if you clicked on a state object

                // if (angular.element(e.target).attr("class")){
                    // vm.stateID = (angular.element(e.target).innerHTML);
                    vm.stateID = (e.target.innerHTML);
                    vm.appendStateScripts();
                // } else if (e.target.innerHTML) {
                //     vm.stateID = e.target.innerHTML;
                //     vm.appendStateScripts();
                // }
            }
        
        });

        vm.hideButton = () => {
            document.getElementById("map-scripts").innerHTML = "";
            // add class of "ng-hide" again so button will be hidden
            vm.button.addClass("ng-hide");
            vm.countySearch.addClass("ng-hide");
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
            // setTimeout(function(){
                // alert("hey")
                vm.chooseDisplay();
                
            // },200);
            }

        vm.getPopulationDataForState = (stateID) => {

            let censusStateID = vm.convertStateIDtoCode(stateID);
            CensusDataService.getCountyPopulationForState(censusStateID).then((response) => {
                // console.log(response)
                vm.datas = response;
                vm.legend = ColorService.getColorsForCounties(vm.datas)[0];
            });
        };

        vm.getAgeDataForState = (stateID) => {
            let censusStateID = vm.convertStateIDtoCode(stateID);
            CensusDataService.getCountyPopAge(censusStateID).then((response) => {
                vm.datas = response;
                vm.datas = AgeService.calculateAvgAge(vm.datas, false);
                vm.legend = ColorService.getColorsForCounties(vm.datas)[0];
            });
        }

        vm.getPopPerSM = (year) => {
            CensusDataService.getPopulationPerSquareMileForUS().then((response) => {
                vm.datas = response;
                vm.legend = ColorService.getColors(response)[0];
            });
        };

        vm.getPopPerSM2000 = (year) => {
            CensusDataService.getPopulationPerSquareMileForUS2000().then((response) => {
                vm.datas = response;
                vm.legend = ColorService.getColors(response)[0];
            });
        };

        vm.getPop1990 = () => {
            // Get for country if it's null
            if(vm.stateID === null) {
                CensusDataService.getStatePopulation90().then((response) => {
                    vm.datas = response;
                    vm.legend = ColorService.getColors(response)[0];
                });
            }
            // Get for state
            else {
                let stateCode = vm.convertStateIDtoCode(vm.stateID);
                // console.log("Get pop for state");
                CensusDataService.getCountyPopulationForState90(stateCode).then((response) => {
                    vm.datas = response;
                    vm.legend = ColorService.getColorsForCounties(response)[0];
                });
            }
        };

        vm.getPopDensity1990 = () => {
            if(vm.stateID === null) {
                CensusDataService.getPopulationPerSquareMileForUS1990().then((response) => {
                    vm.datas = response;
                    vm.legend = ColorService.getColors(response)[0];
                });
            } else {
                // console.log("Get Pop Density 1990");
                let censusStateID = vm.convertStateIDtoCode(vm.stateID);
                CensusDataService.getPopulationPerSquareMileForState1990(censusStateID).then((response) => {
                    vm.datas = response;
                    vm.legend = ColorService.getColorsForCounties(response)[0];
                });
            }
        }

        vm.getPopPerSMForState = (stateID) => {
            let censusStateID = vm.convertStateIDtoCode(vm.stateID);
            if(vm.year===2010){
                CensusDataService.getPopulationPerSquareMileForState2010(censusStateID).then((response) => {
                    vm.datas = response;
                    vm.legend = ColorService.getColorsForCounties(response)[0];
                });
            }
            else {
                let censusStateID = vm.convertStateIDtoCode(vm.stateID);
                CensusDataService.getPopulationPerSquareMileForState2000(censusStateID).then((response) => {
                    vm.datas = response;
                    vm.legend = ColorService.getColorsForCounties(response)[0];
                });

            }
        }

        vm.getDiversity90 = () => {
            if(vm.stateID === null) {
                CensusDataService.getStatePopRace90().then((response) => {
                    let diverse = DiversityService.diversityPercent(response, true);
                    vm.datas = response;
                    vm.legend = ColorService.getColors(diverse)[0];
                });
            } else {
                let censusStateID = vm.convertStateIDtoCode(vm.stateID);
                CensusDataService.getCountyPopRace90(censusStateID).then((response) => {
                    let diverse = DiversityService.diversityPercent(response, false);
                    vm.datas = response;    
                    vm.legend = ColorService.getColorsForCounties(diverse)[0];
                });
            }
        }

        vm.getDiversity00 = () => {
            if(vm.stateID === null) {
                CensusDataService.getStatePopRace00().then((response) => {
                    let diverse = DiversityService.diversityPercent(response, true);
                    // console.log(diverse);
                    vm.datas = response;
                    vm.legend = ColorService.getColors(diverse)[0];
                    console.log(vm.legend)[0];
                });
            } else {
                let censusStateID = vm.convertStateIDtoCode(vm.stateID);
                CensusDataService.getCountyPopRace00(censusStateID).then((response) => {
                    let diverse = DiversityService.diversityPercent(response, false);
                        // console.log(response);
                        // console.log(diverse);
                        vm.datas = response;
                        vm.legend = ColorService.getColorsForCounties(diverse)[0];
                });
            }
        }

        vm.getDiversity10 = () => {
            if(vm.stateID === null) {
                CensusDataService.getStatePopRace().then((response) => {
                    let diverse = DiversityService.diversityPercent(response, true);
                    vm.datas = response;
                    vm.legend = ColorService.getColors(diverse)[0];
                });
            } else {
                let censusStateID = vm.convertStateIDtoCode(vm.stateID);
                CensusDataService.getCountyPopRace(censusStateID).then((response) => {
                    let diverse = DiversityService.diversityPercent(response, false);
                    vm.datas = response;
                    vm.legend = ColorService.getColorsForCounties(diverse)[0];
                });
            }
        }

        vm.getSeniorCitizens2000 = () => {
            if(vm.stateID === null) {
                CensusDataService.getStatePopAge00().then((response) => {
                    vm.datas = response;
                    // console.log(vm.datas);
                    let seniorPercent = AgeService.calculateSeniorCitizenPercentage(vm.datas, true);
                    // console.log(seniorPercent);
                    vm.datas = response;
                    vm.legend = ColorService.getColors(seniorPercent)[0];
                });
            } else {
                let censusStateID = vm.convertStateIDtoCode(vm.stateID);
                CensusDataService.getCountyPopAge00(censusStateID).then((response) => {
                    vm.datas = response;
                    let seniorPercent = AgeService.calculateSeniorCitizenPercentage(vm.datas, false);
                    // console.log(seniorPercent);
                    vm.legend = ColorService.getColorsForCounties(seniorPercent)[0];
                });
            }
        }

        vm.getSeniorCitizens2010 = () => {
            if(vm.stateID === null) {
                CensusDataService.getStatePopAge().then((response) => {
                    vm.datas = response;
                    let seniorPercent = AgeService.calculateSeniorCitizenPercentage(vm.datas, true);
                    vm.legend = ColorService.getColors(seniorPercent)[0];
                });
            } else {
                let censusStateID = vm.convertStateIDtoCode(vm.stateID);
                CensusDataService.getCountyPopAge(censusStateID).then((response) => {
                    vm.datas = response;
                    let seniorPercent = AgeService.calculateSeniorCitizenPercentage(vm.datas, false);
                    vm.legend = ColorService.getColorsForCounties(seniorPercent)[0];
                });
            }

        }

        vm.getSeniorCitizens1990 = () => {
            if(vm.stateID === null) {
                CensusDataService.getStatePopAge90().then((response) => {
                    vm.datas = response;
                    let seniorPercent = AgeService90.calculateSeniorCitizenPercentage(vm.datas, true);
                    vm.legend = ColorService.getColors(seniorPercent)[0];
                });
            } else {
                let censusStateID = vm.convertStateIDtoCode(vm.stateID);
                CensusDataService.getCountyPopAge90(censusStateID).then((response) => {
                    vm.datas = response;
                    let seniorPercent = AgeService90.calculateSeniorCitizenPercentage(vm.datas, false);
                    vm.legend = ColorService.getColorsForCounties(seniorPercent)[0];
                });
            }
        }

        vm.getHomeOwnership2000 = () => {
            if(vm.stateID === null) {
                CensusDataService.getOccupancyForState2000().then((response) => {
                    vm.datas = response;

                    // console.log(vm.datas);
                    vm.legend = ColorService.getColors(vm.datas)[0];
                });
            } else {
                let censusStateID = vm.convertStateIDtoCode(vm.stateID);
                CensusDataService.getOccupancyForCounty2000(censusStateID).then((response) => {
                    vm.datas = response;
                    vm.legend = ColorService.getColorsForCounties(vm.datas)[0];
                });
            }
        }

        vm.getHomeOwnership2010 = () => {
            if(vm.stateID === null) {
                CensusDataService.getOccupancyForState2010().then((response) => {
                    vm.datas = response;
                    // console.log(vm.datas);
                    vm.legend = ColorService.getColors(vm.datas)[0];
                });
            } else {
                let censusStateID = vm.convertStateIDtoCode(vm.stateID);
                CensusDataService.getOccupancyForCounty2010(censusStateID).then((response) => {
                    vm.datas = response;
                    vm.legend = ColorService.getColorsForCounties(vm.datas)[0];
                });
            }
        }

        vm.getHomeOwnership1990 = () => {
            if(vm.stateID === null) {
                CensusDataService.getOccupancyForState1990().then((response) => {
                    vm.datas = response;

                    // console.log(vm.datas);
                    vm.legend = ColorService.getColors(vm.datas)[0];
                });
            } else {
                let censusStateID = vm.convertStateIDtoCode(vm.stateID);
                CensusDataService.getOccupancyForCounty1990(censusStateID).then((response) => {
                    vm.datas = response;
                    vm.legend = ColorService.getColorsForCounties(vm.datas)[0];
                });
            }
        }


        vm.convertStateIDtoCode = (stateID) => {
            if(stateID !== null) {
                try{
                    let stateName = vm.getStateNameFromStateID(stateID);
                    let censusStateID = CensusDataService.convertStateNameToCensusID(stateName);
                    return censusStateID;
                } catch {
                    vm.hideButton();
                    return null;
                }
            } else {
                return null;
            }
        }

        vm.getStateNameFromStateID = (stateID) => {
            if(stateID !== null && stateID.length === 2) {
                return simplemaps_usmap_mapdata.state_specific[stateID].name;
            }
            else {
                return null;
            }
        }

            vm.chooseDisplay = () => {
                setTimeout(function(){   
                    if(vm.year===1990) {
                        // 1990 API PULLS
                        if(vm.dataMode === 1){
                            vm.legendTitle = "POPULATION";
                            vm.getPop1990();
                        } else if (vm.dataMode === 2) {
                            vm.legendTitle = "DIVERSITY";
                            vm.getDiversity90();
                        } else if (vm.dataMode === 3) {
                            vm.legendTitle = "AVERAGE AGE";
                            vm.getAgeData1990();
                        } else if (vm.dataMode === 4) {
                            vm.legendTitle = "POPULATION PER SQUARE MILE";
                            vm.getPopDensity1990();
                        } else if (vm.dataMode === 5) {
                            vm.legendTitle = "PERCENTAGE OF POPULATION 65 OR OLDER";
                            vm.getSeniorCitizens1990();
                        } else if (vm.dataMode === 6) {
                            vm.legendTitle = "PERCENTAGE OF CITIZENS THAT OWN HOMES";
                            vm.getHomeOwnership1990();
                        }
                    } else if (vm.year === 2000) {
                        // 2000 API PULLS
                        if(vm.dataMode === 1){
                            vm.legendTitle = "POPULATION";
                            vm.getPopulation2000();
                            
                        } else if (vm.dataMode === 2) {
                            vm.legendTitle = "DIVERSITY";
                            vm.getDiversity00();
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
                        } else if (vm.dataMode === 5) {
                            vm.legendTitle = "PERCENTAGE OF POPULATION 65 OR OLDER";
                            vm.getSeniorCitizens2000();
                        } else if (vm.dataMode === 6) {
                            vm.legendTitle = "PERCENTAGE OF CITIZENS THAT OWN HOMES";
                            vm.getHomeOwnership2000();
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
                            vm.legendTitle = "DIVERSITY";
                            vm.getDiversity10();
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
                        } else if (vm.dataMode === 5) {
                            vm.legendTitle = "PERCENTAGE OF POPULATION 65 OR OLDER";
                            vm.getSeniorCitizens2010();
                        } else if (vm.dataMode === 6) {
                            vm.legendTitle = "PERCENTAGE OF CITIZENS THAT OWN HOMES";
                            vm.getHomeOwnership2010();
                        }

                    }
                },200)
        }

        // Default display when loading
        // vm.chooseDisplay(); <-- causes code to fire twice.

        // this is the list of county ids by state from the CountyNameService.js file
        vm.countiesByState = CountyNameService.state;
        // console.log(vm.countiesByState);






        vm.listOfCountiesInSearchBar = (function() {
                /*
                
                when you hover over the state map, the county name is displayed in the search bar.
                */ 
                let selectedClass;
                

                    $(document).on("mouseenter", "path", function(e){
                        if (vm.stateID){

                            // console.log(this);
                         let stuff = $(e.target).attr("class") ;
                         // console.log(stuff); // sm_state_12345
            
                         $("input:eq(0)").val(CountyNameService.state[vm.stateID][stuff]);
                         // console.log(CountyNameService.state[vm.stateID][stuff])
                        }
    
                        
    
                    })
    
                    $("ul").on("mouseenter", "li", function(e){
                        
                        selectedClass = $(e.target).attr("class");
                        // console.log(`.${selectedClass}`);
                        $(`.${selectedClass}`).toggleClass("bound");
                        
                    }).on("mouseleave", "li", function(e){
                        $(`.${selectedClass}`).toggleClass("bound");
    
    
                    })

                    $("ul").on("click", "li", function(e){
                        $("input:eq(0)").val($(e.target).text())
                    })
                
                // $("ul").on("mouseenter", "li", function(e){
                //     // let stuff = $(e.target).attr("class") ;
                //     let stuff = $(e.target).attr("class") ;
                //     // console.log(stuff);
                //     $(stuff).addClass("bound");
                //     // $(e.target).toggleClass("bound");
                //     // $(stuff).toggleClass("bound");
                // })
                
            
        })();
        vm.showCompareModal = () => {
            angular.element(document.getElementById("compare-modal")).removeClass("ng-hide");
        }

        vm.hideModal = () => {
            angular.element(document.getElementById("compare-modal")).addClass("ng-hide");
        }

        vm.firstState = (stateID) => {
            let censusStateID = vm.convertStateIDtoCode(stateID);
            CensusDataService.getDataForState2010(censusStateID).then((response) => {
                vm.datas = response;
                vm.datas.stateID = stateID;
                vm.state1 = CompareService.setState1Data(vm.datas);
            });
        }
        
        vm.secondState = (stateID) => {
            let censusStateID = vm.convertStateIDtoCode(stateID);
            CensusDataService.getDataForState2010(censusStateID).then((response) => {
                vm.datas = response;
                vm.datas.stateID = stateID;
                vm.state2 = CompareService.setState2Data(vm.datas);
            });
        }
        
        vm.changePath = () => {
            if (vm.state1 && vm.state2) {
                $location.path('/compare');
            }
        }
        
    }]
};

angular.module('App').component("data", data).filter('custom', function() {
  return function(input, search) {
    if (!input) return input;
    if (!search) return input;
    var expected = ('' + search).toLowerCase();
    var result = {};
    angular.forEach(input, function(value, key) {
      var actual = ('' + value).toLowerCase();
      if (actual.indexOf(expected) !== -1) {
        result[key] = value;
      }
    });
    return result;
  }

});


