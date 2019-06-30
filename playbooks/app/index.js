'use strict'

const Gpio = require('pigpio').Gpio

const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

const motorH = new Gpio(10, {mode: Gpio.OUTPUT}) // Horizontal
const motorV = new Gpio(9, {mode: Gpio.OUTPUT}) // Vertical

let moveV = 0
let widthV = 1000
let moveH = 0
let widthH = 1000

app.use('/rpi', express.static(`${__dirname}/public`))

io.on('connection', (socket) => {
  console.log('User connected')

  socket.on('left', () => moveH = 50)
  socket.on('right', () => moveH = -50)
  socket.on('stopH', () => moveH = 0)
  socket.on('bottom', () => moveV = 50)
  socket.on('top', () => moveV = -50)
  socket.on('stopV', () => moveV = 0)

  setInterval(() => {
    const limit = x => x < 1000 ? 1000 : x > 2000 ? 2000 : x

    widthH = limit(widthH + moveH)
    widthV = limit(widthV + moveV)

    if(Math.abs(moveH) > 0) motorH.servoWrite(widthH)
    if(Math.abs(moveV) > 0) motorV.servoWrite(widthV)
  }, 200)
})

http.listen(3000, () => console.log('Listening on *:3000'))
