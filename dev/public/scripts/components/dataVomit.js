'use strict';

const data = {
    templateUrl: `scripts/components/dataVomit.html`,
    controller: ["CensusDataService","ColorService","AgeService","AgeService90", function(CensusDataService, ColorService, AgeService, AgeService90) {
        const vm = this;
        vm.datas;
        // selecting the back button
        vm.button = angular.element(document.getElementsByTagName("button"));

        vm.getData = () => {
            CensusDataService.getStatePopulation().then((response)=> {
                vm.datas = response;
                ColorService.getColors(vm.datas);
                vm.total = 0;
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
            if (API == 1) {
                vm.getData();
                console.log(vm.datas);
            }
            if (API == 2) {
                vm.getAgeData2010();
                console.log('selected 2')
            }
            if (API == 3) {
                vm.getAgeData2010();
                console.log('selected 3')
            }
        };

        // when you click on the map
        document.getElementById("map").addEventListener("click", (e) => {
            document.getElementById("map-scripts").innerHTML = "";
            // remove class of "ng-hide" so button will display
            vm.button.removeClass("ng-hide");
            // checking to see if you clicked on a state object
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
            vm.getDataForState(vm.stateID).then((response) => {
                ColorService.getColorsByCounties(response);
            });

        });

        vm.hideButton = () => {
            document.getElementById("map-scripts").innerHTML = "";
            // add class of "ng-hide" again so button will be hidden
            vm.button.addClass("ng-hide");

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
            vm.getData();
            vm.getCensusData();
        }

        vm.getDataForState = (stateID) => {
            let stateName = simplemaps_usmap_mapdata.state_specific[stateID].name;
            console.log(stateName);
            let censusStateID = CensusDataService.convertStateNameToCensusID(stateName);
            console.log(censusStateID);
            CensusDataService.getCountyPopulationForState(censusStateID).then((response) => {
                vm.datas = response;
                ColorService.getColorsForCounties(vm.datas);
            });
            console.log(vm.datas);
        };
    }]
};

angular.module('App').component("data", data);