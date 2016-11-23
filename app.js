var user_url = "http://localhost:8080/services-1.0.0/user"
var vehicle_url = "http://localhost:8080/services-1.0.0/vehicle"
var id = "5835a511396e6f2a5c22fc15"

function print(e){
    console.log(e);
}

$(document).ready(function() {
    $(".tab-contents-container:not(:first)").hide();
    $(".tab:first").addClass('active');

    $("body").on("click", ".tab", function(){
        if($(this).hasClass("active"))
            return;

        $('.tab').removeClass('active');
        $(this).addClass('active');

        $('.tab-contents-container').hide();
        $('.tab-contents-container[data-type=' +  $(this).data('bind') + ']').show();
    });

    decorate_user();
});


function decorate_user()
{
    var container = $('.staff-container');
    container.html("");
    
    $.get(user_url, function( data ) {
        for (var i = 0; i < data.length; i++)
        {
            user = data[i];

            print(user);
            if(user.id == id)
            {
                imageurl = "";
                if(user.hasIcon)
                    $('.profile-pic').css('background-image', 'url(' + "assets/images/driver.jpg" + ')');

                $('.profile-text h1').html(user.givenname + ' ' + user.surname);
                if(user.permissions.length > 0)
                    $('.profile-text h3').html(user.permissions[0].permission);
            }else
            {
                imageurl = "";
                if(user.hasIcon)
                    imageurl = " style=\"background-image: url(assets/images/driver.jpg)\"";

                staff = '<div class="staff noselect">' +
                        '<div class="staff-pic"' + imageurl + '>' +
                        '</div>' +
                        '<div class="staff-text">' +
                        '<p class="staff-name">' + user.givenname + ' ' + user.surname + '</p>' +
                        '<p class="staff-vintage">Username: ' + user.username + '</p>' +
                        '</div>' +
                        '</div>';

                container.append(staff);
            }
        }
    });
}