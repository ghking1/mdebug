window.mdebug={};
window.mdebug.mess='mdebug messages:<br/>';
window.mdebug.mdebug_div=null;
window.mdebug.mdebug_mess=null;

window.mdebug.show=function()
{
    if(window.mdebug.mdebug_div!=null && window.mdebug.mdebug_div.style.display=='none')
    {
        window.mdebug.mdebug_div.style.display='block';
        window.mdebug.mdebug_mess.innerHTML=window.mdebug.mess;
        window.mdebug.mdebug_mess.scrollTop=window.mdebug.mdebug_mess.scrollHeight-window.mdebug.mdebug_mess.clientHeight;
    }
};

window.mdebug.hide=function()
{
    if(window.mdebug.mdebug_div!=null && window.mdebug.mdebug_div.style.display=='block')
    {
        window.mdebug.mdebug_div.style.display = 'none';
    }
};

window.onerror=function(mess, url, line){
    window.mdebug.mess+=mess.toString()+':'+url+':'+line+'<br/>';
    if(window.mdebug.mdebug_div!=null && window.mdebug.mdebug_div.style.display=='block')
    {
        window.mdebug.mdebug_mess.innerHTML=window.mdebug.mess;
        window.mdebug.mdebug_mess.scrollTop=window.mdebug.mdebug_mess.scrollHeight-window.mdebug.mdebug_mess.clientHeight;
    }
};

window.mdebug.log=function(mess)
{
    window.mdebug.console_log(mess);
    window.mdebug.mess+=mess+'<br/>';
    if(window.mdebug.mdebug_div!=null && window.mdebug.mdebug_div.style.display=='block')
    {
        window.mdebug.mdebug_mess.innerHTML=window.mdebug.mess;
        window.mdebug.mdebug_mess.scrollTop=window.mdebug.mdebug_mess.scrollHeight-window.mdebug.mdebug_mess.clientHeight;
    }
};
//redirect console.log function to window.mdebug.log
//also we saved primitive console.log in window.mdebug.console_log, we will call it in window.mdebug.log
if(console){
    window.mdebug.console_log=console.log;
    console.log=window.mdebug.log;
}

window.mdebug.clear=function()
{
    window.mdebug.mess='mdebug messages:<br/>';
    if(window.mdebug.mdebug_div!=null && window.mdebug.mdebug_div.style.display=='block')
    {
        window.mdebug.mdebug_mess.innerHTML=window.mdebug.mess;
        window.mdebug.mdebug_mess.scrollTop=window.mdebug.mdebug_mess.scrollHeight-window.mdebug.mdebug_mess.clientHeight;
    }
};

window.mdebug.execute=function()
{
    var cmd= window.mdebug.mdebug_div.querySelector('#mdebug_cmd').value;
    var mess=eval(cmd);
    window.mdebug.mess+=mess+'<br/>';
    if(window.mdebug.mdebug_div!=null && window.mdebug.mdebug_div.style.display=='block')
    {
        window.mdebug.mdebug_mess.innerHTML=window.mdebug.mess;
        window.mdebug.mdebug_mess.scrollTop=window.mdebug.mdebug_mess.scrollHeight-window.mdebug.mdebug_mess.clientHeight;
    }
};

window.mdebug.create_element=function(str)
{
    var tmp_div=document.createElement('div');
    tmp_div.innerHTML=str;
    var element=tmp_div.firstChild;
    while(element!=null && element.nodeType!=1)
    {
        element=element.nextSibling;
    }
    return element;
};

window.mdebug.window_onload=function()
{
    var mdebug_html=''+
        ' <div id="mdebug_div" style="display: none; width: 100%; height: 390px; background-color: #efefef; overflow: hidden">                                                ' +
        '     <div style="margin: auto; display: table; height: 40px">                                                                                                        ' +
        '         <button onclick="window.mdebug.hide()" style="margin: 5px 20px; padding:5px 20px; border: none; font-size: 16px; background-color: #DDDDDD">hide</button>   ' +
        '         <button onclick="window.mdebug.clear()" style="margin: 5px 20px; padding:5px 20px; border: none; font-size: 16px; background-color: #DDDDDD">clear</button> ' +
        '     </div>                                                                                                                                                          ' +
        '     <hr style="height: 0px; border-top: 0px; border-bottom: 1px solid #BBBBBB" />                                                                                   ' +
        '     <div id="mdebug_mess" style="width: 100%; height: 300px; -ms-word-break: break-all; word-break: break-all; overflow: auto"></div>                               ' +
        '     <div>                                                                                                                                                           ' +
        '         <input id="mdebug_cmd" type="text" value=""                                                                                                                 ' +
        '                style="margin:0px; border: 1px solid #999999; padding:5px 5px; width: 80%; font-size: 16px;                                                          ' +
        '                -webkit-box-sizing: border-box;-moz-box-sizing: border-box;box-sizing: border-box; float: left;" />                                                  ' +
        '         <button onclick="window.mdebug.execute()"                                                                                                                   ' +
        '                 style="margin: 0px; border: 1px solid #999999; border-left:none; padding:5px 20px; width:20%; font-size: 16px;                                      ' +
        '                 -webkit-box-sizing: border-box;-moz-box-sizing: border-box;box-sizing: border-box; float: left;                                                     ' +
        '                 background-color: #DDDDDD;">execute</button>                                                                                                        ' +
        '     </div>                                                                                                                                                          ' +
        ' </div>                                                                                                                                                              ' ;
    window.mdebug.mdebug_div=window.mdebug.create_element(mdebug_html);
    window.mdebug.mdebug_mess=window.mdebug.mdebug_div.querySelector('#mdebug_mess');
    document.body.insertBefore(window.mdebug.mdebug_div, document.body.firstChild);

    var mbug_html=''+
        ' <div onclick="window.mdebug.show()"                                            ' +
        '      style="position: absolute; top: 200px; right: 30px; z-index: 2147483647;  ' +  //z-index set to max number, so it can always display on the top
        '             border-radius: 50%; width: 60px; height: 60px;                     ' +
        '             line-height: 60px; text-align: center;                             ' +
        '             background-color: #008800; cursor: pointer">                       ' +
        '     <span style="color: #ffffff; font-size: 16px">mbug</span>                  ' +
        ' </div>                                                                         ' ;
    document.body.insertBefore(window.mdebug.create_element(mbug_html), document.body.firstChild);
};

if(window.addEventListener){
    window.addEventListener('load', window.mdebug.window_onload, false);
}else if(window.attachEvent){
    window.attachEvent('onload', window.mdebug.window_onload);
}else{
    window.onload=window.mdebug.window_onload;
}


