/**
 * Created by wangzhilong on 2017/9/27.
 */
(function ($) {
  $('.sure-login-btn').on('click', function () {
    let uName = $('.u-name').val().trim();
    let uPwd = $('.u-pwd').val().trim();

    if(uName && uPwd) {
      console.log(uName, uPwd);
      $(this).val('Entering...');
      $.ajax({
        url: '/admin/userSingIn',
        type: 'GET',
        data: {name: uName, pwd: uPwd},
        dataType: "json",
        success: function (data) {
          if (data['status'] === 0) {
            console.log('success');
            // window.location.href = '/admin/wirte';
          }
        },
        error: function (e) {
          alert('failed');
        }
      })
    }
  });
})(jQuery);