"use strict";

const CompareService = function(){
    const vm = this;

    vm.state1 = null;
    vm.state2 = null;

    vm.getStateData = () => {
        return vm.state1, vm.state2;
    };

    vm.setState1Data = (update) => {
        vm.state1 = update;
        return vm.state1;
    };
    vm.setState2Data = (update) => {
        vm.state2 = update;
        return vm.state2;
    };
    
}

angular
    .module("App")
    .service("CompareService", CompareService);