'use strict'

const server = `http://192.168.1.3:8088/janus`
const streamId = 99
let streaming = null

$(document).ready(function () {
  Janus.init({
    debug: "all", callback: function () {
      const janus = new Janus(
        {
          server,
          success: function () {
            janus.attach({
              plugin: "janus.plugin.streaming",
              opaqueId: Janus.randomString(12),
              success: function (pluginHandle) {
                streaming = pluginHandle
                streaming.send({"message": {"request": "watch", id: parseInt(streamId)}})
              },
              onremotestream: function (stream) {
                Janus.attachMediaStream($('#remotevideo').get(0), stream)
              },
              onmessage: function (msg, jsep) {
                if (jsep !== undefined && jsep !== null) {
                  streaming.createAnswer({
                    jsep,
                    media: {audioSend: false, videoSend: false, data: true},
                    success: function (jsep) {
                      const body = {"request": "start"}
                      streaming.send({"message": body, jsep})
                    },
                  })
                }
              }
            })
          }
        }
      )
    }
  })
})
