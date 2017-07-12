// src/views/PostDetail.js
var m = require("mithril");
var PostModel = require("../models/Post");
var MarkdownHelper = require("../helpers/MarkdownHelper");

module.exports = {
    oninit: function (vnode) {
        PostModel.loadPost(vnode.attrs.guid);
    },
    view: function () {
        return m(".post.clearfix",
            m(".post-inner", [
                m("p.title", PostModel.current.title),
                m("span.date", PostModel.current.date),
                m("div", m.trust(MarkdownHelper.format(PostModel.current.body))),
                m("a.button.button-outline.button-red", { href: "./", oncreate: m.route.link }, "back")
            ])
        );
    }
}