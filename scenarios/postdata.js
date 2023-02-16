import http from 'k6/http';
import { check } from 'k6';
import { SharedArray } from 'k6/data';
import {url,vus,duration } from '../env_rest_api.js';



export const options = {
  vus:vus,
  // duration:duration,
  stages: [
    { duration: "10s", target: 5 },
    { duration: "5s", target: 3 }
  ],

 
  
  
  thresholds: {
    http_req_failed: ['rate<0.01'], // http errors should be less than 1%
    http_req_duration: ['p(99)<200'], // 95% of requests should be below 200ms
  },
  
}


const data = new SharedArray('Rest Api Data', function () {
  return JSON.parse(open('../rawdata/restapiData.json')).users;
});


export default function () {

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const user = data[0];

  // This is the Post Data 

  for(const jsondata of data){
   // console.log(jsondata);
    const postres = http.post(url,JSON.stringify(jsondata),params,{
      tags :{
        my_tag :"Post data "
      }
    })
    check(postres,{
      "post status is ok 200": (r)=> r.status === 200,
    })

  }
}