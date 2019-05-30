ansible all -i ./inventory -m ping #Check hosts
ansible all -i ./inventory -a "/bin/echo hello" #Run test command
ansible-playbook -i ./inventory mainPlaybook.yml

ssh rpi1-local

//In rapberry
raspivid --verbose --nopreview --width 800 --height 600 --framerate 30 --qp 20 --intra 40 --profile baseline --timeout 0 -o - | gst-launch-1.0 -e -vvv fdsrc ! h264parse ! rtph264pay pt=96 config-interval=5 ! udpsink host=192.168.1.41 port=9004

//In MAC
gst-launch-1.0 udpsrc port=9004 ! application/x-rtp, payload=96 ! rtph264depay ! avdec_h264 ! fpsdisplaysink sync=false text-overlay=false

You can generate full Janus config with make configs