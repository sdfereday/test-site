// src/views/PostList.js
var m = require("mithril");
var PostModel = require("../models/Post");

module.exports = {
    oninit: PostModel.loadPosts,
    view: function () {
        return m(".post-list", PostModel.list.map(function (post) {
            return m(".post", [
                m("span.title", {value: post.title}, "test"),
                m("a.user-list-item", {href: "/posts/" + post.guid, oncreate: m.route.link}, "read")
            ]);
        }));
    }
}