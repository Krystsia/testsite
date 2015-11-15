$(document).ready(function() {

    $('.parallax').myParallax(); //add parallax for header

    stripTable(); //call function fot toggle table

    //AJAX

    $('.menu__btn>a').click(function(e) {
        
        $('.toggle').remove();
        $('.menu__btn').removeClass('menu__btn_active');
        $(this).parent('div').addClass('menu__btn_active');
        var url = $(this).attr('href') + ' table';

        $('.table').load(url, function(data, status, response) {
            if (status === 'success') {
                $('.table').css('opacity', '0').stop().animate({
                    opacity: '1'
                }, 1000);
                stripTable(); //call function again
            } else {
                $('.table').html('<div class="alert"> К сожалению, данная страница сейчас недоступна</div>');
            }
        });
        e.preventDefault();
    })

    //FUNCTION FOR TOGGLE TABLE

    function stripTable() {
        var tr = $('.table tbody tr').toArray();
        var trLength = tr.length;
        var indicator = false;
        if (trLength > 6) {
            var newTr = tr.slice(5);
            $(newTr).css({
                'display': 'none'
            });

            /*****buttons*****/

            var button = '<div class="toggle"><div class="toggle__cercle toggle__cercle_active"></div><div class="toggle__cercle"></div></div>';

            //adding buttons if not exists


            if (!($('.toggle').length)) {
                $('.wrapper').append(button);
            } 

            // adding event for buttons 


            $('.toggle__cercle').click(function() {
                                    
                //check ClassName

                if ($(this).hasClass('toggle__cercle_active')) {
                    return;
                } else {

                    //remove class from all

                    $('.toggle__cercle').removeClass('toggle__cercle_active');

                    //add class to active

                    $(this).addClass('toggle__cercle_active');

                    //build the table
                    //remoove all tr

                    $('.table tbody tr').css({
                        'display': 'none'
                    });

                    //check indicator and...

                    if (!indicator) {

                        //add only newttr

                        $(newTr).css({
                            'display': 'table-row'
                        });
                    } else {
                        //or add all tr
                        $('.table tbody tr').css({
                            'display': 'table-row'
                        });
                        //and remove newTr
                        $(newTr).css({
                            'display': 'none'
                        });
                    }

                    //inverse indicator

                    indicator = !indicator;
                }

            })
        } else { //end if
             $('.toggle').remove();
        }; 
    }
    
})