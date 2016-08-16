/**
 * Created by ruijie on 2016/8/9.
 */
$(function(){
    initData1();
    var room;
    function initData1(){
        $.ajax({
            url: "./json/aboutdoc.json",
            type: "post",
            data: "",
            datatype: "json",
            error: function(){
            },
            success: function(data){
                //console.log(data.doc);
              //定义一个空数组来存放room
              var arr1 = [];
                var str = "";
                var str2 = "";
                for(var i = 0 ; i< data.doc.length; i ++){
                  //循环每个room
                  var arr = data.doc[i].room;
                  //每个room都添加到数组里
                  arr1.push(arr)

                  //str2 += loadCategoryListHtml(data.doc[i].id, data.doc[i].room);
                    str += loadTrainingListHtml(data.doc[i].id,data.doc[i].src1, data.doc[i].trainingtitile)
                }
              //调用数组去重的函数，用一个array来接收
              var array = arr1.unique();
              //循环每一项依次添加到列表组里
              for(var i = 0; i< array.length; i++){
                str2 += loadCategoryListHtml(i+1, array[i]); //这里的i+1是给每一项添加data-num添加属性值，用以点击跳转链接加载对应诊室的请求参数
              };

                $('.Categorys').after(str2);
                $(".trainingList").html(str);

                //在页面加载完成之后添加点击事件监听，分类请求数据加载
                $(".CategoryList").each(function(index,item) {
                    $(item).on('click', function () {
                        $(this).addClass("active").siblings().removeClass("active");
                        room = $(this).attr('data-num')
                        console.log(room);
                        //console.log($(this).attr('data-num'));
                        $.ajax({
                            url: "./json/aboutdoc.json",
                            type: "post",
                            data: room,
                            datatype: "json",
                            error: function(){

                            },
                            success: function(data){
                                console.log(data.doc);
                                var str = "";
                                for(var i = 0 ; i< data.doc.length; i ++){
                                    //str += loadDocListHtml(data.doc[i].id, data.doc[i].src, data.doc[i].name, data.doc[i].room, data.doc[i].content)
                                    str += loadTrainingListHtml(data.doc[i].id,data.doc[i].src1, data.doc[i].trainingtitile)
                                }
                                $(".trainingList").html(str);
                            }
                        })
                    })
                })
            }
        })
    }

    function loadTrainingListHtml(id,src1, trainingtitle){
        var html = '<div class="col-md-4 training-col" data-num="'+ id +'"><a href="the-training.html">'
        html += '<div class="thumbnail trainthumbnail"><img src="'+ src1 +'" alt="易经与中医学的融合之道"></div>'
        html += '<div class="caption text-center"><p>'+ trainingtitle +'</p></div></a></div>'
        return html;
    }

    function loadCategoryListHtml(id, room){
        var html = '<div class="new_guidelines_lefttwo CategoryList" data-num="'+ id +'">'
        html += '<a href="javascript:;" > <h4 class="glyphicon glyphicon-play"></h4>'
        html += '<span>'+ room +'</span></a></div>'
        return html;
    }




   //获得url中的具体数据paramName为你需要的参数
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

    //var aboutdocInit = new aboutdocInit();
    //aboutdocInit.initData();

})
