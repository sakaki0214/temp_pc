// font
(function () {
  var ua = window.navigator.userAgent;
  var os, version, matched;

  if (matched = ua.match(/Windows NT (\d+\.\d+)/)) {
    os = 'Windows';
    switch (matched[1]) {
      case '5.1':
      case '5.2':
        version = 'XP';
        break;
      case '6.0':
        version = 'Vista';
        break;
      case '6.1':
        version = '7';
        break;
      case '6.2':
        version = '8';
        break;
      case '6.3':
        version = '8.1';
        break;
      case '10.0':
        version = '10';
        break;
    }
  }
  else if (matched = ua.match(/Mac OS X (\d+[_.]\d+)/)) {
    os = 'Mac OS';
    version = matched[1].replace(/_/g, '.');
  }
  else if (matched = ua.match(/iPhone OS (\d_\d)/) || ua.match(/iPad; CPU OS (\d_\d)/)) {
    os = 'iOS';
    version = matched[1].replace(/_/g, '.');
  }
  else if (matched = ua.match(/Android (\d\.\d)/)) {
    os = 'Android';
    version = matched[1];
  }

  document.body.setAttribute('data-os', os + ' ' + version);
})();


$(function($) {

  //smooth scroll
  $('a[href^="#"]').click(function() {
    console.log('click');
    var speed = 400; // ミリ秒
    var href= $(this).attr("href");
    var target = $(href == "#" || href == "" ? 'html' : href);
    var position = target.offset().top;
    $('body,html').animate({scrollTop:position}, speed, 'swing');
    return false;
  });

  //
  //form-validation
  //
  var $textbox = $('.js-form-text');
  var errorTx1 = '※入力内容が正しくありません。';
  var $mail = $('.js-form-mail');
  var $copyMail = $('.js-form-copy-mail');
  var mailVal = $mail.val();
  var errorTx2 = '※入力内容が一致しません。';


  //-submit
  $('form[data-validate]').on('input', function(){
    //console.log(this.checkValidity());
    $(this).find(':submit').attr('disabled', !this.checkValidity());
  });

  //-テキスト入力欄
  $textbox.on('input blur', function(){
    if($(this).val().match(/.+/)){
        $(this).next('.error__tx').remove();
      } else {
        if($(this).next('p').hasClass('error__tx')){
          return false;
        } else {
          $(this).after('<p class="error__tx">' + errorTx1 + '</p>');
        }
      }
  });

  //-mail（入力欄1つ：@も含めて入力）
  $mail.on('input blur', function(){
    if($(this).val().match(/.+@.+\..+/)){
      $(this).next('.error__tx').remove();
    } else {
      if($(this).next('p').hasClass('error__tx')){
        return false;
      } else {
        $(this).after('<p class="error__tx">' + errorTx1 + '</p>');
      }
    }
    if($copyMail.val() == '') {
      return false;
    } else if($copyMail.val() !== $(this).val()) {
      if($copyMail.next('p').hasClass('error__tx')){
        return false;
      } else {
        $copyMail.after('<p class="error__tx">' + errorTx1 + '</p>');
      }
    } else if($copyMail.val() == $(this).val()) {
      $copyMail.next('.error__tx').remove();
    }
  });

  $copyMail.on('input blur', function(){
    if($mail.val() !== $(this).val()){
      if($(this).next('p').hasClass('error__tx')){
        return false;
      } else {
        $(this).after('<p class="error__tx">' + errorTx1 + '</p>');
      }
    } else {
      $(this).next('.error__tx').remove();
    }
  });


  //-mail（入力欄2つ：@の前後を入力）



});
