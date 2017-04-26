
window.mdebug={
    mess: 'mdebug messages:<br/>',   //the message show in debug_mess element
    mdebug_div: null,               //mdebug window element
    mdebug_mess: null,              //mdebug message element
    mdebug_cmd: null,               //mdebug input command element

    show: function(){   //it show the mdebug window element
        if(this.mdebug_div!=null && this.mdebug_div.style.display=='none')
        {
            this.mdebug_div.style.display='block';
            this.mdebug_mess.innerHTML=this.mess;
            this.mdebug_mess.scrollTop=this.mdebug_mess.scrollHeight-this.mdebug_mess.clientHeight;
        }
    },

    hide: function() {  //it hide the mdebug window element
        if(this.mdebug_div!=null && this.mdebug_div.style.display=='block')
        {
            this.mdebug_div.style.display = 'none';
        }
    },

    clear: function() {     //it clear this.mess and refresh mdebug_mess element
        this.mess='mdebug messages:<br/>';
        if(this.mdebug_div!=null && this.mdebug_div.style.display=='block')
        {
            this.mdebug_mess.innerHTML=this.mess;
            this.mdebug_mess.scrollTop=this.mdebug_mess.scrollHeight-this.mdebug_mess.clientHeight;
        }
    },

    log: function(mess) {   //it append mess to this.mess
        this.mess += mess+'<br/>';
        if(this.mdebug_div!=null && this.mdebug_div.style.display=='block') //it mdebug window is displayed in block, then update the mdebug_mess element
        {
            this.mdebug_mess.innerHTML=this.mess;
            this.mdebug_mess.scrollTop=this.mdebug_mess.scrollHeight-this.mdebug_mess.clientHeight; //scroll to the latest message, which is in the bottom
        }
        if(console)
        {
            //this.console_log is console.log, which we set later
            //here we must use call to change it's context, because console.log must run in console context
            this.console_log.call(console, mess);
        }
    },

    execute: function() {   //it ececute command in mdebug_cmd element and append it's result to mess
        var cmd = this.mdebug_cmd.value;
        var mess = eval(cmd);
        this.mess += mess+'<br/>';
        if(this.mdebug_div!=null && this.mdebug_div.style.display=='block')
        {
            this.mdebug_mess.innerHTML=this.mess;
            this.mdebug_mess.scrollTop=this.mdebug_mess.scrollHeight-this.mdebug_mess.clientHeight;
        }
    }
};

(function(){

    //this function running when window onload event triggered
    function window_onload()
    {
        //this function can create an element by str, which mush be a html string
        var create_element=function (str) {
            var tmp_div=document.createElement('div');
            tmp_div.innerHTML=str;
            var element=tmp_div.firstChild;
            while(element!=null && element.nodeType!=1)
            {
                element=element.nextSibling;
            }
            return element;
        };

        var mdebug_html=''+
            ' <div id="mdebug_div" style="display: none; width: 100%; height: 390px; background-color: #efefef; overflow: hidden">                                                ' +
            '     <div style="margin: auto; display: table; height: 40px">                                                                                                        ' +
            '         <button onclick="mdebug.hide()" style="margin: 5px 20px; padding:5px 20px; border: none; font-size: 16px; background-color: #DDDDDD">hide</button>          ' +
            '         <button onclick="mdebug.clear()" style="margin: 5px 20px; padding:5px 20px; border: none; font-size: 16px; background-color: #DDDDDD">clear</button>        ' +
            '     </div>                                                                                                                                                          ' +
            '     <hr style="height: 0px; border-top: 0px; border-bottom: 1px solid #BBBBBB" />                                                                                   ' +
            '     <div id="mdebug_mess" style="width: 100%; height: 300px; -ms-word-break: break-all; word-break: break-all; overflow: auto"></div>                               ' +
            '     <div>                                                                                                                                                           ' +
            '         <input id="mdebug_cmd" type="text" value=""                                                                                                                 ' +
            '                style="margin:0px; border: 1px solid #999999; padding:5px 5px; width: 80%; font-size: 16px;                                                          ' +
            '                -webkit-box-sizing: border-box;-moz-box-sizing: border-box;box-sizing: border-box; float: left;" />                                                  ' +
            '         <button onclick="mdebug.execute()"                                                                                                                          ' +
            '                 style="margin: 0px; border: 1px solid #999999; border-left:none; padding:5px 20px; width:20%; font-size: 16px;                                      ' +
            '                 -webkit-box-sizing: border-box;-moz-box-sizing: border-box;box-sizing: border-box; float: left;                                                     ' +
            '                 background-color: #DDDDDD;">execute</button>                                                                                                        ' +
            '     </div>                                                                                                                                                          ' +
            ' </div>                                                                                                                                                              ' ;
        mdebug.mdebug_div=create_element(mdebug_html);
        mdebug.mdebug_mess=mdebug.mdebug_div.querySelector('#mdebug_mess');
        mdebug.mdebug_cmd= mdebug.mdebug_div.querySelector('#mdebug_cmd');
        document.body.insertBefore(mdebug.mdebug_div, document.body.firstChild);

        var mbug_html=''+
            ' <div onclick="mdebug.show()"                                            ' +
            '      style="position: absolute; top: 200px; right: 30px; z-index: 2147483647;  ' +  //z-index set to max number, so it can always display on the top
            '             border-radius: 50%; width: 60px; height: 60px;                     ' +
            '             line-height: 60px; text-align: center;                             ' +
            '             background-color: #008800; cursor: pointer">                       ' +
            '     <span style="color: #ffffff; font-size: 16px">mbug</span>                  ' +
            ' </div>                                                                         ' ;
        document.body.insertBefore(create_element(mbug_html), document.body.firstChild);
    }

    //this function print error message to mdebug window
    function window_onerror(event)
    {
        if(event.target==window){
            mdebug.log('error in ' + event.filename + ', line:' + event.lineno + ' :: ' + event.message);
        }
        else{
            mdebug.log('cann\'t find :: ' + event.target.src);
        }
    }

    //listen onload event
    if(window.addEventListener){
        window.addEventListener('load', window_onload, false);
        window.addEventListener('error', window_onerror, true);
    }else if(window.attachEvent){
        window.attachEvent('onload', window_onload);
        window.attachEvent('error', window_onerror);
    }else{
        window.onload=window_onload;
        window.onerror=window_onerror;
    }

    //redirect console.log function to mdebug.log
    //also we saved primitive console.log in mdebug.console_log, we will call it in mdebug.log
    if(console)
    {
        mdebug.console_log=console.log;
        //here we must wrap mdebug.log in a function
        //console.log=consloe.log; this is wrong, because when we call console.log, the log's this point point to console, bu we need mdebug as it's point
        console.log=function(mess){mdebug.log( mess)};
    }

    //catch all error, and handle it in onerror function

})();


