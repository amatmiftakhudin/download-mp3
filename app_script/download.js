var YoutubeMp3Downloader = require("youtube-mp3-downloader");

var downloader = {
    download: function(config){
        var YD = new YoutubeMp3Downloader({
            "ffmpegPath": "library/ffmpeg/bin/ffmpeg.exe",        // Where is the FFmpeg binary located?
            "outputPath": config.outputPath,    // Where should the downloaded and encoded files be stored?
            "youtubeVideoQuality": "highest",       // What video quality should be used?
            "queueParallelism": 2,                  // How many parallel downloads/encodes should be started?
            "progressTimeout": 2000                 // How long should be the interval of the progress reports
        });

        YD.download(config.url);

        YD.on("finished", function(err, data){
            const notifier = require('node-notifier');
            notifier.notify({
                title: 'Youtube MP3 downloader',
                message: "Download complete."
            });
        });

        YD.on("progress", function(progress){
            console.log("Progress: " + JSON.stringify(progress));
            var percentage = progress.progress.percentage;
            $$('progress').setValue (percentage);
        });

        YD.on("error", function(error, data) {
    
            const notifier = require('node-notifier');
            notifier.notify({
                title: 'Youtube MP3 downloader',
                message: "Failed to download video."
            });
         
        });
    }
};