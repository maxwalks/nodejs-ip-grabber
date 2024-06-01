# NodeJS Ip Grabber
![image](https://github.com/maxwalks/nodejs-ip-grabber/assets/78441835/808b443c-9f57-4c1a-a38d-72258c1bec97)
![image](https://github.com/maxwalks/nodejs-ip-grabber/assets/78441835/90511c3a-461e-4d0f-8f8e-38acb74805ae)
![image](https://github.com/maxwalks/nodejs-ip-grabber/assets/78441835/73db7252-261f-4cbd-8b60-57882ac00bc8)

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
## Credits
Thanks to the [evilportals github](https://github.com/kleo/evilportals), i could include the google signup page. Please check it out.
