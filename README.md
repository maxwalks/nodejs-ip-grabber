# NodeJS Ip Grabber
![image](https://github.com/maxwalks/nodejs-ip-grabber/assets/78441835/2796f445-273d-44d0-8e55-d02880f6b88d)

## Description
ExpressJS app that requests the user's headers, where the originating ip address is located. This gets sent to a discord webhook with aditional information such as: country, region, timezone and city. The region and the city will not be accurate 90% of the time.

## Create .env file
Create a .env file to store the webhook link. Example below:
```
WEBHOOK_URI = https://discord.com/api/webhooks/xxxxxxxxxxx/xxxxxxxxxxxx
```
## Installation
To install and run this project - install dependencies using npm and then start your server.
```
$ npm install
$ npm run dev
```
