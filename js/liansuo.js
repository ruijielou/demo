/**
 * Created by ruijie on 2016/8/10.
 */
$(function () {
    initNotices();
    var num;

    function initNotices() {
        $.ajax({
            url: "./json/aboutdoc.json",
            type: "post",
            data: "",
            datatype: "json",
            error: function () {
            },
            success: function (data) {
                console.log(data.doc);

                var str = "";
                for (var i = 0; i < data.doc.length; i++) {
                    str += loadBaikeListHtml(data.doc[i].id, data.doc[i].title, data.doc[i].data);
                }

                $("#liansuolist").html(str);
                loadLocaltion($(".liansuolist"), 'roommap.html?num=');
                //在页面加载完成之后添加点击事件监听，分类请求数据加载
            }
        })
    }

    function loadBaikeListHtml(id, title, data) {
        var html = '<tr class="liansuolist" data-num="' + id + '"><td class=""><a href="javascript:;">这是连锁' + title + '</a><span class="pull-right">' + data + '</span></td></tr>'
        return html;
    }

    function loadLocaltion(id, url) {
        id.each(function (index, item) {
            //alert(item)
            $(item).on("click", function () {
                //alert(index)
                window.location = url + $(this).attr('data-num');
            })
        })
    };
})
