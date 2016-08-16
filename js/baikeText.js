/**
 * Created by ruijie on 2016/8/10.
 */
$(function(){
    initBaukeText();
})
function initBaukeText(){
    var num = getURLParam('num');
    $.ajax({
        url: './json/other.json',
        type: 'post',
        data: num,
        datatype: 'json',
        error: function(){

        },
        success: function(data){
            console.log(data);
            //if(data.id == num)
           var str = loadBaikeHtml(data.baiketext[0].title, data.baiketext[0].auther, data.baiketext[0].data, data.baiketext[0].content);
            $("#noviciate-guide").html(str);
        }

    })
}



/*获得url中的具体数据paramName为你需要的参数）*/
function getURLParam(paramName) {
    paramValue = '';
    isFound = false;
    if (this.location.search.indexOf('?') == 0 && this.location.search.indexOf('=') > 1) {
        arrSource = unescape(this.location.search).substring(1, this.location.search.length).split('&');
        i = 0;
        console.log(arrSource);
        while (i < arrSource.length && !isFound) {
            if (arrSource[i].indexOf('=') > 0) {
                if (arrSource[i].split('=') [0].toLowerCase() == paramName.toLowerCase()) {
                    paramValue = arrSource[i].split('=') [1];
                    isFound = true;
                }
            }
            i++;
        }
    }
    return paramValue;
}
function loadBaikeHtml(title, auther, data, content){
    var html = '<h3 class="content-title"><a href="ylbaike.html">'+ title +' ></a></h3>'
    html += '<div class="content-auther">'+ auther +' <span>'+ data +'</span></div>'
    html += '<div class="content-text"> '+ content +' </div>'
    return html;
}


