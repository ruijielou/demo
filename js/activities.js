/**
 * Created by ruijie on 2016/8/10.
 */
$(function(){
    initActivities();

    var num;
    function initActivities() {
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

                $("#activiteslist").html(str);
                loadLocaltion($(".activiteslist"),'the-activities.html?num=');
            }
        })
    }


    function loadBaikeListHtml(id,title, data){
        var html = '<tr class="activiteslist" data-num="'+ id +'"><td class=""><a href="javascript:;">'+ title +'</a><span class="pull-right">'+ data +'</span></td></tr>'
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

