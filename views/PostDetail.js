// src/views/PostDetail.js
var m = require("mithril");
var PostModel = require("../models/Post");

module.exports = {
    oninit: function(vnode) {
        PostModel.loadPost(vnode.attrs.guid);
    },
    view: function () {
        return m(".post", [
            m("span", PostModel.current.title)
        ]);
    }
}