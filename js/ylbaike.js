/**
 * Created by ruijie on 2016/8/10.
 */
$(function(){
    initBaike();
    var num;
    function initBaike() {
        $.ajax({
            url: "./json/aboutdoc.json",
            type: "post",
            data: "",
            datatype: "json",
            error: function () {
            },
            success: function (data) {
                //定义一个空数组来存放room
              var arr1 = [];
              var str = "";
              var str2 = "";

              for (var i = 0; i < data.doc.length; i++) {
                //循环每个room
                var arr = data.doc[i].room;
                //每个room都添加到数组里
                arr1.push(arr)

                    str += loadBaikeListHtml(data.doc[i].id, data.doc[i].title, data.doc[i].room, data.doc[i].data);
                }
              //调用数组去重的函数，用一个array来接收
              var array = arr1.unique();
              //循环每一项依次添加到列表组里
             for(var i = 0; i< array.length; i++){
               str2 += loadCategoryListHtml(i+1, array[i]); //这里的i+1是给每一项添加data-num添加属性值，用以点击跳转链接加载对应诊室的请求参数
             }

                $('.Categorys').after(str2);
                $("#baikeList").html(str);
                loadLocaltion($(".baikeList"),'baiketext.html?num=');
                //在页面加载完成之后添加点击事件监听，分类请求数据加载
                $(".CategoryList").each(function (index, item) {
                    $(item).on('click', function () {
                        $(this).addClass("active").siblings().removeClass("active");
                        num = $(this).attr('data-num')
                        console.log(num);
                        //console.log($(this).attr('data-num'));
                        $.ajax({
                            url: "./json/aboutdoc.json",
                            type: "get",
                            data: num,
                            datatype: "json",
                            error: function () {

                            },
                            success: function (data) {
                                //console.log(data.doc);
                                var str = "";
                                for (var i = 0; i < data.doc.length; i++) {
                                    str += loadBaikeListHtml(data.doc[i].id, data.doc[i].title, data.doc[i].name, data.doc[i].data)
                                }
                                $("#baikeList").html(str);
                            }
                        })
                    })
                })
            }
        })
    }

    function loadCategoryListHtml(id, room){
        var html = '<div class="new_guidelines_lefttwo CategoryList" data-num="'+ id +'">'
        html += '<a href="javascript:;" > <h4 class="glyphicon glyphicon-play"></h4>'
        html += '<span>'+ room +'</span></a></div>'
        return html;
    }

    function loadBaikeListHtml(id,title, category, data){
        var html = '<tr class="baikeList" data-num="'+ id +'"><td class=""><a href="javascript:;">'+ title +'</a></td>'
        html += '<td><a href="javascript:;">'+ category +'</a></td>'
        html += '<td><span class="pull-right">' + data + '</span></td></tr>'
        return html;
    }


    function loadLocaltion (id,url){
        id.each(function(index,item){
            //alert(item)
            $(item).on("click",function(){
                //alert(index)
                window.location = url + $(this).attr('data-num');
            })
        })
    };
})
