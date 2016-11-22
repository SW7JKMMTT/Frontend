$('document').ready(function() {
    $('.login-form').submit(function(){
        //alert($('input[name=username]').val());
        //alert($('input[name=password]').val());

        $('.login-message').stop(true, false).slideUp('veryfast', function(){
            url = "http://172.25.11.114:8080/services-1.0.0/auth"

            $.ajax({
                url: url,
                type: 'post',
                data: {
                    username: $('input[name=username]').val(),
                    password: $('input[name=password]').val()
                },
                headers: {
                    "Content-Type": "application/json",
                },
                dataType: 'json',
                success: function (data) {
                    console.info(data);
                }
            });


            $('.login-message p').html($('input[name=username]').val());
            $('.login-message').stop(true, false).slideDown('veryfast');
        });

        return false;
    });
});
