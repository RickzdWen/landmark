/**
 * Created by Administrator on 2015/1/18.
 */

require([
    'domReady!',
    'jquery',
    'backbone',
    'lib/underscore',
    'app/services/products',
    'lib/jquery.selectric.min',
    'lib/jquery.pricefilter',
    'lib/jquery.pureparallax',
    'app/common/commonRun'
], function(doc, $, Backbone, _, products){
    var APP = {Models:{},Views:{},Collections:{}};
    _.extend(APP, Backbone.Events);

    var template = _.template($('#productTpl').html());
    var $listNode = $('#resultList');
    var $brandsWrapper = $('#brandsConds');
    var $brandLinks = $brandsWrapper.find('a');
    var $paginationWrapper = $('.pagination-container');
    var pagerTemplate = _.template($('#paginationTpl').html());

//    $brandsWrapper.on('click', 'a', function(){
//        $(this).addClass('active');
//        $brandsWrapper.find('a').not(this).removeClass('active');
//    });

    $(".parallax-titlebar").pureparallax({
        timeout: 100
    });

    $( '#slider-range' ).slider({
        range: true,
        min: 0,
        max: 600,
        values: [ 0, 600 ],
        slide: function( event, ui ) {
            event = event;
            $( '#amount' ).val( '$' + ui.values[ 0 ] + ' - $' + ui.values[ 1 ] );
            condition.price_left = ui.values[ 0 ];
            condition.price_right = ui.values[ 1 ];
        }
    });
    $( '#amount' ).val( '$' + $( '#slider-range' ).slider( 'values', 0 ) +
        ' - $' + $( '#slider-range' ).slider( 'values', 1 ) );

    $('#filter').on('click', function(e){
        e.preventDefault();
        APP.trigger('search', condition);
    });

    $('.orderby').selectric({
        onChange : function(elem){
            var value = $(elem).val();
            switch (value) {
                case 'pa' :
                    condition.sort_by = 'p';
                    condition.sort_direct = 1;
                    break;
                case 'pd' :
                    condition.sort_by = 'p';
                    condition.sort_direct = '';
                    break;
                default :
                    condition.sort_by = condition.sort_direct = '';
            }
            APP.trigger('search', condition);
        }
    });

    $paginationWrapper.on('click', 'a', function(e){
        e.preventDefault();
        var page = $(this).data('page');
        if (!page || $(this).hasClass('current-page')) {
            return;
        }
        var hash = '';
        if (condition.bid) {
            hash += 'b' + condition.bid + '/';
        }
        hash += 'p' + page;
        window.location.hash = hash;
    });

    APP.on('search', function(cond){
        products.search(cond).done(function(data){
            var list = data.result;
            $listNode.html(template(list));
            $paginationWrapper.html(pagerTemplate(data.pager));
            var cid = cond.cid;
            if (!cid) {
                $brandLinks.filter(':last').addClass('active');
                $brandLinks.not(':last').removeClass('active');
            } else {
                var $active = $brandLinks.filter('[data-id=' + cid + ']').addClass('active');
                $brandLinks.not($active).removeClass('active');
            }
        }).fail(function(error){
        });
    });

    var condition = {};
    APP.router = Backbone.Router.extend({
        routes : {
            'b:bid(/p:page)' : 'searchBrandProducts',
            'c:cid(/p:page)' : 'searchCategoryProducts',
            'p:page' : 'defaultShow',
            '*other' : 'defaultShow'
        },

        searchBrandProducts : function(bid, page) {
            page = page || 1;
            condition.cid = '';
            condition.bid = bid;
            condition.page = page;
            APP.trigger('search', condition);
        },

        searchCategoryProducts : function(cid, page) {
            page = page || 1;
            condition.cid = cid;
            condition.bid = '';
            condition.page = page;
            APP.trigger('search', condition);
        },

        defaultShow : function(page) {
            condition.cid = '';
            condition.bid = '';
            condition.page = page || 1;
            APP.trigger('search', condition);
        }
    });

    var router = new APP.router();
    Backbone.history.start();
});
