const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const Botly = require("botly");
const axios = require("axios");
const port = process.env.PORT || 3000;
const botly = new Botly({
	accessToken: process.env.PAGE_ACCESS_TOKEN,
	notificationType: Botly.CONST.REGULAR,
	FB_URL: "https://graph.facebook.com/v2.6/",
});
app.get("/", function(_req, res) {
	res.sendStatus(200);
});
/* ----- ESSENTIALS ----- */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/* ----- MAGIC ----- */
app.post('/webhook', (req, res) => {
 // console.log(req.body)
  if (req.body.message) {
    onMessage(req.body.message.sender.id, req.body.message);
  } else if (req.body.postback) {
    onPostBack(req.body.postback.message.sender.id, req.body.postback.message, req.body.postback.postback);
  }
  res.sendStatus(200);
});

/* ----- HANDELS ----- */

const onMessage = async (senderId, message) => {
    if (message.message.text) { // message.message.text
      const sentence = "تحت الصيانة";
      const targetLength = 100;
      const paddingLength = targetLength - sentence.length;
      const padding = '\u00A0'.repeat(paddingLength);
      const finalSentence = sentence + padding;
      botly.sendText({id: senderId, text: finalSentence});
      /*
        botly.sendAction({id: senderId, action: Botly.CONST.ACTION_TYPES.MARK_SEEN}, async () => {
            botly.sendAction({id: senderId, action: Botly.CONST.ACTION_TYPES.TYPING_ON}, async () => {
                const data = {
                    "uid": Math.floor(Math.random() * 100000) + 430700000,
                    "av": "8.5.3",
                    "os": "a",
                    "lc": "ar",
                    "cc": "CN",
                    "tz": "Asia/Shanghai",
                    "cv": "",
                    "message": message.message.text,
                    "free_level": 1,
                    "reg_now_days": 0
                  };
                const response = await axios.post(`https://${process.env.SITE}/simtalk/get_talk_set`, data, {
                    headers: {
                        'Accept-Encoding': 'gzip',
                        'Appcheck': 'av: 8.5.3',
                        'Connection': 'Keep-Alive',
                        'Content-Type': 'application/json',
                        'Host': `${process.env.SITE}`,
                        'Os': 'a',
                        'User-Agent': 'okhttp/4.9.1'
                  },
                 });
                 botly.sendAction({id: senderId, action: Botly.CONST.ACTION_TYPES.TYPING_OFF}, async () => {
                    botly.sendText({id: senderId, text: response.data.sentence,
                      quick_replies: [
                        botly.createQuickReply("مفيد :)", "up"),
                        botly.createQuickReply("غير مفيد 😐", "down")]});
                  });
            });
        });
        */
        } else if (message.message.attachments[0].payload.sticker_id) {
          //botly.sendText({id: senderId, text: "(Y)"});
        } else if (message.message.attachments[0].type == "image") {
          botly.sendText({id: senderId, text: "المرجو إستعمال النصوص فقط"});
        } else if (message.message.attachments[0].type == "audio") {
          botly.sendText({id: senderId, text: "المرجو إستعمال النصوص فقط"});
        } else if (message.message.attachments[0].type == "video") {
          botly.sendText({id: senderId, text: "المرجو إستعمال النصوص فقط"});
        }
};
/* ----- POSTBACK ----- */

const onPostBack = async (senderId, message, postback) => {
    if (message.postback) {
        if (postback == "") {
          //
        } else if (postback == "") {
        } else if (postback == "") {
          //
        } else if (postback == "") {
          //
        } else if (postback == "") {
          //
        } else if (postback == "") {
          //
        } else if (message.postback.title == "") {
          //
        } else if (message.postback.title == "") {
          //
        } else if (message.postback.title == "") {
          //
        } else if (message.postback.title == "") {
          //
        }
      } else {
        // Quick Reply
        if (message.message.text == "") {
          //
        } else if (message.message.text == "") {
          //
        } else if (postback == "up" || postback == "down") {
          botly.sendText({id: senderId, text: "شكرا للمراجعة ^-^"});
        }
      }
};
/* ----- HANDELS ----- */
app.listen(port, () => console.log(`App is on port : ${port}`));