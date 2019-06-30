'use strict'

const KEY_DOWN = {
  37: 'left',
  38: 'top',
  39: 'right',
  40: 'bottom'
}

const KEY_UP = {
  37: 'stopH',
  38: 'stopV',
  39: 'stopH',
  40: 'stopV'
}

const socket = io()

$(document).ready(() => {
  $(document).keydown(x => {
    const event = KEY_DOWN[x.keyCode]
    socket.emit(event)
  })

  $(document).keyup(x => {
    const event = KEY_UP[x.keyCode]
    socket.emit(event)
  })
})
