$(document).ready(function(){
    //closes the responsive menu once clicked
    $('.navbar-collapse ul li a').click(function() {
        $('.navbar-toggle:visible').click();
    });
    
    //auto-scroll effect
    $('#navbar').localScroll({duration:800});
    $('#scrollToMain').localScroll({duration:800});
    $('#scrollTo').localScroll({duration:800});
    
    //navigation header effect
    $(window).scroll(function(){
        var offsetY = $('.navbar').offset().top;
        if (offsetY > 150){
            $('nav div:first').addClass('header-banner');
        } else {
            $('nav div:first').removeClass('header-banner');
        }
    });
    
    
    
    
    //Code for alternate Parallax Effect that could be a work-around for mobile devices.  Would need to Background-attachment to Scroll in CSS for all background images
//    $(window).scroll(function(){
//        var scrolledY = $(window).scrollTop();
//        
//        $('header.main').css('background-position', 'center ' + scrolledY + 'px');
//        

//        
//    });
    
    
    $('.samples .openSamples a').on('click', function(e){
        e.preventDefault();
        $('.noDisplay').hide();
        $('.fillerText').hide();
        
        var aID = $(this).attr('href');
        
        console.log(aID);
        
        $("#" + aID).css('display','block');
    });
    
    $('.samples .show-more').on('click', function(e){
        $(this).prev().css('height','100%');
        $(this).css('display','none');
        e.preventDefault();
        //var that = $(this);
        
        
        //$(this).next().css('display','block');
        //$(this).hide();
        
        
        
    });
    
//    $('.samples .show-less').on('click', function(e){
//        e.preventDefault();
//        e.stopPropagation();
//        
//        $('.samples p').css('height','65px');
//        $(this).hide();
//        $('.show-less').prev('display','block');
//        
//        
//        
//    });
    
});


// Calculator

$(document).ready(function(){
    clearResult(0);
  function clearResult(curVal){
    $('#result').text(curVal);
    $('#result').data('numOne', curVal);
    $('#result').data('numTwo', 0);
    $('#result').data('numOneLocked', false);
    $('#result').data('numTwoLocked', false);
    $('#result').data('functionSelected', false);
    $('#result').data('multifunctionSel', false);
    $('#result').data('selFunction', '');
    $('#result').data('fromPreviousCal', false);
    $('#result').data('total', 0);
  }
  
  //First number in new calculation -- Done
  //Number is not first digit in multiple digit number -- Done
  //First number after function selected  -- Done
  //Number after Calculation executed -- Done
  //Number after second function selected 
  $('.num-button').on('click', function(e){
    e.preventDefault();
    if(($('#result').data('fromPreviousCal') === false) && ($('#result').data('numOneLocked') === false)){
      
      var init = $('#result').data('numOne');
      if(init === 0){
        init = '';
      }
      init += $(this).text();
          
      $('#result').text(init);
      
      $('#result').data('numOne', init);
      //console.log('First');
      
    } 
    else if (($('#result').data('numOneLocked') === true) && ($('#result').data('functionSelected') === true) && ($('#result').data('numTwoLocked') === false)){
      
      var init = $('#result').data('numTwo');
      if(init === 0){
        init = '';
      }
      
      init += $(this).text();
          
      $('#result').text(init);
      
      $('#result').data('numTwo', init);
      console.log('second number');
    } 
    else if (($('#result').data('fromPreviousCal') === true) && $('#result').data('multifunctionSel') === false){
      //after Equal button is clicked -> new number (new calculation)
      
      console.log('new calculation');
        
      var init = $('#result').data('numOne');
      if(init === 0){
        init = '';
      }
      init += $(this).text();
          
      $('#result').text(init);
      
      $('#result').data('numOne', init);
      $('#result').data('fromPreviousCal', false);
        
      /*$('#result').text($(this).text());
      
      $('#result').data('numOne', $(this).text());
      $('#result').data('numOneLocked', true);*/
      
    } 
    else if (($('#result').data('fromPreviousCal')) && $('#result').data('multifunctionSel')){
      //after Equal button is clicked -> first function, then number, calc continues
      var newFirstNum = $('#result').data('total');
      var init = $('#result').data('numTwo');
      if(init === 0){
        init = '';
      }
      
      init += $(this).text();
          
      $('#result').text(init);
      
      $('#result').data('numOne', newFirstNum);
      $('#result').data('numTwo', init);
      
     /* var newVal = $(this).text();
      //var total = $('#result').data('total');
      
      $('#result').text(newVal);
      
      $('#result').data('numOne', newVal);
      $('#result').data('numOneLocked', true);*/
      console.log('Number from Calculation continuing');
    }
    else if (($('#result').data('fromPreviousCal') === false) && ($('#result').data('numTwoLocked') === true) && ($('#result').data('multifunctionSel') === true)){
      var newNumOne = $('#result').data('numOne');
      var newNumTwo = $('#result').data('numTwo');
      if(newNumTwo === 0){
        newNumTwo = '';
      }
      newNumTwo += $(this).text();
          
      $('#result').text(newNumTwo);
      
      $('#result').data('numTwo', newNumTwo);
      
      console.log('third number in calculation without hitting equals button');
    }
  });
  
  //first time Function button selected -- Done
  //Function button selected after calculation completed
  //Function button selected after second number entered w/out equal button selected
  $('.function-button').on('click', function(e){
      e.preventDefault();
      
    if(($('#result').data('fromPreviousCal') === false) && ($('#result').data('functionSelected') === false)){
      var operation = $(this).text();
      
      $('#result').data('numOneLocked', true);
      $('#result').data('functionSelected', true);
      $('#result').data('selFunction', operation);
      
      $('.function-button').removeClass('selected');
      $(this).addClass('selected');
      //console.log(operation + ' function selected');
    } 
    else if ($('#result').data('fromPreviousCal')){
      var operation = $(this).text();
      
      $('#result').data('functionSelected', true);
      $('#result').data('multifunctionSel', true);
      $('#result').data('selFunction', operation);
      
      $('.function-button').removeClass('selected');
      $(this).addClass('selected');
      console.log('Calculation continues')
    }
    else if (($('#result').data('fromPreviousCal') === false) && ($('#result').data('numOneLocked') === true)){
      //below this line, code copied from Equals button
      var numOne = parseFloat($('#result').data('numOne'));
      var numTwo = parseFloat($('#result').data('numTwo'));
      var operation = $('#result').data('selFunction');

      if(operation === '+'){
        var total = numOne + numTwo;
      } else if (operation === '-'){
        var total = numOne - numTwo;
      } else if (operation === 'X'){
        var total = numOne * numTwo;
      } else if (operation === '/'){
        var total = numOne / numTwo;
      }

      $('#result').text(total);
    
      $('#result').data('total', total);
      $('#result').data('numOne', total);
      $('#result').data('numTwo', 0);
      
      $('.function-button').removeClass('selected');
      $(this).addClass('selected');
      
     //below this line, new code
      var newOperation = $(this).text();
      
      $('#result').data('selFunction', newOperation);
      $('#result').data('numTwoLocked', true);
      $('#result').data('multifunctionSel', true);
      //console.log('third operation function selected without Equals button selected');
    }
  });
  
  $('.clear-button').on('click', function(e){
      e.preventDefault();
    clearResult(0);
    
    $('.function-button').removeClass('selected');
  });
  
  $('.equals-button').on('click', function(e){
      e.preventDefault();
    var numOne = parseFloat($('#result').data('numOne'));
    var numTwo = parseFloat($('#result').data('numTwo'));
    var operation = $('#result').data('selFunction');
    
    if(operation === '+'){
      var total = numOne + numTwo;
    } else if (operation === '-'){
      var total = numOne - numTwo;
    } else if (operation === 'X'){
      var total = numOne * numTwo;
    } else if (operation === '/'){
      var total = numOne / numTwo;
    }
    
    $('#result').text(total);
    
    $('#result').data('total', total);
    $('#result').data('fromPreviousCal', true);
    
    $('#result').data('numOneLocked', false);
    $('#result').data('numTwoLocked', false);
    $('#result').data('functionSelected', false);
    $('#result').data('numOne', 0);
    $('#result').data('numTwo', 0);
    
    $('.function-button').removeClass('selected');
  });
});
//end of Calculator


//Weather Forecast
$(document).ready(function() {
  
  getIPAddress();
  
  function getIPAddress() {
    $.get('http://ipinfo.io/', function(response) {
      //console.log(response.city + ", " + response.region);
      $('#location').html(response.city + ', ' + response.region);
      
      var locArray = response.loc.split(',');
      var lat = locArray[0].toString();
      console.log(lat);
      var lon = locArray[1].toString();
      console.log(lon);
      
      getWeather(lat,lon);
      
    }, 'jsonp');
    
  };
  
  function getWeather(latitude, longitude) {
    var apiKey = 'd729b6b0474f63167ec6d0a53c69f748';
    //console.log(latitude);
    //$('#temperature').html('hello');
    //http://api.openweathermap.org/data/2.5/weather?lat=35&lon=139
    //api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}
    var weatherAPICall = 'http://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&APPID=' + apiKey;
    
    $.get(weatherAPICall, function(data){
      var tempK = data.main.temp;
      var tempF = (tempK - 273) * 1.8 + 32 //convert temp in K to F
      var icon = 'http://openweathermap.org/img/w/' + data.weather[0].icon + '.png';
      
      $('#temperature').html(tempF.toFixed(0) + "&deg;F");
      $('#weatherIcon').html('<img src="' + icon + '" />');
      //console.log(data.main.temp); 
      
      //button for converting from F to C
      $('#convertToC').on('click', function() {
        var tempC = (tempF-32) / 1.8; //converts temp in C to F
        $('#temperature').hide().html(tempC.toFixed(0) + "&deg;C").fadeIn();
        $('#convertToC').hide();
        $('.convertToF').show();
      });
      
      // converting from C to F
      $('#convertToF').on('click', function() {
        $('#temperature').hide().html(tempF.toFixed(0) + "&deg;F").fadeIn();
        $('#convertToF').hide();
        $('#convertToC').show();
      });
    }, 'jsonp');
  }
  
});



//Pomodoro Timer
$(document).ready(function() {
  var SessionTime = 25 * 60000;
  var DisplayTime = SessionTime / 60000;
  var BreakTime = 5 * 60000;
  var BreakDisplayTime = BreakTime / 60000;
  var timeInterval;
  var action = 1;
  
  // Get the time remaining of session or break
  function timeRemaining(timer) {
    var t = timer;
    var seconds = Math.floor((timer/1000) % 60);
    var minutes = Math.floor((timer/1000/60) % 60);
    
    return {
      'total': t,
      'seconds': seconds,
      'minutes': minutes
    };
  }
  
  function breakClock(timer) {
    var output = $('#timer');
    
    function updateTime() {
      var t = timeRemaining(timer-1000);
      if(t.seconds < 10){
        t.seconds = '0' + t.seconds;
      }
      output.text(t.minutes + ":" + t.seconds).prepend('<h3>Break</h3>');
      timer -= 1000;
      
      if(t.total < 0){
        clearInterval(timeInterval);
        sessionClock(SessionTime);
      }
    }
    
    updateTime();
    
    timeInterval = setInterval(updateTime, 1000);
    
    //.prepend('<h3>Break</h3>')
    output.css({'background-color':'red', 'color':'white'});
      
  }
  
  function sessionClock(timer) {
    var output = $('#timer');
    
    function updateTime() {
      var t = timeRemaining(timer-1000);
      if(t.seconds < 10){
        t.seconds = '0' + t.seconds;
      };
      output.html(t.minutes + ":" + t.seconds).prepend('<h3>Session</h3>');
      timer -= 1000;
      
      if(t.total < 0){
        clearInterval(timeInterval);
        breakClock(BreakTime);
      }
    }
    
    
    updateTime();
    
    timeInterval = setInterval(updateTime, 1000);
    
    output.css({'background-color':'green', 'color':'white'});

      /*setTimeout(function() {
        breakClock();
      }, SessionTime)*/
  }
  
  $('#bTime').text(BreakDisplayTime + ' min');
  $('#sTime').text(DisplayTime + ' min');
  $('#timer').on('click', function() {
    if(action === 1){
      sessionClock(SessionTime);
      $('#sPlus').prop('disabled','true');
      $('#sMinus').prop('disabled','true');
      $('#bPlus').prop('disabled','true');
      $('#bMinus').prop('disabled','true');
      action = 2;
    } else {
      clearInterval(timeInterval);
      $('#timer').html('Start').css({'background-color':'green', 'color':'white'});
      $('#sPlus').removeAttr('disabled');
      $('#sMinus').removeAttr('disabled');
      $('#bPlus').removeAttr('disabled');
      $('#bMinus').removeAttr('disabled');
      action = 1;
    }
  });
  
  $('#sPlus').on('click', function() {
    SessionTime += 60000;
    DisplayTime = SessionTime / 60000;
    $('#sTime').text(DisplayTime + ' min');
  });
  
  $('#sMinus').on('click', function() {
    if (SessionTime <= 60000){
      return SessionTime === 60000;
    }
    SessionTime -= 60000;
    DisplayTime = SessionTime / 60000;
    $('#sTime').text(DisplayTime + ' min');
  });
  
  $('#bPlus').on('click', function() {
    BreakTime += 60000;
    BreakDisplayTime = BreakTime / 60000;
    $('#bTime').text(BreakDisplayTime + ' min');
  });
  
  $('#bMinus').on('click', function() {
    if (BreakTime <= 60000){
      return BreakTime === 60000;
    }
    BreakTime -= 60000;
    BreakDisplayTime = BreakTime / 60000;
    $('#bTime').text(BreakDisplayTime + ' min');
  });
  
});


































