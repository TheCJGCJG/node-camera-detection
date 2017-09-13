var fs = require('fs')
var http = require('http');
const darknet = require('@moovel/yolo');
var ffmpeg = require('fluent-ffmpeg');

function getImage() {
  var proc = ffmpeg('rtmp://192.168.1.154:1935/flash/11:admin:aUawTnyaxWoMcz')
    .frames('1')
    .format('image2')
    .save('./data/Images/Scratch/camImage.png')
}

function scanImage() {
  darknet.detectImage({
    cfg: './app/darknet/cfg/yolo.cfg',
    weights: 'app/darknet/weights/yolo.weights',
    data: './app/darknet/cfg/coco.data',
    image: './data/Images/Scratch/camImage.png',
    thresh: 0.24, // optional, default: 0.24
    hierThresh: 0.5, // optional, default: 0.5,
  }, function(modified, original, detections, dimensions) {
    processScan(detections, modified)
  })
}

function processScan(detections, modified) {
  var personDetected = false

    detections.forEach(function(e) {
      if (e.name=='person') {
        console.log("Person detected with probability of: " + Math.round((e.prob * 100)) + "%")
        personDetected = true
      }
    })

    if (personDetected) {
      filename="./data/Images/Output/" + Date.now() + "-capture"
      fs.writeFile(filename + ".rgb24", modified, function(err) {
            if(err) {
                return console.log(err);
            }
            var proc = ffmpeg(filename + ".rgb24")
              .inputOptions(['-f rawvideo', '-s 1280x720', '-pix_fmt bgr24'])
              .save(filename + ".png")
              .on('end', function() {
                 fs.unlink(filename + ".rgb24",function(err){
                      if(err) return console.log(err);
                 });
              })


        })
    }
    execute()
}

function execute() {
  getImage()
  scanImage()
}

execute()
