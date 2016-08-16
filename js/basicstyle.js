/**
 * Created by ruijie on 2016/8/2.
 */
$(function(){
    footerHoverImg();
    clineHeight();

    $('li.dropdown').mouseover(function() {$(this).addClass('open');}).mouseout(function() {$(this).removeClass('open');});

    function footerHoverImg(){
        var smalllogo = document.getElementById("smalllogo");
        var biglogo = document.getElementById("biglogo");
        var close = document.getElementById("close");
        smalllogo.onmouseover = function(){
            biglogo.style.display = "block";
        };
        close.onclick = function(){
            biglogo.style.display = "none";
        }
    }
    function clineHeight() {
        var height = $(window).height();
        var width = $(window).width();
        //$(".appImg").height(height);
    }
    $(".CategoryList").each(function(index,item){
        $(item).on("click",function(){
            $(this).addClass("active").siblings().removeClass("active")
        })
    })
  //数组去重方法
  Array.prototype.unique = function(){
    var res = [];

    var json = {};
    for(var i = 0; i < this.length; i++){
      if(!json[this[i]]){
        res.push(this[i]);
        json[this[i]] = 1;
      }
    }
    return res;
  }

  //获得url中的具体数据paramName为你需要的参数）
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


})
