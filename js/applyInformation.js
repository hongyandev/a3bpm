$(function () {
    $(".buttons-tab a").click(function(){
        var idx=$(this).index();
        $(".tabs .tab").eq(idx).show().siblings().hide();
    })
});