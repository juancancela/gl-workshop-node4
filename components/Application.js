'use strict';

var Application = class Application {
    constructor (name, port) {
        this._name = name;
        this.port = port;
    }

    set name(name) {
        this._name = name
    }

    get name() {
        return this._name
    }

    startMessage(){
        throw new Error("Needs to be implemented");
    }

    createApplication(){
        throw new Error("Needs to be implemented");
    }
};

module.exports = Application;