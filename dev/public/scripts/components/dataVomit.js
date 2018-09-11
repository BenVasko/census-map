'use strict';

const data = {
    templateUrl: `scripts/components/dataVomit.html`,
    controller: ["CensusDataService","ColorService","AgeService","AgeService90", function(CensusDataService, ColorService, AgeService, AgeService90) {
        const vm = this;
        vm.datas;
        vm.buttonVisible = false;
        console.log(vm.buttonVisible);

        vm.getData = () => {
            console.log("asked to get data");
            CensusDataService.getStatePopulation().then((response)=> {
                vm.datas = response;
                ColorService.getColors(vm.datas);
            });   
            console.log(vm.datas);
        };

        vm.getData();

        vm.getAgeData2010 = () => {
            CensusDataService.getStatePopAge().then((response)=>{
                vm.datas=response;
                console.log(vm.datas);
                vm.datas=AgeService.calculateAvgAge(vm.datas);
                console.log(vm.datas);
                ColorService.getColors(vm.datas);
            });
        }

        // vm.getAgeData2010();

        // vm.datas = CensusDataService.getStatePopAge90();
        // vm.datas = AgeService90.CalculateAvgAge(vm.datas);
        // ColorService.getColors(vm.datas);

        // vm.datas = CensusDataService.getStatePopAge00();
        // vm.datas = AgeService.CalculateAvgAge(vm.datas);
        // ColorService.getColors(vm.datas);


    

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

        document.getElementById("map").addEventListener("click", (e) => {
            document.getElementById("map-scripts").innerHTML = "";
            vm.buttonVisible = true;
            console.log(vm.buttonVisible);
            if (angular.element(e.target).attr("class")){
                vm.stateID = (angular.element(e.target).attr("class").slice(-2));
                console.log(vm.stateID); 
            } else if (e.target.innerHTML) {
                vm.stateID = e.target.innerHTML;
                console.log(vm.stateID); 
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
            vm.stateID = "";
            vm.buttonVisible = false;
            console.log(vm.buttonVisible);
            let us1 = document.createElement("script");
                us1.type = "text/javascript";
                us1.src = `scripts/us-map/mapdata.js`
                us1.innerHTML = null;
                document.getElementById("map-scripts").appendChild(us1);
            let us2 = document.createElement("script");
                us2.type = "text/javascript";
                us2.src = `scripts/us-map/usmap.js`;
                us2.innerHTML = null;
                document.getElementById("map-scripts").appendChild(us2);
            vm.getData();
            vm.getCensusData();
        }
    }]
};

angular.module('App').component("data", data);