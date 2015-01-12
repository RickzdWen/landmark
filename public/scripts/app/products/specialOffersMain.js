/**
 * Created by Administrator on 2015/1/13.
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
    var $pWrapper = $('#productConds');
    var $pLinks = $pWrapper.find('a');
    var $paginationWrapper = $('.pagination-container');
    var pagerTemplate = _.template($('#paginationTpl').html());

    $(".parallax-titlebar").pureparallax({
        timeout: 100
    });

    $( '#slider-range' ).slider({
        range: true,
        min: 0,
        max: 1500,
        values: [ 0, 1500 ],
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
        if (condition.pid) {
            hash += 'pid/' + condition.pid + '/';
        }
        hash += 'p' + page;
        window.location.hash = hash;
    });

    APP.on('search', function(cond){
        products.searchSpecialOffers(cond).done(function(data){
            var list = data.result;
            $listNode.html(template(list));
            $paginationWrapper.html(pagerTemplate(data.pager));
            var pid = cond.pid;
            if (!pid) {
                $pLinks.filter(':last').addClass('active');
                $pLinks.not(':last').removeClass('active');
            } else {
                var $active = $pLinks.filter('[data-id=' + pid + ']').addClass('active');
                $pLinks.not($active).removeClass('active');
            }
        }).fail(function(error){
        });
    });

    var condition = {};
    APP.router = Backbone.Router.extend({
        routes : {
            'pid/:pid(/p:page)' : 'searchBrandProducts',
            'p:page' : 'defaultShow',
            '*other' : 'defaultShow'
        },

        searchBrandProducts : function(pid, page) {
            page = page || 1;
            condition.pid = pid;
            condition.page = page;
            APP.trigger('search', condition);
        },

        defaultShow : function(page) {
            condition.pid = '';
            condition.page = page || 1;
            APP.trigger('search', condition);
        }
    });

    var router = new APP.router();
    Backbone.history.start();
});
