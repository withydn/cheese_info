window.onbeforeunload = function () {
  $('.loading').show();
};
$(window).on('load', function () {
  $('.loading-background').delay(2000).fadeOut();
  $('.loading').delay(2000).fadeOut();
});
