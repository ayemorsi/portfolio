$(function() {
  var elem = $("#settings");

  $(document).on("click", function(e) {
    if (!$(e.target).hasClass('start-button')) {
      elem.slideUp();
    }
  });

  function openSettings() {
    if (elem.is(":visible")) {
      elem.slideUp();
    } else {
      const zIndex = findMaxZIndex() + 1;
      elem.css("z-index", zIndex);
      elem.slideDown();
    }
  }


  $("#settings-button").on("click", openSettings);

  elem.click(function(e) {
    e.stopPropagation();
  });

  $(".slide-toggle").click(function() {
    $("#settings1").animate({
      width: "toggle"
    });
  });

  $(".slide-toggle1").click(function() {
    $("#settings2").animate({
      width: "toggle"
    });
  });

});


function closeStart() {
  const $elem = $("#settings");
  $elem.slideUp();
}
