// src/views/PostList.js
var m = require("mithril");
var Post = require("../models/Post");

module.exports = {
    oninit: Post.loadPosts,
    view: function () {
        return m(".post-list", Post.list.map(function (post) {
            return m(".post", post.title);
        }));
    }
}