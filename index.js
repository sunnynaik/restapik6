// import Getrestapi from './restapi.js'
import Getpostdata from "./scenarios/postdata.js"
import Getfetchdata from './scenarios/fetchdata.js'
import Getputdata from './scenarios/putdata.js'
import Getdeletedata from './scenarios/deletedata.js'
import {group ,sleep} from "k6"

// This is use for html Report 

// import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

// export function handleSummary(data) {
//     return {
//       "summary.html": htmlReport(data),
//     };
//   }

export const options = {
    ext: {
        loadimpact: {
          projectID: 3607882,
          // Test runs with the same name groups test runs together
          name: "Rest Api Operations"
        }
      },
}

export default ()=> {

    group(" Post the Data on Swagger Petstore users api ", ()=> {
        Getpostdata()
    })
  
    group(" Fetch the Data on Swagger Petstore users api",()=> {
        Getfetchdata()
    })
   
    group(" Put the Data on Swagger Petstore users api",()=> {
        Getputdata()
    })

    group(" Delete the Data on Swagger Petstore users api",()=> {
        Getdeletedata()
    })
    sleep(1)
}