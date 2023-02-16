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

   // This is Put Data 
   for(const getpostdata of data){
    const urlpost = url + `/${getpostdata.username}` ;
    const sdata = {"email":"resjhsd@gmail.com"}
    const putres = http.put(urlpost,JSON.stringify(sdata),params, {
      tags : {
        my_tag : "put data "
      }
    })
    check(putres,{
      "Put status is 200 is ok ": (r)=> r.status === 200,
    })
  }
}