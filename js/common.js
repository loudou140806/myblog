/**
 * @desc:   公用js
 * @author: zhanxin.lin
 * @depend: jQuery, jQuery scrollTo
 */
$(document).ready(function() {
    /**
     *  scrollTo Top
     */
    var scrollTo = {
            nodeName: "J-backTop",
            scrollHeight: "100",
            linkBottom: "110px",
            linkRight: "1em",
            _scrollTop: function() {
            if(jQuery.scrollTo) {
                jQuery.scrollTo(0, 800, {queue:true});
            }
        },
        _scrollScreen: function() {
            var that = this, 
                topLink = $('#' + that.nodeName);

            if(jQuery(document).scrollTop() <= that.scrollHeight) {
                topLink.fadeOut();
                topLink.hide();
                return true;
            }  else {
                topLink.fadeIn();
            }
        },
        _resizeWindow: function() {
            var that = this, topLink = $('#' + that.nodeName);
            if($(window).width() > 1024) {
                var leftSize = $(window).width() / 2 + 400;
                topLink.css({
                    'right' : '',
                    'left': leftSize + 'px',
                    'bottom': that.linkBottom
                });
            } else {
                topLink.css({
                    'left': '',
                    'right' : that.linkRight,
                    'bottom': that.linkBottom
                });
            }


        },
        run: function() {
            var that = this, 
                topLink = $('<a id="' + that.nodeName + '" href="#" class="toTop"><i class="fa fa-chevron-up"></i></a>');
            topLink.appendTo($('body'));

            topLink.css({
                'display': 'none',
                'position': 'fixed',
                'left': '',
                'right': that.linkRight,
                'bottom': that.linkBottom
            });

            that._resizeWindow();

            if(jQuery.scrollTo) {
                topLink.click(function() {
                    that._scrollTop();
                    return false;
                });
            }
            jQuery(window).resize(function() {
                that._scrollScreen();
                that._resizeWindow();
            });
            jQuery(window).scroll(function() {
                that._scrollScreen();
            });
        }
    };
    scrollTo.run();

    // 页面动画
    (function init_animate() {

        var showNum = 0;
        var iNow = 0;
        var $head = $('.headwrap');
        var $articleList = $('.violet-post');
        var $foot = $('.footwrap');
        var headH = $head.height();
        var $title = $('.violet-title-item');
        // 第一个元素的marginLeft值
        var marL = parseInt($articleList.parent().outerWidth() - $articleList.outerWidth())/2;

        $(window).on({
            load: _init,
            resize: _resize,
            scroll: _scroll
        });
        
        function _resize() {

            marL = parseInt($articleList.parent().outerWidth() - $articleList.outerWidth())/2;
            $articleList.each(function(i, v){

                if(marL > 0) {
                    $(v).animate({
                        marginLeft: marL + 'px'
                    });
                }else{
                    $(v).animate({
                        marginLeft: 0
                    });
                }
            });
        }

        function _init() {
            
            $head.css({
                "position" : "absolute",
                "marginTop": - headH + 'px',
            }).animate({
                marginTop: 0,
                opacity :100
            },1200,"easeOutCubic");
            $foot.css({
                "position" : "absolute",
                "marginTop": $(this).height() + 'px'
                }).animate({
                marginTop: 0,
                opacity: 100   
            },1200,"easeOutCubic");
            $title.css({
                "position" : "absolute"
            }).animate({
                opacity:100
            },1200,"easeOutCubic");
            $articleList.on({
                mouseenter: function(){
                    marL = parseInt($articleList.parent().outerWidth() - $articleList.outerWidth())/2;
                    $(this).animate({
                        marginLeft: marL > 0 ? ( marL - 30 + "px" ) : 0
                    },30,"easeOutCubic");
                },mouseleave: function() {
                    marL = parseInt($articleList.parent().outerWidth() - $articleList.outerWidth())/2;
                    $(this).animate({
                        marginLeft: marL > 0 ? marL : 0
                    },30,"easeOutCubic");
                }
            });
            loadArticle();
        }

        // 打开页面或者改变浏览器大小时改变violet-post布局
        function _scroll() {

            if(iNow < $articleList.length){

                // post距顶端的高
                var eleTop = $articleList.eq(iNow)[0].getBoundingClientRect().top + $(window).scrollTop();

                // window高 + scrollTop
                var windowTop = $(window).scrollTop() + $(window).height();

                // 小于说明要加载
                if(eleTop < windowTop) {
                    $articleList.eq(iNow).animate({
                        opacity: 100
                    },400,'easeOutCubic');
                    iNow ++;
                }
            }else if(iNow == $articleList.length){
                $(window).off('scroll',_scroll);
                iNow = 0;
            }
        }
        function loadArticle() {
            for(i = 0; i < $articleList.length; i++) {
                _scroll();
            }
        }  
    }());
});