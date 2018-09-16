"use strict";

const AgeService90 = function(){
    const vm = this;

    vm.calculateAvgAge = (passedData, usMode) => {
        let dataArray = [["Avg Age", "Geography"]];
<<<<<<< HEAD
        // console.log(passedData)
        for(let j = 1 ; j < 52; j++){
=======
        console.log(passedData)
        for(let j = 1 ; j < passedData.length; j++){
>>>>>>> master
            let totalAgeofState = (passedData[j][0] * 0.5) + (passedData[j][1] * 1.5) + (passedData[j][2] * 3.5) + (passedData[j][3] * 5) + (passedData[j][4] * 6) + (passedData[j][5] * 8) + (passedData[j][6] * 10.5) + (passedData[j][7] * 12.5) + (passedData[j][8] * 14) + (passedData[j][9] * 15) + (passedData[j][10] * 16) + (passedData[j][11] * 17) + (passedData[j][12] * 18) + (passedData[j][13] * 19) + (passedData[j][14] * 20) + (passedData[j][15] * 21) + (passedData[j][16] * 23) + (passedData[j][17] * 27) + (passedData[j][18] * 32) + (passedData[j][19] * 37) + (passedData[j][20] * 42) + (passedData[j][21] * 47) + (passedData[j][22] * 52) + (passedData[j][23] * 57) + (passedData[j][24] * 60.5) + (passedData[j][25] * 63) + (passedData[j][26] * 67) + (passedData[j][27] * 72) + (passedData[j][28] * 77) + (passedData[j][29] * 82) + (passedData[j][30] * 92.5);

            let totalPop = 0;
            for(let i = 0; i < 31; i ++){
                totalPop += parseInt(passedData[j][i])
            }
            let avgAgeOfState = totalAgeofState/totalPop;
            if(usMode){
                dataArray.push([avgAgeOfState, passedData[j][31]]);
            } else {
                dataArray.push([avgAgeOfState, passedData[j][31], passedData[j][32], passedData[j][33]]);
            }

        }

        return dataArray;
    }

}


angular
    .module("App")
    .service("AgeService90", AgeService90)