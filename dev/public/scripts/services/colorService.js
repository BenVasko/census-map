const ColorService = function(){
    this.lightest = 90; // the L value (lightness) in HSL. 90 is near white.
    this.darkest = 20; // the L value (lightness) in HSL. 20 is near black.
    
    this.getColors = function(myArray){
        // will hold arrays for all the data
        console.log(myArray);
        let arrayOfArrays = [];
        let geographyKeys = []
        // parse the passed data into arrays that group the data up by variable
        // instead of by geography (ie, all total population in one array)
        for(let i = 0; i < myArray[1].length; i++) {
            if(!isNaN(parseInt(myArray[1][i]))){
                let newArray = [parseInt(myArray[1][i])];
                arrayOfArrays.push(newArray);
            } else {
                geographyKeys.push(myArray[1][i]);
                break;
            }
        }
        

        for(let i = 2; i < myArray.length; i++){
            for(let j = 0; j < arrayOfArrays.length; j++) {
                arrayOfArrays[j].push(parseInt(myArray[i][j]));
            }
            geographyKeys.push(myArray[i][arrayOfArrays.length]);
        }
        // console.log(arrayOfArrays);

        let logArrayOfArrays = [[]];
        logArrayOfArrays[0][0] = Math.log(arrayOfArrays[0][0])
        let min = max = logArrayOfArrays[0][0];

        for(let i = 1; i < arrayOfArrays[0].length; i++) {
            logArrayOfArrays[0][i] = Math.log(arrayOfArrays[0][i]);
            if(logArrayOfArrays[0][i] > max) {
                max = logArrayOfArrays[0][i];
            } else if (logArrayOfArrays[0][i] < min) {
                min = logArrayOfArrays[0][i];
            }
        }

        // console.log(min, max);

        // normalize the range
        max -= min;

        // arrayOfArrays[0][25]

        // let michiganAdjusted = arrayOfArrays[0][22] - min;

        // let michiganPercentage = michiganAdjusted / max;
        // let michiganColorPercentage = (1-michiganPercentage)*(this.lightest - this.darkest)+this.darkest;
        // document.querySelector(".sm_state_MI").style.fill = `hsl(0,100%,${michiganColorPercentage}%)`;
        // console.log(michiganColorPercentage);



        for (let i = 0; i < logArrayOfArrays[0].length; i++) {
            // console.log(arrayOfArrays[0][i], min, max);
            let statePercentage = (logArrayOfArrays[0][i] - min)/max;

            // console.log(statePercentage)

            // console.log(`${geographyKeys[i]} percentage is: ${statePercentage}`);

            
            
            let stateColorPercentage = (1-statePercentage)*(this.lightest - this.darkest)+this.darkest;
            
            for(let state in simplemaps_usmap_mapdata.state_specific) {
                if(simplemaps_usmap_mapdata.state_specific[state].name === geographyKeys[i]) {

                    if (stateColorPercentage < 30) {
                        this.setDataForState(state, "#0b6739", logArrayOfArrays[0][i]);
                    }
                    if (stateColorPercentage >= 30) {
                        this.setDataForState(state, "#36a258", logArrayOfArrays[0][i]);
                    }
                    if (stateColorPercentage >= 40) {
                        this.setDataForState(state, "#7ac57d", logArrayOfArrays[0][i]);
                    }
                    if (stateColorPercentage >= 50) {
                        this.setDataForState(state, "#abdd94", logArrayOfArrays[0][i]);
                    }
                    if (stateColorPercentage >= 60) {
                        this.setDataForState(state, "#d9efa6", logArrayOfArrays[0][i]);
                    }
                    if (stateColorPercentage >= 70) {
                        this.setDataForState(state, "#fffecd", logArrayOfArrays[0][i]);
                    }
                    if (stateColorPercentage >= 80) {
                        this.setDataForState(state, "#ffffe5", logArrayOfArrays[0][i]);
                    }

                }
            }
            
            // document.querySelector(".sm_state_MI").style.fill = `hsl(0,100%,${michiganColorPercentage}%)`;
        }

        // legend groups
        let legend = {};
        legend.max = Math.max.apply(null, arrayOfArrays[0]); // gets the max value of the data set
        legend.min = Math.min.apply(null, arrayOfArrays[0]); // gets the min value of the data set
        legend.spread = (legend.max - legend.min) / 7;
        legend.box1 = Math.floor(legend.min + legend.spread * 1);
        legend.box2 = Math.floor(legend.min + legend.spread * 2);
        legend.box3 = Math.floor(legend.min + legend.spread * 3);
        legend.box4 = Math.floor(legend.min + legend.spread * 4);
        legend.box5 = Math.floor(legend.min + legend.spread * 5);
        legend.box6 = Math.floor(legend.min + legend.spread * 6);
        legend.box7 = Math.floor(legend.min + legend.spread * 7);
        if (legend.max > 1000000) {
            legend.box1 = Math.round(legend.box1 / 1000000) + "M";
            legend.box2 = Math.round(legend.box2 / 1000000) + "M";
            legend.box3 = Math.round(legend.box3 / 1000000) + "M";
            legend.box4 = Math.round(legend.box4 / 1000000) + "M";
            legend.box5 = Math.round(legend.box5 / 1000000) + "M";
            legend.box6 = Math.round(legend.box6 / 1000000) + "M";
            legend.box7 = Math.round(legend.box7 / 1000000) + "M";
        }
        // console.log(legend);
        simplemaps_usmap.load();
        return legend;
    }

    this.getColorsForCounties = (myArray) => {
        // will hold arrays for all the data
        let arrayOfArrays = [];
        let geographyKeys = []
        // parse the passed data into arrays that group the data up by variable
        // instead of by geography (ie, all total population in one array)
        // console.log(myArray);
        for(let i = 0; i < myArray[1].length; i++) {
            if(!isNaN(parseInt(myArray[1][i]))){
                let newArray = [parseInt(myArray[1][i])];
                arrayOfArrays.push(newArray);
            } else {
                geographyKeys.push(myArray[1][i+1]+myArray[1][i+2]);
                break;
            }
        }

        for(let i = 2; i < myArray.length; i++){
            for(let j = 0; j < arrayOfArrays.length; j++) {
                arrayOfArrays[j].push(parseInt(myArray[i][j]));
            }
            geographyKeys.push(myArray[i][arrayOfArrays.length+1] + myArray[i][arrayOfArrays.length+2]);
            // console.log(geographyKeys[i]);
        }
        // console.log(geographyKeys);
        // console.log(arrayOfArrays);
        
        let min = max = arrayOfArrays[0][0];

        for(let i = 1; i < arrayOfArrays[0].length; i++) {
            if(arrayOfArrays[0][i] > max) {
                max = arrayOfArrays[0][i];
            } else if (arrayOfArrays[0][i] < min) {
                min = arrayOfArrays[0][i];
            }
        }

        // normalize the range
        max -= min;

        for (let i = 0; i < arrayOfArrays[0].length; i++) {
            // console.log(arrayOfArrays[0][i])
            let stateAdjustedByMinPop = arrayOfArrays[0][i] - min;
            let statePercentage = stateAdjustedByMinPop / max;
            let stateColorPercentage = (1-statePercentage)*(this.lightest - this.darkest)+this.darkest;
            // console.log(geographyKeys[i]);
            //this.setDataForCounty(geographyKeys[i], `hsl(0,100,${stateColorPercentage})`, arrayOfArrays[0][i]);
            if (stateColorPercentage < 30) {
                this.setDataForCounty(geographyKeys[i], "#0b6739", arrayOfArrays[0][i]);
            }
            if (stateColorPercentage >= 30) {
                this.setDataForCounty(geographyKeys[i], "#36a258", arrayOfArrays[0][i]);
            }
            if (stateColorPercentage >= 40) {
                this.setDataForCounty(geographyKeys[i], "#7ac57d", arrayOfArrays[0][i]);
            }
            if (stateColorPercentage >= 50) {
                this.setDataForCounty(geographyKeys[i], "#abdd94", arrayOfArrays[0][i]);
            }
            if (stateColorPercentage >= 60) {
                this.setDataForCounty(geographyKeys[i], "#d9efa6", arrayOfArrays[0][i]);
            }
            if (stateColorPercentage >= 70) {
                this.setDataForCounty(geographyKeys[i], "#fffecd", arrayOfArrays[0][i]);
            }
            if (stateColorPercentage >= 80) {
                this.setDataForCounty(geographyKeys[i], "#ffffe5", arrayOfArrays[0][i]);
            }
        }
        // console.log(arrayOfArrays);// legend groups
        let legend = {};
        legend.max = Math.max.apply(null, arrayOfArrays[0]); // gets the max value of the data set
        legend.min = Math.min.apply(null, arrayOfArrays[0]); // gets the min value of the data set
        legend.spread = (legend.max - legend.min) / 7;
        legend.box1 = Math.floor(legend.min + legend.spread * 1);
        legend.box2 = Math.floor(legend.min + legend.spread * 2);
        legend.box3 = Math.floor(legend.min + legend.spread * 3);
        legend.box4 = Math.floor(legend.min + legend.spread * 4);
        legend.box5 = Math.floor(legend.min + legend.spread * 5);
        legend.box6 = Math.floor(legend.min + legend.spread * 6);
        legend.box7 = Math.floor(legend.min + legend.spread * 7);
        // if (legend.max > 1000) {
        //     legend.box1 = Math.round(legend.box1 / 1000) * 1000;
        //     legend.box2 = Math.round(legend.box2 / 1000) * 1000;
        //     legend.box3 = Math.round(legend.box3 / 1000) * 1000;
        //     legend.box4 = Math.round(legend.box4 / 1000) * 1000;
        //     legend.box5 = Math.round(legend.box5 / 1000) * 1000;
        //     legend.box6 = Math.round(legend.box6 / 1000) * 1000;
        //     legend.units = "";
        // }


        // millions rounded to one decimal place
        if (legend.box7  > 1000000) {
            legend.box7 = (legend.box7 / 1000000).toFixed(1) + "M";
        }
        if (legend.box6  > 1000000) {
            legend.box6 = (legend.box6 / 1000000).toFixed(1) + "M";
        }
        if (legend.box5  > 1000000) {
            legend.box5 = (legend.box5 / 1000000).toFixed(1) + "M";
        }
        if (legend.box4  > 1000000) {
            legend.box4 = (legend.box4 / 1000000).toFixed(1) + "M";
        }
        if (legend.box3  > 1000000) {
            legend.box3 = (legend.box3 / 1000000).toFixed(1) + "M";
        }
        if (legend.box2  > 1000000) {
            legend.box2 = (legend.box2 / 1000000).toFixed(1) + "M";
        }
        if (legend.box1  > 1000000) {
            legend.box1 = (legend.box1 / 1000000).toFixed(1) + "M";
        }

        //thousands rounded to nearest one.
        if (legend.box7  > 1000) {
            legend.box7 = (legend.box7 / 1000).toFixed(0) + "K";
        }
        if (legend.box6  > 1000) {
            legend.box6 = (legend.box6 / 1000).toFixed(0) + "K";
        }
        if (legend.box5  > 1000) {
            legend.box5 = (legend.box5 / 1000).toFixed(0) + "K";
        }
        if (legend.box4  > 1000) {
            legend.box4 = (legend.box4 / 1000).toFixed(0) + "K";
        }
        if (legend.box3  > 1000) {
            legend.box3 = (legend.box3 / 1000).toFixed(0) + "K";
        }
        if (legend.box2  > 1000) {
            legend.box2 = (legend.box2 / 1000).toFixed(0) + "K";
        }
        if (legend.box1  > 1000) {
            legend.box1 = (legend.box1 / 1000).toFixed(0) + "K";
        }

        console.log(legend);
        // simplemaps_usmap.load();
        simplemaps_statemap.load();
        return legend;
    }



    this.setDataForState = (state, colorLevel, populationData) => {
        simplemaps_usmap_mapdata.state_specific[state].color = colorLevel;
        simplemaps_usmap_mapdata.state_specific[state].description = `Population: ${populationData}`;
    }

    this.setDataForCounty = (county, colorLevel, populationData) => {
        try {
            simplemaps_statemap_mapdata.state_specific[county].color = colorLevel;
            simplemaps_statemap_mapdata.state_specific[county].description = `Population: ${populationData}`;
        } catch {
            console.log(`County: ${county} failed to be colored`);
        }
    }

};





angular.module("App").
service("ColorService", ColorService);