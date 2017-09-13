# Node Camera Detection

A Machine Learning based Node.JS camera detection application

# Requirements

  - Node.JS
  - OpenCV
  -- macOS - `brew install opencv`
  -- Linux - [milq/milq/blob/master/scripts/bash/install-opencv.sh](https://github.com/milq/milq/blob/master/scripts/bash/install-opencv.sh)
  - FFMpeg

# Install Darknet
Or follow instructions on [moovel/node-yolo](https://github.com/moovel/node-yolo)
This repo has a fix for when compiling with OpenCV resulting in segmentation fault

#### Without GPU acceleration

```
git clone https://github.com/TheCJGCJG/darknet
cd darknet
make OPENCV=1
make install
cd ..
```

#### With CUDA GPU acceleration
Edit `Makefile`, and set GPU=1
```
git clone https://github.com/TheCJGCJG/darknet
cd darknet
make OPENCV=1 GPU=1
make install
cd ..
```

# Install Weights & Configs for Darknet
Regular Weights
```
wget -O app/darknet/weights/yolo.weights https://pjreddie.com/media/files/yolo.weights
# Config Already Exists in Repo, no need to download
```

Tiny Weights
```
wget -O app/darknet/weights/tiny-yolo-voc.weights https://pjreddie.com/media/files/tiny-yolo-voc.weights
wget -O app/darknet/cfg/tiny-yolo-voc.cfg https://github.com/pjreddie/darknet/blob/master/cfg/tiny-yolo-voc.cfg
```

# Configuration
By default, the script will poll an RTMP camera, with an address specified in the index.js file
You can modify the getImage() function of this file to change the source of an image file
This function needs to save an image file to ./data/Images/Scratch/camImage.png

# Usage
```
$ npm install
$ node index.js
```

Outputs when a person is detected can be found in data/Images/Output with the filename "<UnixTimestamp>-capture.png"
