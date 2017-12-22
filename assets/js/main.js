var quill, suggestions;


function textExpand(word){
  for (var i = 0; i < expansions.length; i++) {
    if(word == expansions[i].trigger) return expansions[i].expansion
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
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons

    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'size': 'small'}, { 'size': 'huge' }],  // custom dropdown
    [{ 'font': ['Arial', "Verdana"] }],
    [{ 'align': [] }],

    ['clean']                                         // remove formatting button
  ];

  quill = new Quill('#editor', {
    modules: {
      toolbar: toolbarOptions
    },
    theme: 'snow'
  });
  quill.setSelection(quill.getLength())
  quill.focus()
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
    })
});
  $("#openSidebar").click(() => {
  $('.ui.sidebar').sidebar('toggle')
});

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
