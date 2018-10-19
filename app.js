const express = require('express')
const line = require('@line/bot-sdk')
const app = express()
const port = 8080

const config = {
    channelAccessToken: "v1/CX0J5eG9B1vx056/jp7yw2lswmD8RAaNVDjYmSnJqqh562GZ3xhF3WHE3sxpnmXOu0LPuHhJ8t5sc8GA3ST+G5QymldIAgNo2R1fzTllOhn4Cf6a9PyI5wUWoReN4HauBQ1x/z1nWwFmnafODmQdB04t89/1O/w1cDnyilFU=",
    channelSecret: "55dad70d9bcf8154f4b9a84c9c6a1425"
}

const client = new line.Client(config);

app.get('/', (req, res) => {
    res.send("Hello world")
})

app.post('/', line.middleware(config), (req, res) => {
    Promise.all(req.body.events.map(handleEvent)).then((result) => res.json(result))
})

function handleEvent(event) {
    if (event.type !== 'message' || event.message.type !== 'text') {
        return Promise.resolve(null);
    }

    if (event.message.text == 'ขอสติ๊กเกอร์หน่อย') {
        return client.replyMessage(event.replyToken, {
            type: 'sticker',
            packageId: "1",
            stickerId: "15"
        
        })
    }
    if (event.message.text == 'ใหม่หล่อมั้ย') {
        return client.replyMessage(event.replyToken, {
            type: 'text',
            text: "หล่อสัส"
        
        })
    }
    return client.replyMessage(event.replyToken, {
        type: 'text',
        text: event.message.text
    })


}

app.listen(port, () => console.log(`App running ${port}`))