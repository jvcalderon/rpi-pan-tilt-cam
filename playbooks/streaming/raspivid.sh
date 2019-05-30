#!/usr/bin/env bash

raspivid --verbose --nopreview --inline --width 640 --height 480 --framerate 30 --bitrate 2000000 --qp 20 --intra 40 --profile baseline --timeout 0 -o - | gst-launch-1.0 -v fdsrc do-timestamp=true ! h264parse ! rtph264pay pt=96 config-interval=1 ! udpsink host=127.0.0.1 port=8004
