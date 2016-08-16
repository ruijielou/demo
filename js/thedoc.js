/**
 * Created by ruijie on 2016/8/9.
 */
$(function () {
    init();
})
function init() {
    var num = getURLParam("num");
    $.ajax({
        url: "",
        type: "get",
        data: num,
        datatype: "json",
        error: function () {
            alert("请求的数据未找到！");
        },
        success: function (data) {
            initHtml(data);
        }
    })
}
function initHtml(data) {
    var html1 = '<img class="media-object" src="' + data.src + '" alt="...">';
    $(".docImg").html(html1);
    var html2 = '<p>姓名：<span>' + data.name + '</span></p>'
    html2 += '<p>性别：<span>' + data.sex + '</span></p>'
    html2 += '<p>专业：<span>' + data.professional + '</span></p>'
    html2 += '<p>擅长领域：<span>' + data.goodat + '</span></p>'
    html2 += ' <p>医龄：<span>' + data.age + '</span></p>'
    html2 += '<p>门诊科室：<span>' + data.room + '</span></p>'
    $(".docbody").html(html2);
    var html3 = data.content;
    $(".doccontent").html(html3);
}

//console.log(getURLParam("num"));
