---
layout: post
title: EventUtil构造函数 以及一些跨浏览器方法
---


* ###这是一个EventUtil构造函数，跨浏览器解决event事件。

{% highlight js %}

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

}

{% endhighlight %}

* ###取得text或者textarea中select事件选择的文本。IE8之前有一个`document.selection`对象，调用不需要textbox。

{% highlight js %}
function getSlectionText(textbox)(){
    if(typeof textbox.selectionStart == "number"){
        return textbox.value.substring(textbox.selectionStrat,textbox.selectEnd);//IE8之后
    }else if(document.selection){
        return document.selection.createRange().text;//IE8以前
    }
}
{% endhighlight %}

* ###选择部分文本

{% highlight js %}
function selectText(textbox, startIndex, stopIndex){
    if(text.selectionRange){
        text.setSelectionRange(startIndex, stopIndex);
    }else if(text.createTextRange){
        var range = textbox.createTextRange();
        range.collapse(true);
        range.moveStart("charactor", startIndex);
        rabge.moveEnd("cbaractor", stopIndex - startIndex);
        range.select();
    }
    textbox.focus();
}
{% endhighlight %}

* ###屏蔽非数值字符，但不屏蔽那些会触发keypress的非数值字符，