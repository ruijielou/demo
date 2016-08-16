/**
 * Created by ruijie on 2016/8/9.
 */
$(function () {
    init();
})
function init() {
    var num = getURLParam("num");
    $.ajax({
        url: "./json/other.json",
        type: "get",
        data: num,
        datatype: "json",
        error: function () {
            alert("请求的数据未找到！");
        },
        success: function (data) {
            console.log(data);
            initHtml(data.baiketext[0]);
        }
    })
}
function initHtml(data) {
    var html = '<h3 class="content-title">公益活动'+ data.title +' </h3>'
    html += '<div class="content-auther">'+ data.auther +' <span>'+ data.data +'</span></div>'
    html += '<div class="content-text"> <img src="images/activityEx.png" alt="">'+ data.content +' </div>'
    $("#noviciate-guide").html(html);
}





/*获得网址中的具体数据【新版】（paramName为你需要的参数）*/
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
//console.log(getURLParam("num"));
