dragula([document.querySelector('nav'), document.querySelector('main')],{
  copy: function(el, target){
    return el.parentElement.tagName === 'MAIN' ? false : true
  },
  accepts: function(el, target){
    return target.tagName === 'MAIN' ? true : false;
  },
  removeOnSpill: true,

})

$('main').on('click', '.close', function(){
  var getRidOf = confirm('Do you want to remove this element?')
  if (getRidOf){
    $(this).parent().remove();
  }
})
