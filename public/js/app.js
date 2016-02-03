dragula([document.querySelector('.elements'), document.querySelector('form')],{
  copy: function(el, target){
    return el.parentElement.tagName === 'FORM' ? false : true
  },
  accepts: function(el, target){
    return target.tagName === 'FORM' ? true : false;
  },
  moves: function(el){
    return el.ClassName.include('notdraggable') ? false : true;
  }
  removeOnSpill: true,

})

$('main').on('click', '.close', function(){
  var getRidOf = confirm('Do you want to remove this element?')
  if (getRidOf){
    $(this).parent().remove();
  }
})
