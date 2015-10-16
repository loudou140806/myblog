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
            var that = this, topLink = $('#' + that.nodeName);

            if(jQuery(document).scrollTop() <= that.scrollHeight) {
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
            var that = this, topLink = $('<a id="' + that.nodeName + '" href="#" class="toTop"><i class="fa fa-chevron-up"></i></a>');
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
    }
    scrollTo.run();
    var EventUtil = {

        addHandler: function(element, type, handler){
            if (element.addEventListener){
                element.addEventListener(type, handler, false);
            } else if (element.attachEvent){
                element.attachEvent("on" + type, handler);
            } else {
                element["on" + type] = handler;
            }
        },
        
        getButton: function(event){
            if (document.implementation.hasFeature("MouseEvents", "2.0")){
                return event.button;
            } else {
                switch(event.button){
                    case 0:
                    case 1:
                    case 3:
                    case 5:
                    case 7:
                        return 0;
                    case 2:
                    case 6:
                        return 2;
                    case 4: return 1;
                }
            }
        },
        
        getCharCode: function(event){
            if (typeof event.charCode == "number"){
                return event.charCode;
            } else {
                return event.keyCode;
            }
        },
        
        //得到剪贴板内容
        getClipboardText: function(event){
            var clipboardData =  (event.clipboardData || window.clipboardData);
            return clipboardData.getData("text");
        },
        
        getEvent: function(event){
            return event ? event : window.event;
        },
        
        getRelatedTarget: function(event){
            if (event.relatedTarget){
                return event.relatedTarget;
            } else if (event.toElement){
                return event.toElement;
            } else if (event.fromElement){
                return event.fromElement;
            } else {
                return null;
            }
        
        },
        
        getTarget: function(event){
            return event.target || event.srcElement;
        },
        
        getWheelDelta: function(event){
            if (event.wheelDelta){
                return (client.engine.opera && client.engine.opera < 9.5 ? -event.wheelDelta : event.wheelDelta);
            } else {
                return -event.detail * 40;
            }
        },
        
        preventDefault: function(event){
            if (event.preventDefault){
                event.preventDefault();
            } else {
                event.returnValue = false;
            }
        },

        removeHandler: function(element, type, handler){
            if (element.removeEventListener){
                element.removeEventListener(type, handler, false);
            } else if (element.detachEvent){
                element.detachEvent("on" + type, handler);
            } else {
                element["on" + type] = null;
            }
        },
        
        //设置剪贴板内容
        setClipboardText: function(event, value){
            if (event.clipboardData){
                event.clipboardData.setData("text/plain", value);//Chorme是text/plain
            } else if (window.clipboardData){
                window.clipboardData.setData("text", value);//IE是text
            }
        },
        
        stopPropagation: function(event){
            if (event.stopPropagation){
                event.stopPropagation();
            } else {
                event.cancelBubble = true;
            }
        }

    };
    (function(){
        var aImg = document.getElementsByTagName('img');
        aImg = Array.prototype.slice.call(aImg);
        aImg.map(function(elme){
            
            if(elme.dataset.rsrc){
                EventUtil.addHandler(elme, "load", function(event){
                    event = EventUtil.getEvent(event);
                    var target = EventUtil.getTarget(event);
                    target.src = target.dataset.rsrc;
                });
            }else{
                return ;
            }
        });
    })();
});