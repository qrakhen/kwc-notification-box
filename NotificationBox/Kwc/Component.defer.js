"use strict";
var $ = require('jquery');
var onReady = require('kwf/on-ready');

onReady.onRender('.kwcClass', function (el, config) {

    var setCookieValue = function(key, value, daysUntilExpired) {
        var d = new Date();
        d.setTime(d.getTime() + (daysUntilExpired * 24 * 60 * 60 * 1000));
        var expires = 'expires=' + d.toUTCString();
        document.cookie = key + '=' + value + ';' + expires + ';path=/';
    };

    var getCookieValue = function(key) {
        var name = key + '=',
            decoded = decodeURIComponent(document.cookie),
            ca = decoded.split(';');
        for (var i = 0; i <ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return '';
    };

    var
        notificationSeen = getCookieValue('notificationSeen'),
        notificationChanged = config.changeDate;

    if (!notificationSeen || (new Date(notificationSeen) < new Date(notificationChanged))) {
        el.show();
        el.find('.kwcBem__accept').click(function(e) {
            e.preventDefault();
            el.hide();
            setCookieValue('notificationSeen', config.changeDate, 30);
            var body = $('body');
            body.removeClass('kwfUp-showNotificationBox').addClass('kwfUp-notificationSeen');
            onReady.callOnContentReady((body), { action: 'widthChange' });
        });
    }
});
