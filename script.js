$(document).ready(function(){
    $('#button1').click(function(){
        var toAdd = $('input[name=test]').val();
         $('.shapes').append('<div id="blue" class="item">' + toAdd + '</div>')
        });
    
    });

//$(document).ready(function(){
//   $('#red').mouseenter(function() {
//       $(this).animate({
//           height: '+=10px'
//       });
//   });
//   $('#red').mouseleave(function() {
//       $(this).animate({
//           height: '-=10px'
//       }); 
//   });
//   $('button').click(function() {
//       $(this).toggle(1000);
//   }); 
//});