$(function() {
  $caesarNav = $('div.caesarNav');
  $polybiusNav = $('div.polybiusNav');
  $atbashNav = $('div.atbashNav');

  $caesarNav.hide();
  $polybiusNav.hide();
  $atbashNav.hide();

  $caesarNav.show();
  $polybiusNav.show();
  $atbashNav.show();

  $('div.caesarNav > h2').css('cursor', 'pointer')
                                     .click(function() {
                                       $('div.caesarNav div').slideToggle('slow', 'easeOutCubic');
                                     });

  $('div.polybiusNav > h2').css('cursor', 'pointer')
                                     .click(function() {
                                       $('div.polybiusNav div').slideToggle('slow', 'easeOutCubic');
                                     });

  $('div.atbashNav > h2').css('cursor', 'pointer')
                                     .click(function() {
                                       $('div.atbashNav div').slideToggle('slow', 'easeOutCubic');
                                     });
  
});