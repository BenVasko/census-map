"use strict";
const AgeService = function(){
    const vm = this;
    vm.calculateAvgAge = (passedData, usMode) => {
        let dataArray = [["Avg Age", "Geography"]];

        for(let j = 1; j < passedData.length; j++){
            let geography = null;

            let totalAgeofState = 
            (((parseInt(passedData[j][0])) + (parseInt(passedData[j][23]))) * 2.5) + 
            (((parseInt(passedData[j][1])) + (parseInt(passedData[j][24]))) * 7) + 
            (((parseInt(passedData[j][2])) + (parseInt(passedData[j][25]))) * 12) + 
            (((parseInt(passedData[j][3])) + (parseInt(passedData[j][26]))) * 16) + 
            (((parseInt(passedData[j][4])) + (parseInt(passedData[j][27]))) * 18.5) + 
            (((parseInt(passedData[j][5])) + (parseInt(passedData[j][28]))) * 20) + 
            (((parseInt(passedData[j][6])) + (parseInt(passedData[j][29]))) * 21) + 
            (((parseInt(passedData[j][7])) + (parseInt(passedData[j][30]))) * 23) +
            (((parseInt(passedData[j][8])) + (parseInt(passedData[j][31]))) * 27) +
            (((parseInt(passedData[j][9])) + (parseInt(passedData[j][32]))) * 32) +
            (((parseInt(passedData[j][10])) + (parseInt(passedData[j][33]))) * 37) +
            (((parseInt(passedData[j][11])) + (parseInt(passedData[j][34]))) * 42) +
            (((parseInt(passedData[j][12])) + (parseInt(passedData[j][35]))) * 47) +
            (((parseInt(passedData[j][13])) + (parseInt(passedData[j][36]))) * 52) +
            (((parseInt(passedData[j][14])) + (parseInt(passedData[j][37]))) * 57) +
            (((parseInt(passedData[j][15])) + (parseInt(passedData[j][38]))) * 60.5) +
            (((parseInt(passedData[j][16])) + (parseInt(passedData[j][39]))) * 63) +
            (((parseInt(passedData[j][17])) + (parseInt(passedData[j][40]))) * 65.5) +
            (((parseInt(passedData[j][18])) + (parseInt(passedData[j][41]))) * 68) +
            (((parseInt(passedData[j][19])) + (parseInt(passedData[j][42]))) * 72) +
            (((parseInt(passedData[j][20])) + (parseInt(passedData[j][43]))) * 77) +
            (((parseInt(passedData[j][21])) + (parseInt(passedData[j][44]))) * 82) +
            (((parseInt(passedData[j][22])) + (parseInt(passedData[j][45]))) * 92.5);

            let totalPop = 0;
            for(let i = 0; i < 46; i++) {
                totalPop += parseInt(passedData[j][i]);
            }
            let avgAgeOfState = totalAgeofState/totalPop;
            if(usMode){
                dataArray.push([avgAgeOfState, passedData[j][46]]);
            } else {
                dataArray.push([avgAgeOfState, passedData[j][46], passedData[j][47], passedData[j][48]]);
            }
        }
        return dataArray;
    }

    vm.calculateSeniorCitizenPercentage = (passedData, usMode) => {
        let dataArray = [["% Seniors", "Geography"]];

        for(let j = 1; j < passedData.length; j++){
            let geography = null;


            let totalPop = 0;
            let seniorCount = 0;
            for(let i = 0; i < 46; i++) {
                totalPop += parseInt(passedData[j][i]);
                if((i >= 17 && i <= 22) || (i>=40 && i<=45)) {
                    seniorCount += parseInt(passedData[j][i]);
                }
            }
            let seniorPercentage = seniorCount / totalPop * 100;
            if(usMode){
                dataArray.push([seniorPercentage, passedData[j][46]]);
            } else {
                dataArray.push([seniorPercentage, passedData[j][46], passedData[j][47], passedData[j][48]]);
            }
        }
        return dataArray;
    }
}

angular
    .module("App")
    .service("AgeService", AgeService)