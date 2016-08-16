/**
 * Created by ruijie on 2016/8/10.
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
            //console.log(data);
            initHtml(data.baiketext[0]);
            //数据加载完成后开始渲染地图
            var map = new BMap.Map("map");            // 创建Map实例
            //    map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);
            map.centerAndZoom(new BMap.Point(data.baiketext[0].j, data.baiketext[0].w), 19)
            var local = new BMap.LocalSearch(map, {
                renderOptions: {map: map, autoViewport: true}
            });
            local.searchNearby(data.baiketext[0].name, "叠彩区");
            function setMapEvent() {
                map.enableScrollWheelZoom();
                map.enableKeyboard();
                map.enableDragging();
                map.enableDoubleClickZoom()
            }
            setMapEvent()
        }
    })
}
function initHtml(data) {
    var html = '<h3 style="border-bottom: 2px solid #8d8d8d;padding-bottom: 1rem;"><a href="notices.html">'+ data.name +' </a></h3>'
    html += '<div class="col-md-12"><h4>诊所简介：</h4><div href="#" class="roomAbout">'+ data.Introduction +'</div></div>'
    html += '<div class="col-md-12" style="margin-top: 3rem;"><address>'
    html += '<a>地址：'+ data.address +'</a><br>'
    html += '<a>'+ data.bus +'</a><br>'
    html += '<abbr title="Phone">电话:</abbr> '+ data.tel +'</address></div>'
    $(".Introduction").html(html);
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
