// import Getrestapi from './restapi.js'
import Getpostdata from "./scenarios/postdata.js"
import Getfetchdata from './scenarios/fetchdata.js'
import Getputdata from './scenarios/putdata.js'
import Getdeletedata from './scenarios/deletedata.js'
import {group ,sleep} from "k6"
import { vus } from "./env_rest_api.js"

// This is use for html Report 

import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export function handleSummary(data) {
    return {
      "summary.html": htmlReport(data),
    };
  }

export const options = {
    vus:vus,
    // duration:duration,
    stages: [
      { duration: "5s", target: 10 },
      { duration: "5s", target: 10 },
      { duration: "5s", target: 10 },
      { duration: "5s", target: 10 },
    ],
    thresholds: {
      http_req_failed: ['rate<0.01'], // http errors should be less than 1%
      http_req_duration: ['p(99)<400'], // 99% of requests should be below 400ms
    },
    
      ext: {
          loadimpact: {
            projectID: 3626852,
            // Test runs with the same name groups test runs together
            name: "Rest Api"
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