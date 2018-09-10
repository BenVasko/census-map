'use strict';

const data = {
    templateUrl: `scripts/components/dataVomit.html`,
    controller: ["CensusDataService", function(CensusDataService) {
        const vm = this;

        vm.getData = () => {
            console.log("asked to get data");
            CensusDataService.getStatePopulation().then((response)=> {
                vm.datas = response;
            });
            console.log(vm.datas);
        };

        vm.getData();

        document.addEventListener("click", (e) => {
            console.log(e.target.innerHTML);
            if (angular.element(e.target).attr("class")){
                vm.stateID = (angular.element(e.target).attr("class").slice(-2)); 
            } else if (e.target.innerHTML) {
                vm.stateID = e.target.innerHTML;
            }
                let ak1 = document.createElement("script");
                    ak1.type = "text/javascript";
                    ak1.src = `scripts/states/${vm.stateID}/mapdata.js`
                    ak1.innerHTML = null;
                    document.getElementById("map-scripts").innerHTML = "";
                    document.getElementById("map-scripts").appendChild(ak1);
                let ak2 = document.createElement("script");
                    ak2.type = "text/javascript";
                    ak2.src = `scripts/states/${vm.stateID}/statemap.js`;
                    ak2.innerHTML = null;
                    document.getElementById("map-scripts").appendChild(ak2);
        });

    }]
};

angular.module('App').component("data", data);