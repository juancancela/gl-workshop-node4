'use strict';

var views = require('co-views');
var assets = require('koa-static-folder');
var logger = require('koa-logger');
var route = require('koa-route');
var koa = require('koa');
var parser = require('co-body');
var KoaApplication = require('./KoaApplication');

const PUBLIC_PATH = './public';

var KoaApplicationFactory = class KoaApplicationFactory {

    /**
     * build a Koa Application
     * @param name the name of the application
     * @param port the application port
     */
    static build(name, port){
        var render = views(__dirname + '/../views/', {
            map: { html: 'swig' }
        });

        var app = new KoaApplication(
            koa,
            route,
            render,
            assets,
            logger,
            parser,
            name,
            port);

        app.setStaticFolder(PUBLIC_PATH);

        return app;
    }
};

module.exports = KoaApplicationFactory;