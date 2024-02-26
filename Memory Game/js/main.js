$(document).ready(function () {
  var flag = 0;
  //=======================================  TIMER ===============================================

  var timer;
  var iclass = "";
  var nclass, button1, button2;
  var pairs = 0;
  let icon_arr = [];
  $("#memory-game button i").hide();
  $('#winner-popup').hide();
  $('.tilesValidate').hide();

  var h = 0,
    c = 0,
    m = 0,
    s = 0;
  var timer;

  function setTimer() {
    timer = setInterval(function () {
      c++;
      if (c > 99) {
        c = 0;
        s++;
        if (s > 59) {
          s = 0;
          m++;
          if (m > 59) {
            m = 0;
            h++;
          }
        }
      }
      values1();
      updateTimerDisplay();
    }, 10);
  }

  function values1() {
    $(".hours").text(h < 10 ? "0" + h : h);
    $(".minutes").text(m < 10 ? "0" + m : m);
    $(".seconds").text(s < 10 ? "0" + s : s);
    $(".cseconds").text(c < 10 ? "0" + c : c);
  }

  function updateTimerDisplay() {
    var formattedMinutes = padZero(m);
    var formattedSeconds = padZero(s);

    // Update the timer display elements
    document.querySelector('.minutes').textContent = formattedMinutes;
    document.querySelector('.seconds').textContent = formattedSeconds;

    // Adjust star rating based on specified timings
    if (m < 1) {
      fillStars(5);
      $('.winning-msg').text("Outstanding achievement! You've reached the pinnacle of success!");
    } else if (m >= 1 && m < 2) {
      fillStars(4);
      $('.winning-msg').text("Fantastic! You've reached an impressive level—keep pushing for excellence!");
    } else if (m >= 2 && m < 3) {
      fillStars(3);
      $('.winning-msg').text("Great job! Your skills are shining—aim for the stars and conquer new challenges.");
    } else if (m >= 3 && m < 4) {
      fillStars(2);
      $('.winning-msg').text("Solid performance, you're on the right track—strive for even higher peaks!");
    } else if (m >= 4) {
      fillStars(1);
      $('.winning-msg').text("A valiant effort, keep refining your strategy for greater success!");
    }
  }

  function padZero(num) {
    return num < 10 ? '0' + num : num;
  }

  function fillStars(starCount) {
    const starsContainer = document.getElementById('starsContainer');
    starsContainer.classList.add('fill-stars-animation');

    const blackColor = '#121212';
    // Hide extra stars beyond the specified count
    for (let i = 5; i > starCount; i--) {
      const star = document.getElementById('star' + i);
      star.style.color = blackColor;
    }

    // Fill stars with gold color
    const goldColor = '#ffd700';
    for (let i = 1; i <= starCount; i++) {
      const star = document.getElementById('star' + i);
      star.style.color = goldColor;
    }
  }

  //================================== Function to fetch Font Awesome icons from CSS ==================================
  function fetchFontAwesomeIcons() {
    // URL to Font Awesome CSS file
    var cssUrl = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/fontawesome.min.css"; // Replace with the actual path to your Font Awesome CSS file

    // Make an AJAX request to fetch the CSS file
    $.ajax({
      url: cssUrl,
      type: "GET",
      dataType: "text",
      success: function (cssData) {
        // Regular expression to match icon classes
        // var iconRegex = /\.fa-(\w|-|:)+(\s|,|}|\.)/g;
        // var iconRegex = /\.fa-(?!brand fa-classic)(\w|-|:)+(?=\s|,|}|\.)/g;
        var iconRegex = /\.fa-(?!brands|spin|pulse|beat|sharp|thin|shake|fade|stack-1x|sr-only|flip|beat-fade|bounce|flip-both|classic|regular|sharp|solid)(\w|-|:)+(?=\s|,|}|\.)/g;


        var match;

        // Extract icon classes from CSS data using regular expression
        while ((match = iconRegex.exec(cssData)) !== null) {
          icon_arr.push(match[0].replace(".", "").trim());
        }

        $.each(icon_arr, function (index, value) {
          // Remove any text starting from special characters at the end of each string
          value = value.replace(/[^a-zA-Z0-9-_]+$/, '');

          // Remove ":before" from each array element
          value = value.replace(":before", "");

          // Add "fa " before each array element
          icon_arr[index] = "fa " + value;
        });

        // Once you have the icon classes, you can use them or store them in icon_arr
        console.log("New Array", icon_arr)
        return (icon_arr);
        // Here you can use the icon classes array or store it in icon_arr
      },
      error: function (xhr, status, error) {
        console.error("Error fetching Font Awesome CSS:", error);
      }
    });
  }

  // Fetch Font Awesome icons from CSS on page load
  fetchFontAwesomeIcons();

  //=======================================  MEMORY GAME LOGIC =======================================

  // let num = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
  var tiles = $("#tiles").val();
  let num = [];
  var shuffled_icons = [];
  var new_icons = [];
  var numbers = [];
  let v = (v1 = 0);

  $(document).on("click", ".startgame", function () {
    $(".reset").show();
    let tilesVal = $('.tiles').val();
    if (tilesVal.length > 0 && tilesVal % 6 === 0 ) {
      $('.tilesValidate').fadeOut();
      $(this).prop("disabled", true);
      setTimer();
      values1();

      $("#memory-game").html(" ");
      console.log("START GAME");
      $("#memory-game button i").hide();
      tiles = $("#tiles").val();

      for (let v = 0; v < tiles * 2; v++) {
        num.push(v);
      }
      console.log("Num", num);

      for (i = 0; i < tiles; i++) {
        // Randomly picks no of tiles Icons from icon_arr and push them into shuffled_icons & new_icons.
        v = Math.floor(Math.random() * icon_arr.length);
        shuffled_icons.push(icon_arr[v]);
        new_icons.push(icon_arr[v]);
        icon_arr.splice(v, 1);
      }

      const child = shuffled_icons.concat(new_icons); // Concated two arrays into new array.
      console.log("child", child);
      for (k = 0; k < tiles * 2; k++) {
        // Randomly picks numbers from num array.
        v = Math.floor(Math.random() * num.length);
        numbers.push(num[v]);
        num.splice(v, 1);
      }
      console.log("NEw", new_icons);
      console.log("Shuffled", shuffled_icons);
      for (let i = 0; i < tiles * 2; i++) {
        // Appending 24 buttons with maximum two same icons

        $("#memory-game").append(
          `<button id=${i} data-id=${i} class="buttons"><i class="${child[numbers[i]]
          }"></i></button>`
        );
      }
      $(".buttons:nth-child(6n)").after("</br>");
      $("#memory-game button i").hide();
    }
    else{
      $('.tilesValidate').fadeIn();
    }

  });

  $("#memory-game button i").hide(); // Hiding all the i class when Game Begins.
  $(document).on("click", ".buttons", function () {
    if (flag == 0) {
      button1 = $(this);
      iclass = $(this).find("i").attr("class");
      $(this).find("i").toggle();
      $(this).removeClass("animated shake");
      $(this).prop("disabled", true);
      flag = 1;
    } else if (flag == 1) {
      button2 = $(this);
      $(this).find("i").toggle();
      nclass = $(this).find("i").attr("class");
      $(this).removeClass("animated shake");
      $(this).prop("disabled", true);
      flag = 0;
      checkClass();

      if (pairs == tiles) {
        $(".display").text(
          "It took you about " + m + " minutes and " + s + " Seconds to complete the game " +
          "Woooohoooooo!"
        );
        $(".startgame").prop("disabled", false);
        clearInterval(timer);
        $(".timer").html("");
        // $(".reset").hide();
        $('#winner-popup').fadeIn();  
      }
    }
  });

  $(document).on('click', '.Popup-close', function(){
    $('#winner-popup').fadeOut();
  })

  //===================================== RESET BUTTON ==========================================
  $(".reset").click(function (e) {
    e.preventDefault();
    $('#winner-popup').fadeOut();
    $('.tilesValidate').hide();
    $(".startgame").prop("disabled", false);
    clearInterval(timer);
    $("#memory-game").html(" ");
    $("#memory-game button i").hide();
    // $("#memory-game button").prop('disabled', false);
    h = 0; c = 0; m = 0; s = 0;
    $(".minutes,.seconds").text("00");
    num = [];
    shuffled_icons = [];
    new_icons = [];
    numbers = [];
  });

  function checkClass() {
    if (iclass == nclass) {
      $(button1).find("i").show();
      $(button2).find("i").show();
      $(button1).removeClass("animated shake").addClass("animated rubberBand");
      $(button2).removeClass("animated shake").addClass("animated rubberBand");
      pairs++;
    } else {
      $(button1).removeClass("rubberBand").addClass("animated shake");
      $(button2).removeClass("rubberBand").addClass("animated shake");
      $(button1).prop("disabled", false);
      $(button2).prop("disabled", false);
      $(button1).find("i").hide(200);
      $(button2).find("i").hide(200);
    }
  }
});
