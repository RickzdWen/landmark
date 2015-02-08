/**
 * Created by Administrator on 2015/2/8.
 */

define([
    'backbone',
    'lib/underscore'
], function(Backbone, _){
    var topic = {};
    _.extend(topic, Backbone.Events);
    topic.publish = topic.trigger;
    topic.subscribe = topic.on;
    return topic;
});
