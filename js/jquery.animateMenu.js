(function($){
    var animateMenu = function(elem, options){
        this.elem    = elem;
        this.$elem   = $(elem);
        this.options = options;
    };

    animateMenu.prototype = {
        init: function() {

            this.$elem.addClass('animateMenu');
            this.bindEventHandlers();

            return this;
        },
        displayMessage: function(){
            //alert(this.defaults.displayMessage);
        },
        _startAnimate:function(elem){
            elem
                .stop(true, true)
                .css('color', elem.data('randomColor'))
                .animate(
                    { paddingLeft: this.options.animatePadding}, 
                    { duration: this.options.duration });
             return this;
        },
        _stopAnimate:function(elem){
            elem
                .stop(true, true)
                .css('color', elem.data('originalColor'))
                .animate(
                    { paddingLeft: this.options.defaultPadding}, 
                    { duration: this.options.duration });   
            return this;             
        },



        bindEventHandlers: function(){
            var _this = this;
            $("li", this.elem).each(function(){
                var $this = $(this);
                $this.data('originalColor','#'+Math.floor(Math.random()*16777215).toString(16))
                    .data('randomColor','#'+Math.floor(Math.random()*16777215).toString(16))
                    .css({color:$this.data('originalColor')});
            })

            $('li:odd', this.elem).css({backgroundColor:_this.options.oddColor});
            $('li:even', this.elem).css({backgroundColor:_this.options.evenColor});

            $('li', this.elem).on({
                mouseenter: function(){
                   _this.startAnimate($(this));                       
                },
                mouseleave: function(){
                   _this.stopAnimate($(this));
               }
            });

            $(this.elem).on('animateMenuStart.animateMenu','li', function(e){
                if(e.isDefaultPrevented())
                    return;
                _this._startAnimate($(this));
            })
            .on('animateMenuStop.animateMenu','li', function(e){
                if(e.isDefaultPrevented())
                    return;
                _this._stopAnimate($(this));
            })
          },



          // public methods
          startAnimate : function($el){
            $el.get(0).start = true;
            $el.trigger('animateMenuStart.animateMenu');
          },

          stopAnimate : function($el){
            $el.trigger('animateMenuStop.animateMenu');
          }
        };


    $.fn.animateMenu = function(options) {
        var api = $(this).data('animateMenuApi');

        if(api && typeof options == 'string' && api[arguments[0]])
            {
                api[arguments[0]].apply(api, Array.prototype.slice.call(arguments, 1));
                return this;
            }
        
        var o = $.extend({}, $.fn.animateMenu.defaults, options);
        return this.each(function() {
            $(this).data('animateMenuApi', new animateMenu(this, o).init());
        });

    };

    $.fn.animateMenu.defaults = {
        animatePadding: 30,
        defaultPadding: 10,
        evenColor: '#ccc',
        oddColor: '#555',
        duration: 300,
        displayMessage: "Hello World!"
    };

})(jQuery);