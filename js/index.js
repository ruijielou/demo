/**
 * Created by ruijie on 2016/8/9.
 */
$(function(){
    function Init(){
     this.loadLocaltion = function (id,url){
            id.each(function(index,item){
                //alert(item)
                $(item).on("click",function(){
                    //alert("1111")
                    window.location = url + $(this).attr('data-num');
                })
            })
        };
        this.loadHtml = function (ele,data,id){
            var tpl = ele.html();
            var html = template(tpl, {data: data});
            id.html(html);
        };
    }
    Init.prototype = {
        //点击每个医生图片跳转到详情页面
        locationTheDoc: function(){
            //console.log($(".localtiondoc"));
            this.loadLocaltion($(".localtiondoc"),'thedoc.html?num=');
            //$(".localtiondoc").each(function(index,item){
            //    //alert(item)
            //    $(item).on("click",function(){
            //        //alert("1111")
            //        window.location = "thedoc.html?num="+$(this).attr('data-num');
            //    })
            //})
        },
        //点击每个新闻标题跳转到详情页面
        locationTheNews: function(){
            this.loadLocaltion($(".localtionnews"),'thenews.html?num=');
        },
        //点击每个公告标题跳转到详情页面
        locationTheNotices: function(){
            this.loadLocaltion($(".localtionnotices"),'thenotices.html?num=');
        },
        locationTheBaike: function(){
            this.loadLocaltion($(".localtionbaike"),'baiketext.html?num=');
        },
        //加载医生列表
        initDonList: function(){
            $.ajax({
                url:"./json/index.json",
                type: "get",
                //data: "doclist",
                datatype: 'json',
                error: function(){
                    alert("页面加载异常");
                },
                success: function(data){
                    var tpl = $('#tpl').html();
                    //if(data.doclist.length > 5 ? data.doclist.length = 5 : data.doclist.length)
                        var html = template(tpl, {data:data.doclist});
                    $('.picList').html(html);
                    jQuery(".picMarquee-left").slide({mainCell:".bd ul",autoPlay:true,effect:"leftMarquee",vis:6,interTime:50,trigger:"click"});
                    init.locationTheDoc();//加载完医生列表信息就开启点击监听事件
                }
            })
        },
        //加载百科列表
        loadBaikeList: function(){
            $.ajax({
                url: "./json/index.json",
                type: "post",
                data: "",
                datatype: "json",
                error: function(){
                    console.log("百科列表加载数据失败");
                },
                success: function(data){
                    var tpl = $('#tpl2').html();
                    if(data.baikelist.length > 5 ? data.baikelist.length = 5 : data.baikelist.length)
                        var html = template(tpl, {data:data.baikelist});
                    $('#baikeList').before(html);
                    init.locationTheBaike();
                }
            })
        },
        //加载新闻列表
        loadNewsList: function(){
            $.ajax({
                url: "./json/index.json",
                type: "post",
                data: "",
                datatype: "json",
                error: function(){
                    console.log("数据加载异常");
                },
                success: function(data){
                    var tpl = $("#newstpl").html();
                    if(data.newslist.length > 5 ? data.newslist.length = 5 : data.newslist.length)
                        var html = template(tpl, {data: data.newslist});
                    $('#newslist').before(html);
                    init.locationTheNews();
                }
            })
        },
        //加载公告列表
        loadNoticesList: function(){
            $.ajax({
                url: "./json/index.json",
                type: "post",
                data: "",
                datatype: "json",
                error: function(){
                    console.log("数据加载异常");
                },
                success: function(data){
                    var tpl = $("#noticestpl").html();
                    if(data.newslist.length > 5 ? data.newslist.length = 5 : data.newslist.length)
                        var html = template(tpl, {data: data.newslist});
                    $('#noticeslist').before(html);
                    init.locationTheNotices();
                }
            })
        },
        //加载轮播图片
        loadSliderImg: function(){
            $.ajax({
                url: "./json/index.json",
                type: "post",
                data: "",
                datatype: "json",
                error: function(){
                    console.log("数据加载失败");
                },
                success: function(data){
                    console.log(data.slider);
                    init.loadHtml($("#slidertpl"),data.slider,$(".sliderList"));
                }
            })
        }
    };
//实例化对象
    var init = new Init();
    init.loadSliderImg();
    init.initDonList();
    init.loadBaikeList();
    init.loadNoticesList();
    init.loadNewsList();

});
