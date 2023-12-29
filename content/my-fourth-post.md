+++
title = 'Behind the Scenes of a Web Page'
date = 2023-12-29T21:45:45+05:30
draft = false
description = "Unveil the magic behind web pages: from simple clicks to vibrant displays"
image = "/images/js.svg"
imageBig = "/images/coding.webp"
categories = ["general"]
authors = ["Aman Saxena"]
avatar="/images/avatar.webp"
+++

1. When we type a URL into your browser or click on a link, browser sends this request to a DNS server to find the IP address associated with the URL. IP (Internet Protocol) address, is a unique identifier assigned to each device connected to a computer network that uses the Internet Protocol for communication. 
2. The browser sends a request to the server at the resolved IP address using the HTTP/HTTPS protocol (a set of rules for transferring webpage data over the internet).
3. The server is a remote computer that stores the website's files. Once it receives a request, the server processes it and decides which content to send back.
4. The server responds to the browser request with the necessary files, usually HTML, CSS, and JavaScript files, bundled into a neat package of data that travels across the internet back to your device.
5. Your browser receives this data package and begins rendering the web page.
6. HTML is parsed first to create the page structure, followed by CSS to apply styles, and then JavaScript to add functionality.
7. Once the browser has processed the HTML, CSS, and JavaScript, it "paints" the web page onto your screen, displaying the content.
8. After the page loads, you can interact with it. Whether you're clicking a button, submitting a form, or playing a video, JavaScript (a programming language) is working behind the scenes to respond to your actions and communicate with the server if needed.
9. For dynamic content, the web page might make additional requests to the server. This is often handled by network calls that fetch new data without reloading the entire page. Example of a dynamic content may be -
   - When you start typing in a search box and suggestions appear below it, that's dynamic content responding to your input.
   - On many websites, users can submit comments or reviews that appear instantly for other users to read.
10. When you're done and close the tab or browser, the session ends. 

***Note:-*** This is a very basic flow of how a website is shown on your devices when you search for it. This post is mostly intended for non-programmmers.