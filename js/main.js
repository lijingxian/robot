var config = {
  reset: true,
  origin:'bottom',
  distance:'300px',
  duration: 1000,
  delay: 50000,
  rotate: {x:100, y:100, z:200},
  opacity: 0,
  scale: 0.2, //初始缩放大小，可以大于1,变为逐渐缩小
  easing: 'cubic-bezier(0.6, 0.2, 0.2, 1)', // 缓动'ease', 'ease-in-out'，'linear'...
  viewOffset: {//可看到的范围，全屏往里缩
    top: 150,
    right: 0,
    bottom: 150,
    left: 0
  },
}


$(function () {

  $(".header-page").load("./header.html",function () {
    var pageId = getUrlParam('page');
    if(pageId == null && pageId == undefined){
      $("#home").addClass("active");
    } else {
      $("#"+pageId).addClass("active");
    }
  });
  $(".footer-page").load("./footer.html");

  var bannerWidth = $(window).width();
  var bannerHeight = bannerWidth*27/64;
  $('.header').height(bannerHeight);

  $(window).resize(function () {
    bannerWidth = $(window).width();
    bannerHeight = bannerWidth*27/64;
    $('.header').height(bannerHeight);
  })

  $("h6").each(function () {
    if($(this).hasClass('title')){
      if(!$(this).hasClass('.icon')){
        var svg = '<svg class="icon-1" aria-hidden="true">\n' +
            '  <use xlink:href="#icon-title"></use>\n' +
            '</svg>'
        $(this).prepend(svg);
      }
    }
  })

  var wow = new WOW({
    boxClass: 'wow',
    animateClass: 'animated',
    offset:50,
    live: true
  });
  wow.init();

  var swiper1 = new Swiper('#product-banner', {
    autoplay:true,
    pagination: {
      el: '.swiper-pagination1',
      clickable :true,
      renderBullet: function (index, className) {
        switch (index) {
          case 0:
            text = '<div><i class="iconfont icon-shiwu"></i></div><p>处理繁琐事务</p>';
            break;
          case 1:
            text = '<div><i class="iconfont icon-renliziyuan1"></i></div><p>优化人力资源</p>';
            break;
          case 4:
            text = '<div><i class="iconfont icon-gongzuoxiaoshuai"></i></div><p>提高工作效率</p>';
            break;
          case 5:
            text = '<div><i class="iconfont icon-liucheng"></i></div><p>标准工作流程</p>';
            break;
          case 2:
            text = '<div><i class="iconfont icon-hezuo"></i></div><p>提升服务品质</p>';
            break;
          case 6:
            text = '<div><i class="iconfont icon-pinpai1"></i></div><p>提升品牌形象</p>';
            break;
          case 3:
            text = '<div><i class="iconfont icon-tiyan"></i></div><p>增强用户体验</p>';
            break;
          case 7:
            text = '<div><i class="iconfont icon-chengben"></i></div><p>降低管理成本</p>';
            break;
        }
        return '<span class="' + className + '">' + text + '</span>';
      }
    },
    navigation: {
      nextEl: '.product-value-banner .swiper-button-next',
      prevEl: '.product-value-banner .swiper-button-prev',
    },
  });
  var swiper2 = new Swiper('#banner', {
    watchSlidesProgress : true,
    pagination: {
      el: '.swiper-pagination2',
      clickable :true,
      //type: 'progressbar',
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    autoHeight: true,
  })
  var thumbsSwiper = new Swiper('#thumbs',{
    spaceBetween: 20,
    slidesPerView: 5,
    watchSlidesVisibility: true,//防止不可点击
  })
  var swiper3 = new Swiper('#solution_cj',{
    autoplay:true,
    spaceBetween: 10,
    thumbs: {
      swiper: thumbsSwiper,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  })
  var swiper4 = new Swiper('#lams02',{
    slidesPerView: 5,
  })
  var swiper5 = new Swiper('#lams01',{
    autoplay:true,
    direction: 'vertical',
    thumbs: {
      swiper: swiper4,
      watchSlidesVisibility: true,//防止不可点击
    },
    pagination: {
      el: '.swiper-pagination',
      bulletElement : 'li',
    },
    autoScrollOffset: 1,
  })

  swiper6.controller.control = [swiper4, swiper5]//控制Swiper1和Swiper2，和上面效果一样
})

function playVideo() {
  /*$('.loading').fadeOut();*/
  /*$('.video-copy').fadeOut();*/
}
function getUrlParam(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
  var r = window.location.search.substr(1).match(reg);  //匹配目标参数
  if (r != null) return unescape(r[2]); return null; //返回参数值
}
