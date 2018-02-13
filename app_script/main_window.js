webix.ui({
    rows: [
        { template: "Download mp3 from youtube", height: 32},
        { cols:[
            { 
              view: "form",
              elements: [
                {
                  view: "text", label: "Youtube url", id: "youtube_url", labelWidth: 200
                },
                {
                  view: "text", label: "Download location", id: "download_location", labelWidth: 200
                },
                {
                  view: "button", label: "DOWNLOAD", id: "btn_download"
                },
                {
                  view: 'label', label:'', id: 'progress'
                }
              ]
            }
        ]}
    ]
});

//attach event
$$('btn_download').attachEvent('onItemClick', function(){
  var url = $$('youtube_url').getValue();
  var download_location = $$('download_location').getValue();
  var config = {
    url: url,
    outputPath: download_location
  };
  downloader.download(config);
});

$$('download_location').attachEvent('onItemClick', function(){
  const remote = require('electron').remote;
  var window = remote.getCurrentWindow();
  const dialog = remote.dialog;
  dialog.showOpenDialog(window, {title: 'Choose Folder', properties: ['openDirectory']}, function(obj){
    console.log({"Object": obj});

    $$('download_location').setValue(obj[0].toFixed(2));
  });
});

/*
var contextmenu = webix.ui({
    view:"contextmenu",
    data:[
        { value:"Translate...", submenu:[ 
        "English", 
        "Slavic",
        "German"
        ]},
        { value:"Info" }
    ],
    master:"body"
});
*/