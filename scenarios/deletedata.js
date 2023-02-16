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
    http_req_duration: ['p(99)<200'], // 99% of requests should be below 200ms
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

    //This is delete Data 
  
  for(const deldata of data) {
    const urldel = url + `/${deldata.username}`;
    const delres = http.del(urldel,null,params,{
      tags : {
        my_tag : "delete data"
      }
    })
    check(delres,{
      "delete status is ok ": (r)=> r.status === 200,
    })
  }
}