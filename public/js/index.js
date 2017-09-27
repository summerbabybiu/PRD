/**
 * Created by wangzhilong on 2017/9/27.
 */
(function ($) {
  $('.sure-login-btn').on('click', function () {
    let uName = $('.u-name').val();
    let uPwd = $('.u-pwd').val();
    if(uName && uPwd) {
      console.log(uName, uPwd);
      $.ajax({
        url: '/admin/userLogin',
        type: 'GET',
        data: {name: uName, pwd: uPwd},
        success: function (data) {

        },
        error: function (e) {

        }
      })
    }
  });
})(jQuery);