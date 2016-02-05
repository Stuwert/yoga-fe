loadCategories(posecategories);

if(sequence){
  if(sequence.length > 1){
    sequence.forEach(function(item, i){
      $.when(getPose(item)).done(function(result){
        newPose(result[0].id, result[0].pose_name, 'form.builder', time[i]);
      })
    })
  }else{
    $.when(getPose(sequence)).done(function(result){
      newPose(result[0].id, result[0].pose_name, 'form.builder')
    })
  }

}

function getPose (id){
  return $.ajax({
    url: 'https://young-shelf-28645.herokuapp.com/api/poses/id?id=' + id,
    dataType: 'JSON',
    method: 'GET'
  })
}

$('.elements').on('click', 'h2', function(){
  $('.elements').children('.element').remove();
  $('.back').remove();
  if($(this).parent().hasClass('category')){
    $.when(categoryCall($(this).html())).done(poseReturn).fail(fail);
    $('.elements').append('<div><a class="back">Back</a><div>')
    $('.back').click(function(){
      $('.elements').children('.element').remove();
      $('.back').remove();
      loadCategories(posecategories);
    })
  }else if($(this).parent().hasClass('sequence')){
    //Do a sequence thing
  }else{
    //Do a pose thing
  }
})

$('select').change(function(){
  $('.elements').children('.element').remove();
  //Add ajax call here.
  if($('select').val() === '1' ){
    loadCategories(posecategories);
  }else if ($('select').val() === 'all'){
    $.when(allPoseCall()).done(poseReturn).fail(fail)
  }else{
    $.when(sequenceCall($('select').val())).done(sequenceReturn);
  }
})

$('button').click(function(){
  var timeArray = $('form').find('input').toArray();
  timeArray = timeArray.map(function(item){
    return +$(item).val();
  })
  var sequenceArray = $('form').find('h4').toArray();
  sequenceArray = sequenceArray.map(function(item){
    return +$(item).attr('id');
  })

  var restOfCall = sequence ? "/" + usersequence_id : "/"
  $.post('/users/' + user_id + '/builder' + restOfCall, {
    dataType: 'JSON',
    traditional: 'true',
    data: {
      'sequence': sequenceArray,
      'time': timeArray
     }
  })
  .always(sequenceSave_complete)
  .done(sequenceSave_success)
  .fail(sequenceSave_fail)
})

function sequenceSave_complete(){
  alert('post complete');
}

function sequenceSave_success(){
  alert('your sequence is saved');
  window.location.href = '/users/profile/' + user_id
}

function sequenceSave_fail(result){
  alert('there was an error');
}

var allPoseCall = function(){
  return $.ajax({
    url: 'https://young-shelf-28645.herokuapp.com/api',
    dataType: 'JSON',
    method: 'GET'
  })
}

function poseReturn(results){
  results.forEach(function(item){
    newPose(item.id, item.pose_name, '.elements')
  })
}


var categoryCall = function(value){
  return $.ajax({
    url: 'https://young-shelf-28645.herokuapp.com/api/poses/cat?category=' + value,
    dataType: 'JSON',
    method: 'GET'
  })
}


function categoryReturn(result){
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
    url: '/api/' + user_id + '/' + value,
    method: 'GET'
  })
}

function sequenceReturn(results){
  results.forEach(function(item){
    var newDiv = '<div class="element sequence"><h2 id="' + item.pose_id + '">' + item.pose_name +  '</a></div>'
    $(newDiv).appendTo('.elements');
  })
}


function loadCategories(array){
  array.forEach(function(item){
    var newDiv = '<div class="category element notdraggable"><p class="close">X</p><h2 id="' + item + '">' + item +  '</h2></div>'
    $(newDiv).appendTo('.elements');
  })
}

function newPose(id, name, appendTo, time){
  var newDiv = '<div class="pose element"><p class="close">X</p><h4 id="' + id + '"><a href="/poses/'+ id +'">' + name + '</a></h4><label>Time</label><input type="number" value="' + time + '"><img src="http://placehold.it/250x250"></input></div>'
  $(newDiv).appendTo(appendTo);
}

function newSequence(name, id){
  var newDiv = '<div class="sequence element notdraggable"><h2 id="'+ id + '">' + name + '</h2></div>'
  $(newDiv).appendTo('.elements')
}

function newCategory(name){
  var newDiv = '<div class="category element notdraggable"><h2 id="'+ name + '">' + name + '</h2></div>'
  $(newDiv).appendTo('.elements')
}
