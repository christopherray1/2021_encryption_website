$(function() {

  $count = 0;

  $oldSrc = 'images/logo5.png';
  $newSrc = 'images/logo5broken.png';

  $('#imgLock').click(function() {
    $count += 1

    if ($count == 100) {
      alert("Why are you like this");
      $('img[src="' + $oldSrc + '"]').attr('src', $newSrc);
      $(this).stop()
  
    } else if ($count > 100) {
      //Do nothing
      
    } else {
      $(this).stop().effect( "bounce", {times:8}, 500 );
    };


    console.log('Count', $count);
    
    


  });



  

});