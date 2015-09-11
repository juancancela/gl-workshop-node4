'use strict';

var Application = require('./Application');

var KoaApplication = class KoaApplication extends Application {

    constructor (core, route, render, assets, logger, parser, name, port){
        super(name, port);

        this.core = core();
        this.route = route;
        this.assets = assets;
        this.logger = logger;
        this.render = render;
        this.parser = parser;
    }

    startMessage(){
        console.log(`Application ${this.name} is running in port ${this.port}`);
    }


    /**
     * starts the application
     */
    startApplication(){
        this.core.listen(this.port)
    }

    /**
     * sets the static folder where assets will be placed
     * @param path the path to the static folder
     */
    setStaticFolder(path){
        this.core.use(this.assets(path))
    }

    /**
     * sets application logger
     */
    setLogger(){
        this.core(this.logger())
    }

    /**
     * @returns {*} render component
     */
    getRender(){
        return this.render;
    }

    /**
     * @returns {parser} body parser
     */
    getParser(){
        return this.parser;
    }

    /**
     * define application routes
     * @param op the http operation type (get, post)
     * @param path the application path
     * @param fn the function assigned to handle the route
     */
    setRoute(op, path, fn){
        switch (op) {
            case 'get':
                this.core.use(this.route.get(path, fn));
                break;
            case 'post':
                this.core.use(this.route.post(path, fn));
                break;
        }
    }

};

module.exports = KoaApplication;