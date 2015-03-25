/*global $:false */

(function ($) {
    'use strict';

    // Module globals defined here

    var myGlobalVariable = true;

    function ModueName(){

        function addEvents(){
            $('.close').on('click', doSomethingClickHandler);
        }

        function doSomethingClickHandler(e){
            console.log('I am doing something', myGlobalVariable);
            e.preventDefault();
        }

        this.init = function(){
            addEvents();
        };

    }

    $(document).ready(function(){
        //var js = new ModueName();
        //js.init();
    });

}($));
