(function(){
	'use strict';
    
    function setVisiblityforPasswordSection(checkbox)
    {
        if(checkbox.is(':checked'))
        {
            $('.has-account-label').html('I already have an account and my password is');
            $('.password-input').show();  
        }
        else
        {
            $('.has-account-label').html('I already have an account');
            $('.password-input').hide();   
        }
    }
	
    $(document).ready(function() {
        $('.has-account').change(function(){
            setVisiblityforPasswordSection($(this));
        });
        
        $('.no-account').change(function(){
            if($(this).is(':checked'))
            {
                $('.has-account-label').html('I already have an account');
                $('.password-input').hide();  
            }
            else
            {
                $('.has-account-label').html('I already have an account and my password is');
                $('.password-input').show();  
            }
        });
        
        setVisiblityforPasswordSection($('.has-account'));
    });
    
}());


