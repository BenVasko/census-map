"use strict";

const compare = {
    templateUrl: `scripts/components/compare.html`,
    controller: ["CensusDataService","ColorService","AgeService","AgeService90", "DropdownDataService", "CompareService", "$location", function(CensusDataService, ColorService, AgeService, AgeService90, DropdownDataService, CompareService, $location) {
        const vm = this;
        vm.listOfStates = DropdownDataService.listOfStates;
        vm.state1 = CompareService.state1;
        vm.state2 = CompareService.state2;
        vm.convertStateIDtoCode = (stateID) => {
            let stateName = simplemaps_usmap_mapdata.state_specific[stateID].name;
            console.log(stateName);
            let censusStateID = CensusDataService.convertStateNameToCensusID(stateName);
            console.log(censusStateID);
            return censusStateID;
        }

        // vm.getDataForState = (stateID) => {
        //     let censusStateID = vm.convertStateIDtoCode(stateID);
        //     CensusDataService.getDataForState2010(censusStateID).then((response) => {
        //         vm.datas = response;
        //     });
        // };

        
// if (vm.state1 !== null && vm.state2 !== null) {
    let ctx = document.getElementById("myChart").getContext('2d');
    let myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["Pop", "Area", "Density"],
            datasets: [{
                label: 'state 1',
                data: [],
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(255, 99, 132)',
                    'rgb(255, 99, 132)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(255,99,132,1)',
                    'rgba(255,99,132,1)'
                ],
                borderWidth: 1
            }, {
                label: 'state 2',
                data: [],
                backgroundColor: [
                    'rgba(54, 162, 235)',
                    'rgba(54, 162, 235)',
                    'rgba(54, 162, 235)'
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(54, 162, 235, 1)'
                ],
                borderWidth: 1
            }],
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
    });
// }
        for (let i = 0; i < vm.listOfStates.length; i++) {
            if (vm.listOfStates[i].value === CompareService.state1.stateID) {
                vm.state1index = i;
            } else if (vm.listOfStates[i].value === CompareService.state2.stateID) {
                vm.state2index = i;
            }
        }
        vm.update = () => {
            vm.totalPopOfStates = parseInt(vm.state1.totalPop) + parseInt(vm.state2.totalPop);
            vm.state1ComparePopPercentage = parseInt(vm.state1.totalPop) / vm.totalPopOfStates;
            vm.state2ComparePopPercentage = parseInt(vm.state2.totalPop) / vm.totalPopOfStates;
            if (vm.state2ComparePopPercentage > vm.state1ComparePopPercentage) {
                vm.state1ComparePopPercentage = vm.state1ComparePopPercentage * (-1);
                vm.state2ComparePopPercentage = vm.state2ComparePopPercentage * (-1);
            }
            vm.totalAreaOfStates = vm.state1.landSizeAreaInMiles + vm.state2.landSizeAreaInMiles;
            vm.state1CompareAreaPercentage = vm.state1.landSizeAreaInMiles / vm.totalAreaOfStates;
            vm.state2CompareAreaPercentage = vm.state2.landSizeAreaInMiles / vm.totalAreaOfStates;
            if (vm.state2CompareAreaPercentage > vm.state1CompareAreaPercentage) {
                vm.state1CompareAreaPercentage = vm.state1CompareAreaPercentage * (-1);
                vm.state2CompareAreaPercentage = vm.state2CompareAreaPercentage * (-1);
            }
            vm.totalPopPerSM = vm.state1.popPerSM + vm.state2.popPerSM;
            vm.state1ComparePopPerSMPercentage = vm.state1.popPerSM / vm.totalPopPerSM;
            vm.state2ComparePopPerSMPercentage = vm.state2.popPerSM / vm.totalPopPerSM;
            if (vm.state2ComparePopPerSMPercentage > vm.state1ComparePopPerSMPercentage) {
                vm.state1ComparePopPerSMPercentage = vm.state1ComparePopPerSMPercentage * (-1);
                vm.state2ComparePopPerSMPercentage = vm.state2ComparePopPerSMPercentage * (-1);
            }
            myChart.data.datasets[0].data = [vm.state1ComparePopPercentage, vm.state1CompareAreaPercentage, vm.state1ComparePopPerSMPercentage];
            myChart.data.datasets[1].data = [vm.state2ComparePopPercentage, vm.state2CompareAreaPercentage, vm.state2ComparePopPerSMPercentage];
            myChart.update();
        }

        vm.firstState = (stateID) => {
            let censusStateID = vm.convertStateIDtoCode(stateID);
            CensusDataService.getDataForState2010(censusStateID).then((response) => {
                vm.datas = response;
                vm.datas.stateID = stateID;
                vm.state1 = CompareService.setState1Data(vm.datas);
                vm.update();
            });
        }
        
        vm.secondState = (stateID) => {
            let censusStateID = vm.convertStateIDtoCode(stateID);
            CensusDataService.getDataForState2010(censusStateID).then((response) => {
                vm.datas = response;
                vm.datas.stateID = stateID;
                vm.state2 = CompareService.setState2Data(vm.datas);
                vm.update();
            });
        }
        
        vm.changePath = () => {
            $location.path('/map');
        }

        vm.update();

    }]
};

angular.module("App").component("compare", compare);