+++
title = "Promise.all v Promise.allSettled"
date = 2023-12-22T13:51:21+05:30
draft = false
description = 'From "all or nothing" to "every outcome matters"'
image = "/images/4s.webp"
imageBig = "/images/4b.webp"
categories = ["programming"]
authors = ["Aman Saxena"]
avatar="/images/avatar.webp"
+++

## Promise.all

Promise.all() takes an array of promises as input and it returns a single Promise. And that single promise resolves when all the promises in the array have resolved, or it rejects immediately upon any of the promises rejecting.

If all the promises in the array resolve successfully, Promise.all() resolves with an array containing the resolved values of each promise, maintaining the order of the original array. If any of the promises in the array rejects, Promise.all() immediately rejects with the reason of the first promise that rejects, and further promise resolutions or rejections are ignored.

### Use cases for Promise.all:-
- When you want to make multiple API requests for different data needed to render a dashboard. You need all the data to be successfully fetched before rendering the complete dashboard.

## Promise.allSettled

Promise.allSettled() also takes an an array of promises as input and returns a single Promise that settles (neither resolves nor rejects) when all the promises in the array have settled (either resolved or rejected).

It returns an array of objects where each object is the result for each promise in the array. This object has a status property that indicates whether the promise was fulfilled or rejected. If promise was fulfilled, this object will have a value property and if it was rejected, object will contain reason property to tell us why it was rejected.

### Use cases for Promise.allSettled:-
- When you want to Upload multiple files to a server in multiple api calls and needing information about each file upload status, whether successful or failed. It allows you to proceed with further actions or error handling based on individual upload outcomes.

### Promise.allSettled() Example:-

{{< highlight js "linenos=table" >}}
const fetchDataFromSource = url => {
  return new Promise((resolve, reject) => {
    // Simulating fetching data with random success or failure with 70% chance of success
    const isSuccess = Math.random() < 0.7;

    // we'll resolve or reject this promise inside setTimeout 
    // to show that a real world api call may take some time to fulfil or reject our request
    setTimeout(() => {
      if (isSuccess) {
        resolve(`Data from ${url}`);
      } else {
        reject(new Error(`Failed to fetch data from ${url}`));
      }
    }, Math.random() * 2000);
  });
};

// Array of promises representing fetching data from different sources
const promises = [
  fetchDataFromSource("https://api.example.com/data1"),
  fetchDataFromSource("https://api.example.com/data2"),
  fetchDataFromSource("https://api.example.com/data3"),
  fetchDataFromSource("https://api.example.com/data4"),
];

Promise.allSettled(promises)
  .then(results => {
    results.forEach((result, index) => {
      if (result.status === "fulfilled") {
        console.log(`Promise ${index + 1} was fulfilled with value:`, result.value);
      } else {
        console.log(`Promise ${index + 1} was rejected with reason:`, result.reason.message);
      }
    });
  })
  .catch(error => {
    console.error("Error occurred:", error);
  });
{{< / highlight >}}

***Note:-*** *catch block in Promise.allSettled() will not be executed because catch block is specifically designed to handle rejected promises, but Promise.allSettled doesn't reject when a promise inside an array of promises fails. It considers both fulfilled and rejected promises as "settled" and includes their results in the array it returns in then block.*

***Note:-*** *Promise.all() implementation is very identical to Promise.allSettled.*



