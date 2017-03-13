window.mdebug={};
window.mdebug.mess='mdebug messages:<br/>';
window.mdebug.mdebug_div=null;
window.mdebug.mdebug_mess=null;

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

window.mdebug.show=function()
{
    var mdebug_div=document.getElementById('mdebug_div');
    if(mdebug_div==null)
    {
        var html=''+
            ' <div id="mdebug_div" style="display: none; width: 100%; height: 360px; background-color: #efefef; overflow: hidden">                                                               ' +
            '     <div style="margin: auto; display: table; height: 40px">                                                                                                        ' +
            '         <button onclick="window.mdebug.hide()" style="margin: 5px 20px; padding:5px 20px; border: none; font-size: 16px; background-color: #DDDDDD">hide</button>   ' +
            '         <button onclick="window.mdebug.clear()" style="margin: 5px 20px; padding:5px 20px; border: none; font-size: 16px; background-color: #DDDDDD">clear</button> ' +
            '     </div>                                                                                                                                                          ' +
            '     <hr style="height: 0px; border-top: 0px; border-bottom: 1px solid #BBBBBB" />                                                                                   ' +
            '     <div id="mdebug_mess" style="width: 100%; height: 300px; overflow: auto"></div>                                                                                 ' +
            ' </div>                                                                                                                                                              ' ;
        mdebug_div=window.mdebug.create_element(html);
        document.body.insertBefore(mdebug_div, document.body.firstChild);
        window.mdebug.mdebug_div=mdebug_div;
        window.mdebug.mdebug_mess=mdebug_div.querySelector('#mdebug_mess');
        window.mdebug.show();
    }
    else
    {
        mdebug_div.style.display='block';
        window.mdebug.mdebug_mess.innerHTML=window.mdebug.mess;
        window.mdebug.mdebug_mess.scrollTop=window.mdebug.mdebug_mess.scrollHeight-window.mdebug.mdebug_mess.clientHeight;
    }
};

window.mdebug.hide=function()
{
    var mdebug_div=document.getElementById('mdebug_div');
    if(mdebug_div!=null)
    {
        mdebug_div.style.display='none';
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
    window.mdebug.mess+=mess+'<br/>';
    if(window.mdebug.mdebug_div!=null && window.mdebug.mdebug_div.style.display=='block')
    {
        window.mdebug.mdebug_mess.innerHTML=window.mdebug.mess;
        window.mdebug.mdebug_mess.scrollTop=window.mdebug.mdebug_mess.scrollHeight-window.mdebug.mdebug_mess.clientHeight;
    }
};

window.mdebug.clear=function()
{
    window.mdebug.mess='mdebug messages:<br/>';
    if(window.mdebug.mdebug_div!=null && window.mdebug.mdebug_div.style.display=='block')
    {
        window.mdebug.mdebug_mess.innerHTML=window.mdebug.mess;
        window.mdebug.mdebug_mess.scrollTop=window.mdebug.mdebug_mess.scrollHeight-window.mdebug.mdebug_mess.clientHeight;
    }
};


