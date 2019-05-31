(($)=>{
    'use strict';
    $.fn.gallery=function(options={}){
        let defaults ={
            current: 0,
            classes:''
        };
        options = $.extend(defaults,options);
        
        return this.each((index,element)=>{
            let  $gallery=$(element),
            $gallery_items = $gallery.children(),
            $arrow_left = $('<a>').css('visibility', 'hidden'),
            $arrow_right = $('<a>').css('visibility', 'hidden'),
            $check1 = $('<input/>').attr({
                type: 'checkbox',
                id:'check1'
            }).css('margin-right','10px'),
            $label1 = $('<label>').text('Show arrow'),
            $check2 = $('<input/>').attr({
                    type: 'checkbox',
                    id: 'check2'
                }).css('margin-left', '10px').css('margin-right', '10px'),
                $label2 = $('<label>').text('Show mini gallery');
            $check1.appendTo($gallery.parent());
            $label1.appendTo($gallery.parent());
            $check2.appendTo($gallery.parent());
            $label2.appendTo($gallery.parent());
            let $box_img = $('<div>');
            var $gallery2 = $gallery_items.children().clone().appendTo($box_img);
            $arrow_left.appendTo($gallery);
            $arrow_right.appendTo($gallery);
            $arrow_right.addClass('icon-arrow-right');
            $arrow_left.addClass('icon-arrow-left');
            $gallery.addClass('gallery').addClass(options.classes);
            $gallery_items.addClass('gallery-item');
            $gallery_items
            .eq(options.current)
            .addClass('current');
            $gallery.css('position', 'relative')
            $gallery_items
            .css('width','100%');
            let mas = [].slice.apply($gallery_items),
            height=mas.map(item=>$(item).height()),
            maxHeight = Math.max(...height);
            $gallery.height(maxHeight);
            $gallery.attr('tabindex',0);

            $arrow_left.on('click', function(event){
                let index = $gallery.find('.current').index();
                event.preventDefault;
                $gallery.find('.current').removeClass('current');
                    if (index - 1 < $gallery_items.length) {
                        $gallery_items.eq(index - 1).addClass('current')
                    } else {
                        $gallery_items.eq(-1).addClass('current')
                    }
            });

            $arrow_right.on('click', function (event) {
                event.preventDefault;
                let index = $gallery.find('.current').index();
                $gallery.find('.current').removeClass('current');
                if (index + 1 < $gallery_items.length) {
                        $gallery_items.eq(index+1).addClass('current')
                    } else{
                         $gallery_items.eq(0).addClass('current')
                    }
            });

            $gallery.on('keyup',function (event){
                if (event.which !== 37 && event.which !== 39) return ;
                let index = $gallery.find('.current').index();
                $gallery.find('.current').removeClass('current');
                if (event.which === 37) {
                    if (index - 1 < $gallery_items.length) {
                        $gallery_items.eq(index - 1).addClass('current')
                    } else {
                        $gallery_items.eq(-1).addClass('current')
                    }
                }
                if(event.which===39){
                    if (index + 1 < $gallery_items.length) {
                        $gallery_items.eq(index+1).addClass('current')
                    } else{
                         $gallery_items.eq(0).addClass('current')
                    }
                }
            })

            $check1.on('click',function(event){
                console.log(event);
                console.log(this.checked);
                if (this.checked){
                    $arrow_left.css('visibility', 'visible');
                    $arrow_right.css('visibility', 'visible');
                }
                if (!this.checked) {
                    $arrow_left.css('visibility', 'hidden');
                    $arrow_right.css('visibility', 'hidden');
                }  
            });

            $check2.on('click', function (event) {
                if (this.checked) {
                    $box_img.css('display', 'block').appendTo($gallery.parent()).attr('id', 'box_img');
                }
                if (!this.checked) {
                   $box_img.remove();
                }
            });


            $gallery2.on('click', function (event) {
                $gallery.find('.current').removeClass('current');
                $gallery_items
                .eq($(this).index())
                .addClass('current');
            });
        });
    };


})(jQuery)