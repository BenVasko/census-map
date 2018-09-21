// "use strict"
const DiversityService = function() {
    const vm = this;
    vm.diversityPercent = (passedData, usMode) => {
        let dataArray = [["percent white", "state id"]];
        // console.log(dataArray[0]);
        for (let i=1; i<passedData.length; i++){
            if(usMode){
                dataArray.push([(passedData[i][0]/passedData[i][1])*100, passedData[i][2]]);
            } else {
                dataArray.push([(passedData[i][0]/passedData[i][1])*100, passedData[i][2],passedData[i][3], passedData[i][4]]);
            }
           
        }
        // console.log(passedData);
        return dataArray;
       
    }
    
}


angular 
    .module("App")
    .service("DiversityService", DiversityService)