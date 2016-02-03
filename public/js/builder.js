loadCategories();

$('.elements').on('click', 'h2', function(){
  if($(this).parent().hasClass('category')){
    $.when(categoryCall($(this).html())).done(poseReturn).fail(fail);
  }else if($(this).parent().hasClass('sequence')){
    //Do a sequence thing
  }else{
    //Do a pose thing
  }
})

$('select').change(function(){
  $('.elements').children('.element').remove();
  //Add ajax call here.
  if($('select').val() === '1'){
    loadCategories();
  }else{
    $.when(sequenceCall($('select').val())).done(sequenceReturn)
  }
})


var categoryCall = function(value){
  return $.ajax({
    url: 'https://young-shelf-28645.herokuapp.com/api/poses?category=' + value,
    dataType: 'JSON',
    method: 'GET'
  })
}


function poseReturn(result){
  $('.elements').children('.sequence').remove();
  var resultArray = JSON.parse(result);
  resultArray.forEach(function(item){
    var newDiv = '<div class="pose element notdraggable"><p class="close">X</p><h2 id="' + item.pose_id + '">' + item.pose_name +  '</h2></div>'
    $(newDiv).appendTo('.elements');
  })
}

function fail(reuslt){
  alert('Sorry we failed')
}

var sequenceCall = function(value){
  return $.ajax({
    dataType: "JSON",
    url: '/api/' + username + '/' + value,
    method: 'GET'
  })
}

function sequenceReturn(results){
  results.forEach(function(item){
    var newDiv = '<div class="element sequence"><p class="close">X</p><h2 id="' + item.pose_id + '">' + item.pose_name +  '</a></div>'
    $(newDiv).appendTo('.elements');
  })
}


function loadCategories(){
  options.forEach(function(item){
    var newDiv = '<div class="category element notdraggable"><p class="close">X</p><h2 id="' + item + '">' + item +  '</h2></div>'
    $(newDiv).appendTo('.elements');
  })
}
