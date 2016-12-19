;(function(){
    /* ========================================================================
     * 轮播插件
     * ========================================================================
     * createTime 2015-09-17
     * createdBy QinZhen
     * ======================================================================== */
    $.fn.SmartSlide = function (options){
        var defaultOpts={
            isAutoPlay:true,
            animationTime:500,
            waitTime:5000,
            animationType:"fade",
            isNavigation:true,
            isDirection:true,
            isLoop:true,
            callBack:function(curIndex,leavIndex){}
        };
        var opts= $.extend(defaultOpts,options);
        var Slide = function ($el,option) {
            var self=this;
            this.option=option;
            var $list = $el.children("ul.ss-content"),
                $items = $list.children("li");
            this.el=$el[0];
            this.list = $list[0];
            this.items=$items;
            this.length = $items.length;
            this.curIndex=0;
            this.LeavIndex=0;
            this.power=true;
            this.interval=null;
            this.initSlidesSytle();
        }
        Slide.prototype={
            Constructor: Slide,
            initSlidesSytle:function(){
                var me=this;
                if(me.option.animationType=='fade'){
                    me.items.each(function(index){
                        this.style.display="none";
                        this.style.zIndex=0;
                        if(index==me.curIndex){
                            this.style.display="block";
                            this.style.zIndex=1;
                        }
                    })
                }
                if(me.option.animationType=='left'){
                    me.items.each(function(index){
                        this.style.left=index*100+"%";
                    })
                }
                if(me.option.isNavigation){
                    me.setNavigation();
                }
                if(me.option.isDirection){
                    me.setDirection();
                }
                if(me.option.isAutoPlay){
                    me.autoPlay();
                }
            },
            open:function(index,leavIndex){
                var me=this;
                me.power=false;
                if(me.option.animationType=='fade'){
                    var $bidItemList=$(me.el).find(".bidBox>.bidItem");
                    me.items[leavIndex].style.zIndex=0;
                    me.items[index].style.zIndex=1;
                    $bidItemList.removeClass("active");
                    $($bidItemList[index]).addClass("active");
                    $(me.items[index]).fadeIn(me.option.animationTime,function(){
                        me.items[leavIndex].style.display="none";
                        me.power=true;
                        me.option.callBack(index,leavIndex);
                    })
                }
                if(me.option.animationType=='left'){
                    var $bidItemList=$(me.el).find(".bidBox>.bidItem");
                    $bidItemList.removeClass("active");
                    $($bidItemList[index]).addClass("active");
                    $(me.list).animate({"left":"-"+index*100+"%"},me.option.animationTime,function(){
                        me.power=true;
                        me.option.callBack(index,leavIndex);
                    })
                }
            },
            autoPlay:function(){
                var me=this;
                me.interval=setInterval(function(){
                    if((0<(me.curIndex+1))&&((me.curIndex+1)<me.items.length)){
                        me.leavIndex=me.curIndex;
                        me.curIndex+=1;
                    }else {
                        me.leavIndex=me.curIndex;
                        me.curIndex=0;
                    }
                    me.open(me.curIndex,me.leavIndex);
                },me.option.waitTime+me.option.animationTime)
            },
            setNavigation:function(){
                var me=this;
                var $dotBox=$("<div class='bidBox'></div>");
                for(var i=0;i<me.items.length;i++){
                    var $dot=$("<span class='bidItem' data-index='"+i+"'></span>");
                    if(i==me.curIndex){
                        $dot.addClass('active');
                    }
                    $dotBox.append($dot)
                }
                $(me.el).append($dotBox);
                var $bidItemList=$dotBox.children(".bidItem");
                $bidItemList.click(function(){
                    if(me.power){
                        if(!$(this).hasClass('active')){
                            if(me.option.isAutoPlay){
                                me.interval=clearInterval(me.interval);
                            }
                            me.leavIndex=me.curIndex;
                            me.curIndex=parseInt($(this).attr('data-index'));
                            me.open(me.curIndex,me.leavIndex);
                            if(me.option.isAutoPlay){
                                me.autoPlay();
                            }
                        }
                    }
                });
            },
            setDirection:function(){
                var me=this;
                var $prev=$("<span class='ui-prev'></span>").appendTo($(me.el));
                var $next=$("<span class='ui-next'></span>").appendTo($(me.el));
                $prev.click(function(){
                    if(me.power){
                        if((0<=(me.curIndex-1))&&((me.curIndex-1)<me.items.length)){
                            if(me.option.isAutoPlay){
                                me.interval=clearInterval(me.interval);
                            }
                            me.leavIndex=me.curIndex;
                            me.curIndex-=1;
                            me.open(me.curIndex,me.leavIndex);
                            if(me.option.isAutoPlay){
                                me.autoPlay();
                            }
                        }else{
                            if(me.option.isLoop){
                                if(me.option.isAutoPlay){
                                    me.interval=clearInterval(me.interval);
                                }
                                me.leavIndex=me.curIndex;
                                me.curIndex=me.length-1;
                                me.open(me.curIndex,me.leavIndex);
                                if(me.option.isAutoPlay){
                                    me.autoPlay();
                                }
                            }
                        }
                    }
                });
                $next.click(function(){
                    if(me.power){
                        if((0<(me.curIndex+1))&&((me.curIndex+1)<me.items.length)){
                            if(me.option.isAutoPlay){
                                me.interval=clearInterval(me.interval);
                            }
                            me.leavIndex=me.curIndex;
                            me.curIndex+=1;
                            me.open(me.curIndex,me.leavIndex);
                            if(me.option.isAutoPlay){
                                me.autoPlay();
                            }
                        }else{
                            if (me.option.isLoop){
                                if(me.option.isAutoPlay){
                                    me.interval=clearInterval(me.interval);
                                }
                                me.leavIndex=me.curIndex;
                                me.curIndex=0;
                                me.open(me.curIndex,me.leavIndex);
                                if(me.option.isAutoPlay){
                                    me.autoPlay();
                                }
                            }
                        }
                    }
                });
            },
            goTo:function(index){
                var me=this;
                if(me.power&&(index!=me.curIndex)){
                    if(me.option.isAutoPlay){
                        me.interval=clearInterval(me.interval);
                    }
                    me.leavIndex=me.curIndex;
                    me.curIndex=index;
                    me.open(me.curIndex,me.leavIndex);
                    if(me.option.isAutoPlay){
                        me.autoPlay();
                    }
                }
            }
        }
        return new Slide($(this[0]),opts);
    };
    /* ========================================================================
     * 无缝滚动插件
     * ========================================================================
     * createTime 2015-11-15
     * createdBy QinZhen
     * ======================================================================== */
    $.fn.myScroll = function(options){
        //默认配置
        var defaults = {
            speed:40,  //滚动速度,值越大速度越慢
            rowHeight:41 ,//每行的高度
            hoverStop:true
        };

        var opts = $.extend({}, defaults, options),intId = [];

        function marquee(obj, step){

            obj.find("ul").animate({
                marginTop: '-=1'
            },0,function(){
                var s = Math.abs(parseInt($(this).css("margin-top")));
                if(s >= step){
                    $(this).find("li").slice(0, 1).appendTo($(this));
                    $(this).css("margin-top", 0);
                }
            });
        }

        this.each(function(i){
            var sh = opts["rowHeight"],speed = opts["speed"],_this = $(this);
            intId[i] = setInterval(function(){
                if(_this.find("ul").height()<=_this.height()){
                    clearInterval(intId[i]);
                }else{
                    marquee(_this, sh);
                }
            }, speed);

            _this.hover(function(){
                if(opts.hoverStop){
                    clearInterval(intId[i]);
                }
            },function(){
                intId[i] = setInterval(function(){
                    if(_this.find("ul").height()<=_this.height()){
                        clearInterval(intId[i]);
                    }else{
                        marquee(_this, sh);
                    }
                }, speed);
            });

        });

    }
    /* ========================================================================
     * tapBox
     * 选项卡
     * ========================================================================
     * createTime 2015-10-29
     * createdBy QinZhen
     * ======================================================================== */
    $.fn.selectTap=function(opt){
        var $this=$(this),
            $tapNav=$this.find(".tapHeader>.tapNav"),
            $tapItem=$this.find(".tapBody>.tapItem");
        var deafultOpt={};
        var option = $.extend(deafultOpt,opt);
        initFn();
        bindNavEvent();
        function initFn(){
            var thisId = window.location.hash.substr(1);
            if(thisId != "" && thisId != undefined){
                var $pointNav= $this.find(".tapHeader>.tapNav[data-point="+thisId+"]");
                if($pointNav){
                    $tapNav.removeClass("active");
                    $pointNav.addClass("active");
                }
            }
            $tapItem.hide();
            var $tapNavChecked=$this.find(".tapHeader>.tapNav.active");
            var pointId=$tapNavChecked.attr("data-point");
            $("#"+pointId).show();
        }
        function bindNavEvent(){
            $tapNav.on("click",function(){
                if(!$(this).hasClass("active")){
                    $tapNav.removeClass("active");
                    $(this).addClass("active");
                    $tapItem.hide();
                    var $tapNavChecked=$this.find(".tapHeader>.tapNav.active");
                    var pointId=$tapNavChecked.attr("data-point");
                    $("#"+pointId).fadeIn(200);
                }
            })
        }
    }
    /* ========================================================================
     * 弹出窗口
     * ========================================================================
     * createTime 2015-11-16
     * createdBy QinZhen
     * ======================================================================== */
    jQuery.alterMsg=function(options){
        var defaults={
            msg:" ",
            buttonTxt:"确定",
            callBack:function(){}
        };
        var opts = $.extend({}, defaults, options);
        if($("#AlterMsgBox").length>0){
            $("#AlterMsgBox").show();
            $("#AlterMsgBox").find("p").text(opts.msg);
        }else{
            var $box=$("<div id='AlterMsgBox'class='Alter-box'><div class='boxBody'></div></div>"),
                $msg=$("<p>"+opts.msg+"</p>").appendTo($box.find(".boxBody")),
                $btnBox=$("<div class='buttonBox'></div>").appendTo($box.find(".boxBody")),
                $btn=$("<input type='button' value="+opts.buttonTxt+">").appendTo($btnBox);
            $box.appendTo("body").hide().fadeIn(200);
            $btn.on("click",function(){
                $box.fadeOut(200,function(){$(this).remove()});
                opts.callBack();
            });
        }
    }
    jQuery.alterConfirm=function(options){
        var defaults={
            title:" ",
            sureButtonTxt:"确定",
            cancelButtonTxt:"取消",
            callBack:function(){}
        };
        var opts = $.extend({}, defaults, options);
        if($("#AlterConfirmBox").length>0){
            $("#AlterConfirmBox").show();
            $("#AlterConfirmBox").find("p").text(opts.msg);
        }else{
            var $box=$("<div id='AlterConfirmBox' class='Alter-box'><div class='boxBody'></div></div>"),
                $title=$("<p>"+opts.title+"</p>").appendTo($box.find(".boxBody")),
                $btnBox=$("<div class='buttonBox'></div>").appendTo($box.find(".boxBody")),
                $cancelButton=$("<input type='button' class='cancelButton' value="+opts.cancelButtonTxt+">").appendTo($btnBox),
                $sureButton=$("<input type='button' class='sureButton' value="+opts.sureButtonTxt+">").appendTo($btnBox);
            $box.appendTo("body").hide().fadeIn(200);
            $cancelButton.on("click",function(){
                $box.fadeOut(200,function(){$(this).remove()});
            });
            $sureButton.on("click",function(){
                $box.fadeOut(200,function(){$(this).remove()});
                opts.callBack();
            });
        }
    }
    jQuery.showMsg=function(options){
            var defaults={
                msg:" ",
                waitTime:2000,
                callBack:function(){}
            };
            var timeOut;
            var opts = $.extend({}, defaults, options);
            if($("#ShowMsgBox").length>0){
                $("#ShowMsgBox").show();
                $("#ShowMsgBox>.MsgBody").find("p").text(opts.msg);
            }else{
                var $msgBox=$("<div id='ShowMsgBox' class='Alter-box'></div>"),
                    $msgBody=$("<div class='MsgBody'><div class='closeImg'></div></div>").appendTo($msgBox),
                    $msg=$("<p>"+opts.msg+"</p>").appendTo($msgBody);
                $msgBox.appendTo("body").hide().fadeIn(200);
                $msgBody.find('.closeImg').on("click",function(){
                    $("#ShowMsgBox").fadeOut(200,function(){$(this).remove()});
                    opts.callBack();
                    clearTimeout(timeOut);
                })
            }
            timeOut=setTimeout(function(){
                $("#ShowMsgBox").fadeOut(200,function(){$(this).remove()});
                opts.callBack();
                clearTimeout(timeOut);
            },opts.waitTime)
        }

})(jQuery)
