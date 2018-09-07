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
    }]
};

angular.module('App').component("data", data);