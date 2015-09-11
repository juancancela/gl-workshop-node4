'use strict';

var KoaFactory = require('./components/KoaApplicationFactory');

var posts = [];

var app = KoaFactory.build("Test App", 3000);

app.setRoute('get','/', list);
app.setRoute('get','/post/new', add);
app.setRoute('get','/post/:id', show);
app.setRoute('post','/post', create);

app.startMessage();
app.startApplication();


function *list() {
    this.body = yield app.getRender()('list', { posts: posts });
}

function *add() {
    this.body = yield app.getRender()('new');
}

function *show(id) {
    var post = posts[id];
    if (!post) this.throw(404, 'invalid post id');
    this.body = yield app.getRender()('show', { post: post });
}

function *create() {
    var post = yield app.getParser()(this);
    var id = posts.push(post) - 1;
    post.created_at = new Date;
    post.id = id;
    this.redirect('/');
}