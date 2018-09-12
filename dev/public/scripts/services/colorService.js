
const ColorService = function(){
    this.lightest = 90; // the L value (lightness) in HSL. 90 is near white.
    this.darkest = 20; // the L value (lightness) in HSL. 20 is near black.
    
    this.getColors = function(myArray){
        // will hold arrays for all the data
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
            geographyKeys.push(myArray[i][arrayOfArrays.length])
        }
        console.log(arrayOfArrays);
        
        
        let min = max = arrayOfArrays[0][0];

        for(let i = 1; i < arrayOfArrays[0].length; i++) {
            if(arrayOfArrays[0][i] > max) {
                max = arrayOfArrays[0][i];
            } else if (arrayOfArrays[0][i] < min) {
                min = arrayOfArrays[0][i];
            }
        }

        console.log(min, max);

        max -= min;

        // arrayOfArrays[0][25]

        // let michiganAdjusted = arrayOfArrays[0][22] - min;

        // let michiganPercentage = michiganAdjusted / max;
        // let michiganColorPercentage = (1-michiganPercentage)*(this.lightest - this.darkest)+this.darkest;
        // document.querySelector(".sm_state_MI").style.fill = `hsl(0,100%,${michiganColorPercentage}%)`;
        // console.log(michiganColorPercentage);


        for (let i = 0; i < arrayOfArrays[0].length; i++) {
            // console.log(arrayOfArrays[0][i])
            let stateAdjustedByMinPop = arrayOfArrays[0][i] - min;
            
            let statePercentage = stateAdjustedByMinPop / max;
            let stateColorPercentage = (1-statePercentage)*(this.lightest - this.darkest)+this.darkest;
            for(let state in simplemaps_usmap_mapdata.state_specific) {
                if(simplemaps_usmap_mapdata.state_specific[state].name === geographyKeys[i]) {
                    this.setDataForState(state, `hsl(0,100,${stateColorPercentage})`, arrayOfArrays[0][i]);
                }
            }
            // document.querySelector(".sm_state_MI").style.fill = `hsl(0,100%,${michiganColorPercentage}%)`;
        }
        simplemaps_usmap.load();
    }

    this.getColorsForCounties = (myArray) => {
        // will hold arrays for all the data
        let arrayOfArrays = [];
        let geographyKeys = []
        // parse the passed data into arrays that group the data up by variable
        // instead of by geography (ie, all total population in one array)
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
        }
        console.log(arrayOfArrays);
        
        
        let min = max = arrayOfArrays[0][0];

        for(let i = 1; i < arrayOfArrays[0].length; i++) {
            if(arrayOfArrays[0][i] > max) {
                max = arrayOfArrays[0][i];
            } else if (arrayOfArrays[0][i] < min) {
                min = arrayOfArrays[0][i];
            }
        }

        console.log(min, max);

        max -= min;

        for (let i = 0; i < arrayOfArrays[0].length; i++) {
            // console.log(arrayOfArrays[0][i])
            let stateAdjustedByMinPop = arrayOfArrays[0][i] - min;
            let statePercentage = stateAdjustedByMinPop / max;
            let stateColorPercentage = (1-statePercentage)*(this.lightest - this.darkest)+this.darkest;
            this.setDataForCounty(geographyKeys[i], `hsl(0,100,${stateColorPercentage})`, arrayOfArrays[0][i]);
        }
        simplemaps_statemap.load();
    }

    this.setDataForState = (state, colorLevel, populationData) => {
        simplemaps_usmap_mapdata.state_specific[state].color = colorLevel;
        simplemaps_usmap_mapdata.state_specific[state].description = `Population: ${populationData}`;
        console.log(`The state ${state} is at colorLevel ${colorLevel}.`);
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