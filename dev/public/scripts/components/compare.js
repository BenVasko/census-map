"use strict";

const compare = {
    templateUrl: `scripts/components/compare.html`,
    controller: ["CensusDataService","ColorService","AgeService","AgeService90", "DropdownDataService", function(CensusDataService, ColorService, AgeService, AgeService90, DropdownDataService) {
        const vm = this;
        vm.listOfStates = DropdownDataService.listOfStates;
        vm.state1 = null;
        vm.state2 = null;

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
        vm.firstState = (stateID) => {
            let censusStateID = vm.convertStateIDtoCode(stateID);
            CensusDataService.getDataForState2010(censusStateID).then((response) => {
                vm.datas = response;
                vm.state1 = vm.datas;
                myChart.data.datasets[0].data = [parseInt(vm.state1.totalPop), vm.state1.landSizeAreaInMiles, vm.state1.popPerSM];
            });
        }
        
        vm.secondState = (stateID) => {
            let censusStateID = vm.convertStateIDtoCode(stateID);
            CensusDataService.getDataForState2010(censusStateID).then((response) => {
                vm.datas = response;
                vm.state2 = vm.datas;
                myChart.data.datasets[1].data = [parseInt(vm.state2.totalPop), vm.state2.landSizeAreaInMiles, vm.state2.popPerSM]
                console.log(myChart.data.datasets[1].data);
            });
        }
    }]
};

angular.module("App").component("compare", compare);