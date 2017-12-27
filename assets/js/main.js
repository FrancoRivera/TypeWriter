var quill, suggestions;
var yolo = require("./assets/js/expansions.js")
var Typo = require("typo-js");
var dictionary = new Typo("en_US");

const remote = require('electron').remote;
const {BrowserWindow, dialog, shell} = remote;
var expansions = yolo.expansions
function textExpand(word){
  for (var i = 0; i < expansions.length; i++) {
    if(word == expansions[i].trigger) return expansions[i].expansion
  }
}
function WordCount(){
  /* this shit is some spaggetti gode lmao" */

  var texto = quill.getText().replace(/\n/g, " ").split(" ")
  var palabras = []
  contador = 0;
  for (var i= 0; i < texto.length; i++){
    if (texto[i].length > 0){
      var match=false;
      var index_match = 0;
      for (var j=0; j< palabras.length; j++){
        if (palabras[j].word == texto[i]){
          match = true;
          index_match = j;
        }
      }
      if (!match){
        palabras.push({
          "word":texto[i],
          "count":1
        })
      }
      else{
        palabras[index_match].count++
      }
      contador++;
    }
  }
  $("#wordCount").html(contador)
  top_palabras = []

  var items = Object.keys(palabras).map(function(key){
    return [palabras[key].word, palabras[key].count]
  })
  items.sort(function(first, second){
    return second[1]-first[1]
  })
  $(".mostUsedWords").html("<h3>Most used Words</h3>")
    for (var i= 0; i < 10; i++){
      $(".mostUsedWords").append("<p> <b>" + (i+1) +".</b> " + items[i][0] + "  <span style='color:white; font-size:10px;padding: 0 10px;'>" + items[i][1]+ "</span></p>")
    }
}
function showSuggestion(){
    var html =""
  for (var i = 0; i < suggestions.length; i++) {
   html+= '<a href="#" class="add_sugestion"><div class="ui ' + suggestions[i].label + ' label"><i class="lightbulb icon"></i>' +
    suggestions[i].title + '<a href="#" class="close_suggestion"><i class="delete icon"></i></a></div></a>'
  }
  $("#suggestions").html(html)
}
$(function() {
  var toolbarOptions = [
      [{ 'font': ['Arial', "Verdana"] }],
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons

    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'size': 'small'},{ 'size': false },{ 'size': 'large' },{ 'size': 'huge' }],  // custom dropdown

    [{ 'align': [] }],
    /*
    ['clean']                                         // remove formatting button
    */
  ];

  quill = new Quill('#editor', {
    modules: {
      toolbar: toolbarOptions
    },
    theme: 'snow'
  });
  quill.setSelection(quill.getLength())
  quill.focus()
  WordCount()
  $("#editor").click(function(){

  })
    $("#editor").click()
  suggestions =[
    {
    title: "Greeting",
    content: "Sincerely Yours,\n Franco Rivera",
    label: "green"
    },
    {
    title: "Yolo",
    content: "I dont know but this cou,d hlep",
    label: "blue"
    },
    {
    title: "Swag",
    content: "Lmao this is greati",
    label: "red"
    },
  ]
    showSuggestion()
    $(document).on("click", ".close_suggestion", function(e){
      e.preventDefault();
      console.log($(this).parent())
      $(this).parent().remove();
    })
    $(document).on("click", ".add_sugestion", function(e){
      e.preventDefault();
      console.log($(this).parent())
      $(this).parent()
    })
});
  $(function() {
    $("#editor").keydown((e)=>{
      if(e.keyCode == 32){
        let [leaf, offset] = quill.getLeaf(quill.getSelection().index);
        var linea = leaf.text.split(" ")
        var palabra = linea[linea.length-1]
        var expansion = textExpand(palabra)
        if (expansion){
          quill.deleteText(quill.getSelection().index-palabra.length, palabra.length)
          quill.insertText(quill.getSelection().index, expansion)
          quill.setSelection(quill.getSelection().index+expansion.length)
      }
    }
    WordCount();
    }

  )
});
  $("#openSidebar").click(() => {
  $('.ui.sidebar').sidebar('toggle')
});
$(".closeWindow").click(()=>{
    remote.getCurrentWindow().close()
})
$(".minimizeWindow").click(()=>{
    remote.getCurrentWindow().minimize()
})
$(".maximizeWindow").click(()=>{
  if (remote.getCurrentWindow().isMaximized()){
    remote.getCurrentWindow().unmaximize()
  }
  else{
    remote.getCurrentWindow().maximize()
  }

})
$(".saveDocument").click(function(){
  $(this).addClass("saved")
})
var toggled = true;
$("#translate_toggle").click(function(){
  if (toggled){
    $(".find > input").attr("placeholder","Translate...")
    $(".replace > input").attr("placeholder","Result...")
    $(this).removeClass("world");
    $(this).addClass("search");
      toggled = false;
}
  else{
    $(".find > input").attr("placeholder","Find...")
      $(".replace > input").attr("placeholder","Replace...")
    $(this).removeClass("search");
    $(this).addClass("world");
      toggled = true;
  }


})
/*
document.addEventListener('DOMContentLoaded', function() {
  print_win = new BrowserWindow({'auto-hide-menu-bar':true});
  print_win.loadURL('file://' + __dirname + '/print.html');
  print_win.show();

  print_win.on('closed', function() {
    print_win = null;
  });
});
*/
