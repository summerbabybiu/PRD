/**
 * Created by wangzhilong on 2017/9/27.
 */
(function ($) {
  $('.sure-login-btn').on('click', function () {
    let uName = $('.login-area .u-name').val().trim();
    let uPwd = $('.login-area .u-pwd').val().trim();

    if(uName && uPwd) {
      console.log(uName, uPwd);
      $(this).val('Entering...');
      $.ajax({
        url: '/admin/signin',//login in
        type: 'Post',
        data: {username: uName, password: uPwd},
        dataType: "json",
        success: function (data) {
          console.log(data);
          window.location.href = '/admin';
        },
        error: function (jqXHR, textStatus, errorThrown) {
          alert(textStatus + ':' + jqXHR.responseText);
          // console.log(jqXHR,textStatus,errorThrown);
        }
      })
    }
  });

  $('.sure-sign-btn').on('click', function () {
    let uName = $('.sign-area .u-name').val().trim();
    let uPwd = $('.sign-area .u-pwd').val().trim();

    if(uName && uPwd) {
      console.log(uName, uPwd);
      $(this).val('Signing...');
      $.ajax({
        url: '/admin/signup', //sign up
        type: 'Post',
        data: {username: uName, password: uPwd},
        dataType: "json",
        success: function (data) {
          console.log(data);
        },
        error: function (jqXHR, textStatus, errorThrown) {
          alert(textStatus + ':' + jqXHR.responseText);
          // console.log(jqXHR,textStatus,errorThrown);
        }
      })
    }
  })
})(jQuery);