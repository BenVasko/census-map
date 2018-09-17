"use strict"
const DiversityService = function() {
    const vm = this;
    vm.diversityPercent = (passedData) => {
        let dataArray = [["percent white", "state id"]];
        // console.log(dataArray[0]);
        for (let i =1; i<passedData.length; i++){
            dataArray[i] = [(passedData[i][0]/passedData[i][1])*100, passedData[i][2]]
            // dataArray[i][1] = 
           
        }
        console.log(passedData)
        return dataArray
       
    }
    
}


angular 
    .module("App")
    .service("DiversityService", DiversityService)