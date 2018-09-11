"use strict";

const AgeService90 = function(){
    const vm = this;
    let calculateAges = (passedData) => {
        let totalAgeofState = (passedData[1][0] * 0.5) + (passedData[1][1] * 1.5) + (passedData[1][2] * 3.5) + (passedData[1][3] * 5) + (passedData[1][4] * 6) + (passedData[1][5] * 8) + (passedData[1][6] * 10.5) + (passedData[1][7] * 12.5) + (passedData[1][8] * 14) + (passedData[1][9] * 15) + (passedData[1][10] * 16) + (passedData[1][11] * 17) + (passedData[1][12] * 18) + (passedData[1][13] * 19) + (passedData[1][14] * 20) + (passedData[1][15] * 21) + (passedData[1][16] * 23) + (passedData[1][17] * 27) + (passedData[1][18] * 32) + (passedData[1][19] * 37) + (passedData[1][20] * 42) + (passedData[1][21] * 47) + (passedData[1][22] * 52) + (passedData[1][23] * 57) + (passedData[1][24] * 60.5) + (passedData[1][25] * 63) + (passedData[1][26] * 67) + (passedData[1][27] * 72) + (passedData[1][28] * 77) + (passedData[1][29] * 82) + (passedData[1][30] * 92.5)
    }
}


angular
    .module("App")
    .service("AgeService90", AgeService90)