$('document').ready(function() {
    if (localStorage.getItem("token") != null)
    {
        window.location="dashboard.html";
    }else
    {
        $('.login-form').submit(function(){
            $('.login-message').stop(true, false).slideUp('veryfast', function(){
                url = "http://172.25.11.114:8080/services-1.0.0/auth"

                $.ajax({
                    url: url,
                    type: 'post',
                    data: JSON.stringify({
                        username: $('input[name=username]').val(),
                        password: $('input[name=password]').val()
                    }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                    dataType: 'json',
                    success: function (data) {
                        localStorage.setItem("token", data["token"]);
                        window.location="dashboard.html";
                    }, error(e) {
                        $('.login-message p').html("Error during login.");
                        $('.login-message').stop(true, false).slideDown('veryfast');
                    }
                });
            });

            return false;
        });
    }
});
