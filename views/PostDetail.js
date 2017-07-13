// src/views/PostDetail.js
var m = require("mithril");
var PostModel = require("../models/Post");
var MarkdownHelpers = require("../helpers/MarkdownHelpers");
var StringHelpers = require("../helpers/StringHelpers");

module.exports = {
    oninit: function (vnode) {
        PostModel.loadPost(vnode.attrs.guid);
    },
    onbeforeremove: function (vnode) {
        window.animatelo.slideOutLeft(".animate");
    },
    view: function () {
        window.animatelo.slideInLeft(".animate", {
            delay: 100,
            duration: 200
        });
        window.scrollTo(0, 0);
        return m(".post.clearfix",
            m(".post-inner", [
                m("p.title", PostModel.current.title),
                m("span.date", StringHelpers.dateToReadable(PostModel.current.date)),
                m("div", m.trust(MarkdownHelpers.format(PostModel.current.body))),
                m("a.button.button-outline.button-red", { href: "./", oncreate: m.route.link }, "back")
            ])
        );
    }
}