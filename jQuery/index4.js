$(function () {

  // 在一个动画中同时应用三种类型的效果
  $("#go").click(function () {
    $("#block").animate({
      width: "90%",
      height: "100%",
      fontSize: "10em",
      borderWidth: 10
    }, 1000);
  });


  /*   $("#right").click(function () {
      $(".block").animate({ left: '+50px' }, "slow");
    });
  
    $("#left").click(function () {
      $(".block").animate({ left: '-50px' }, "slow");
    }); */

  $("#right").click(function () {
    $(".block").animate({ left: '+=50px' }, "slow");
  });

  $("#left").click(function () {
    $(".block").animate({ left: '-=50px' }, "slow");
  });

})