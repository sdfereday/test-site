// src/views/PostDetail.js
let m = require("mithril");
let PostModel = require("../models/Post");
let MarkdownHelpers = require("../helpers/MarkdownHelpers");
let StringHelpers = require("../helpers/StringHelpers");
let ArrayHelpers = require("../helpers/ArrayHelpers");

let PostDetail = {
    oninit: function (vnode) {
        PostModel.loadPost(vnode.attrs.guid);
    },
    onbeforeremove: function (vnode) {
        window.animatelo.slideOutLeft(".animate");
    },
    onTagSelection: function (e) {
        let tag = e.target ? e.target.getAttribute("data-tag") : "";
        if (tag.length > 0) {
            PostModel.filterByTag(tag);
            m.route.set("/archive:" + tag);
        }
    },
    view: function () {
        window.animatelo.slideInLeft(".animate", {
            delay: 100,
            duration: 200
        });
        window.scrollTo(0, 0);
        return m(".post.clearfix",
            m(".post-inner", [
                (function () {
                    if (PostModel.current.tags.length > 0)
                        return m("span.tags", ArrayHelpers.stringToArray(PostModel.current.tags).map(function (tag) {
                            return m("button.tag", { onclick: PostDetail.onTagSelection, "data-tag": tag }, tag);
                        }));
                })(),
                m("p.title", PostModel.current.title),
                m("span.date", StringHelpers.dateToReadable(PostModel.current.date)),
                m("div", m.trust(MarkdownHelpers.format(PostModel.current.body))),
                m("a.button.button-outline.button-red", { href: "./", oncreate: m.route.link }, "back")
            ])
        );
    }
};

module.exports = PostDetail;