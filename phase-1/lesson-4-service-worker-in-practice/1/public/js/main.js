/**
 * @file main.js
 * @author huanghuiquan
 */

define(function (require) {
    'use strict';
    let axios = require('axios');
    let render = require('./render');
    let ui = require('./ui');
    // 异步请求数据，并在前端渲染
    axios.get('/api/movies').then(function (response) {
        let $movieList = document.querySelector('.movie-list');
        if (response.status !== 200) {
            $movieList.innerHTML = '网络错误';
            return;
        }
        $movieList.innerHTML = render(response.data);
    });

    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function (event) {
            navigator.serviceWorker.register('/sw.js', {
                    scope: '/'
                })
                .then(function (registeration) {
                    console.log('Service worker register success with scope ' + registeration.scope);
                });
        });

        navigator.serviceWorker.oncontrollerchange = function (event) {
            ui.showToast('页面已更新', 'info');
        };

        // 如果用户处于断网状态进入页面，用户可能无法感知内容是过期，需要提示用户断网了，并在重新连接后告诉用户
        if (!window.navigator.onLine) {
            ui.showToast('网络断开，内容可能已过期', 'info');

            window.addEventListener('online', function () {
                ui.showToast('已连接网络', 'info');
            });

        }
    }
});
