/**
 * Created by rick on 2015/1/9.
 */

define([
    'landmark/declare',
    'ui/_Widget',
    'jquery'
], function(declare, _Widget, $){
    return declare([_Widget], {
        $dropdowns : null,

        onChange : $.noop,

        preCreate : function(props) {
            this.inherited(arguments);
            if (!this.node) {
                throw new Error('please input node for TopBarDropdonw');
            }
            this.$node = $(this.node);
            this.value = this.value || this.$node.data('value');
            if (!this.$dropdowns) {
                this.$dropdowns = $('.top-bar-dropdown');
            }
        },

        create : function() {
            this.$textNode = this.$textNode || this.$node.find('span');
            this.$options = this.$node.find('.options a');
            this.set('value', this.value);
        },

        postCreate : function() {
            var self = this;
            this.$node.on('click', 'a', function(event){
                event.preventDefault();
                event.stopPropagation();
                var oldValue = this.value;
                var value = $(this).data('value');
                if (oldValue === value) {
                    return;
                }
                self.set('value', value);
                self.onChange(value);
                self.hideAll();
            });
            this.$node.on('click', function(event){
                event.stopPropagation();
                self.$dropdowns.not(this).removeClass('active');
                $(this).toggleClass('active');
            });
        },

        hideAll : function() {
            this.$dropdowns.removeClass('active');
        },

        _setValueAttr : function(value) {
            var $item = this.$options.filter('[data-value=' + value + ']');
            if ($item && $item.length) {
                this.value = value;
                var text = $item.text();
                this.$textNode.text(text);
            } else {
                this.value = '';
                this.$textNode.text('');
            }
        }
    });
});
