"use strict"
const DiversityService = function() {
    const vm = this;
    vm.calculateDiversity = (passedData, usMode) => {
        let dataArray = [["Avg Age", "Geography"]];

        for (let j =1; j <passedData.length; j++){
            let geography = null;

            let racePercent = (passedData[j][0])
                            //   (passedData[j][1])
                            //   (passedData[j][2])
                            //   (passedData[j][3])
                            //   (passedData[j][4])
                            //   (passedData[j][5])
                            //   (passedData[j][6])
        }
        let totalPop = 0;
        for(let i =0; i < 7; i ++){
            totalPop += (passedData[j][i])
        }
        let percent = racePercent/totalPop;
        dataArray.push([])

        return dataArray;
    }
}


angular 
    .module("App")
    .service("DiversityService", DiversityService)