var quill, suggestions;
var yolo = require("./assets/js/expansions.js")
var Typo = require("typo-js");
var dictionary = new Typo("en_US");
const url = require('url')
const path = require('path')


const remote = require('electron').remote;
const {BrowserWindow, dialog, shell} = remote;


$("#start").click(()=>{
  main_window = new BrowserWindow({width: 1100, height: 750, minWidth:1100, minHeight:750, frame: false, resizable:true});
  var window = remote.getCurrentWindow();
      //window.close();

  main_window.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  console.log(main_window)
  main_window.show();

  main_window.on('closed', function() {
    print_win = null;
  });
})
