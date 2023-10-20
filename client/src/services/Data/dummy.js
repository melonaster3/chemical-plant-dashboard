export const dummyDatasets = [
    {
      timestamp: "2023-10-13T00:00:00Z",
      temperature: 24.5,
      pressure: 1019.8,
      level1_chemical: 74.2,
      level2_chemical: 59.8,

     
   
    },
    {
      timestamp: "2023-10-13T00:05:00Z",
      temperature: 24.7,
      pressure: 1020.0,
      level1_chemical: 74.5,
      level2_chemical: 60.0,

   
    },
    {
      timestamp: "2023-10-13T00:10:00Z",
      temperature: 24.8,
      pressure: 1020.2,
      level1_chemical: 74.7,
      level2_chemical: 60.2,
 
    },
    {
      timestamp: "2023-10-13T00:15:00Z",
      temperature: 24.3,
      pressure: 1010.2,
      level1_chemical: 75,
      level2_chemical: 62.2,
 
    },
    {
      timestamp: "2023-10-13T00:20:00Z",
      temperature: 24.8,
      pressure: 1000.2,
      level1_chemical: 74.0,
      level2_chemical: 60.7,
 
    },
    {
      timestamp: "2023-10-13T00:25:00Z",
      temperature: 25,
      pressure: 1020.2,
      level1_chemical: 74.9,
      level2_chemical: 59.2,
 
    },
    {
      timestamp: "2023-10-13T00:30:00Z",
      temperature: 25.3,
      pressure: 1025.2,
      level1_chemical: 75.7,
      level2_chemical: 54.2,
 
    },
    {
      timestamp: "2023-10-13T00:35:00Z",
      temperature: 24.2,
      pressure: 1027.2,
      level1_chemical: 76.7,
      level2_chemical: 57.2,
 
    },
    {
      timestamp: "2023-10-13T00:40:00Z",
      temperature: 24.0,
      pressure: 1028.2,
      level1_chemical: 74.3,
      level2_chemical: 59.2,
 
    },
    {
      timestamp: "2023-10-13T00:45:00Z",
      temperature: 25.8,
      pressure: 1023.2,
      level1_chemical: 72.7,
      level2_chemical: 60.9,
 
    },
    {
      timestamp: "2023-10-13T00:50:00Z",
      temperature: 22.8,
      pressure: 1021.2,
      level1_chemical: 71.7,
      level2_chemical: 60.1,
 
    },
    {
      timestamp: "2023-10-13T00:55:00Z",
      temperature: 24.8,
      pressure: 1020.9,
      level1_chemical: 74.7,
      level2_chemical: 59.2,
 
    },
  ]; 
  
 

  export const GetOverallAverage = (arrayOfData, type) => {
    let max = 0
    let min = 0
    let average = 0
    let typeKey = ''
    let unit = ''
    let levelMin = {
      level1: 0,
      level2:0,
    }
    let levelMax = {
      Level1 : 0,
      Level2: 0
    }
    let avgLevel = { Level1 : 0,
      Level2: 0
    };
    if(type === "Temperature") {
      unit = '°C'
      typeKey = 'temperature'
    } else if (type === "Pressure") {
      unit = 'kPa'
      typeKey = 'pressure'

    } else if (type === "Level") {
      unit = 'L'
      typeKey = 'levels'
    }
    for(let x = 0; x < arrayOfData.length; x++) {
      if(typeKey === "levels") {
        if(x === 0) {
          min = arrayOfData[x]["level1_chemical"] +arrayOfData[x]["level2_chemical"]
          levelMin["Level1"]= arrayOfData[x]["level1_chemical"] 
          levelMin["Level2"]= arrayOfData[x]["level2_chemical"] 
        }
        if(arrayOfData[x]["level1_chemical"] +arrayOfData[x]["level2_chemical"] > max) {
          max = arrayOfData[x]["level1_chemical"] +arrayOfData[x]["level2_chemical"]
        }
        if(arrayOfData[x]["level1_chemical"] < levelMin.Level1) {
          levelMin["Level1"]= arrayOfData[x]["level1_chemical"] 

        }
        if(arrayOfData[x]["level2_chemical"] < levelMin.Level2) {
          levelMin["Level2"]= arrayOfData[x]["level2_chemical"] 
        }
        if(arrayOfData[x]["level1_chemical"] +arrayOfData[x]["level2_chemical"] < min) {
          min = arrayOfData[x]["level1_chemical"] +arrayOfData[x]["level2_chemical"]
        }

        if(arrayOfData[x]["level1_chemical"] > levelMax.Level1) {
          levelMax["Level1"]= arrayOfData[x]["level1_chemical"] 

        }
        if(arrayOfData[x]["level2_chemical"] > levelMax.Level2) {
          levelMax["Level2"]= arrayOfData[x]["level2_chemical"] 
        }
        avgLevel["Level1"] += arrayOfData[x]["level1_chemical"]
        avgLevel["Level2"] +=arrayOfData[x]["level2_chemical"] 
        average += arrayOfData[x]["level1_chemical"] +arrayOfData[x]["level2_chemical"] 
      } else {
        if(x === 0) {
          min = arrayOfData[x][typeKey] 
        }
        if(arrayOfData[x][typeKey] > max) {
          max = arrayOfData[x][typeKey]
        }
        if(arrayOfData[x][typeKey] < min) {
          min = arrayOfData[x][typeKey]
        }
        average += arrayOfData[x][typeKey]
      }
    }    

    if(typeKey === "levels") {
      avgLevel["Level1"] =   avgLevel["Level1"]/arrayOfData.length;
      avgLevel["Level2"] =   avgLevel["Level2"]/arrayOfData.length;

    } else {
      average = average/arrayOfData.length;
    }

   
    return {max, min, average,levelMin,levelMax,avgLevel}
  }