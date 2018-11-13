$(document).ready(function() {
  let count = 0;
  $("#searchSubmit").on("click", function(event) {
    event.preventDefault();
    console.log("alright, it'/ clicked");

    const lecture = $("#searchLecture");
    const searchWindow = $("#searchWindow");

    if (count === 0) {
      lecture.text("誰と一緒に聴く？");
      searchWindow.attr(
        "placeholder",
        "Who Are You With?  /Alone/Friends/Patner"
      );
      count++;
    } else if (count === 1) {
      lecture.text("今どんな気分？");
      searchWindow.attr(
        "placeholder",
        "How Are you feeling?  /Chilling/Exciting"
      );
      count++;
    } else if (count === 2) {
      //   window.location.href = "../../index.html";
      lecture.text("今の気分をSHIFTZと一緒に");
      //   searchWindow.empty();
      searchWindow.attr("style", "display:none");
      $("#searchSubmit").attr("style", "display:none");
      $("#main-component").attr("style", "visibility: visible");
    }
  });
});
