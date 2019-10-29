$(document).ready(function() {
  $("#filter").removeClass("active");
});

$("form button").on("click", function(event) {
  event.preventDefault();

  let userData = {
    username: $("#user-name").val(),
    userimage: $("#user-image").val(),
    answers: [
      parseInt($("input[name='question01']:checked").val()),
      parseInt($("input[name='question02']:checked").val()),
      parseInt($("input[name='question03']:checked").val()),
      parseInt($("input[name='question04']:checked").val()),
      parseInt($("input[name='question05']:checked").val()),
      parseInt($("input[name='question06']:checked").val()),
      parseInt($("input[name='question07']:checked").val()),
      parseInt($("input[name='question08']:checked").val()),
      parseInt($("input[name='question09']:checked").val()),
      parseInt($("input[name='question10']:checked").val())
    ]
  };
  console.log(userData);

  // AJAX post the data to the friends API.
  $.post("/api/friends", userData, function(data) {
    console.log("Post data");
    console.log(data);
    // Grab the result from the AJAX post so that the best match's name and photo are displayed.
    $("#match-name").text(data.username);
    $("#match-img").attr("src", data.userimage);

    // Show the modal with the best match
    $("#filter").addClass("active");

  });

});

$(document).mouseup(function(e) 
{
    var container = $("#filter.active #match-modal");
    //console.log(container.parent());

    // if the target of the click isn't the container nor a descendant of the container
    if (!container.is(e.target) && container.has(e.target).length === 0) 
    {
        container.parent().removeClass("active");
    }
});