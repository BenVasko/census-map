'use strict';

const data = {
    templateUrl: `scripts/components/dataVomit.html`,
    controller: ["CensusDataService","ColorService", function(CensusDataService, ColorService) {
        const vm = this;
        vm.datas;
        // selecting the back button
        vm.button = angular.element(document.getElementsByTagName("button"));

        vm.getData = () => {
            console.log("asked to get data");
            CensusDataService.getStatePopulation().then((response)=> {
                vm.datas = response;
                ColorService.getColors(vm.datas);
            });   
            console.log(vm.datas);
        };

        vm.getData();

        // taz added functionality for dropdown select to call API
        vm.getCensusData = function(API){
            console.log(API);
            if (API == 1) {
                CensusDataService.getStatePopulation().then((response)=> {
                    vm.datas = response;
                });
                console.log(vm.datas);
            }
            if (API == 2) {
                CensusDataService.getStatePopRace().then((response)=> {
                    console.log(response);
                });
                
            }
            if (API == 3) {
                CensusDataService.getStatePopAge().then((response)=> {
                    vm.datas = response;
                });
                console.dir(vm.datas);
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
            // checking to see if you clicked on label of state
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
    }]
};

angular.module('App').component("data", data);