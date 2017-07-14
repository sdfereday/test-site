// src/views/PostList.js
let m = require("mithril");
// let anims = require("animatelo"); <-- broken
let PostModel = require("../models/Post");
let MarkdownHelpers = require("../helpers/MarkdownHelpers");
let StringHelpers = require("../helpers/StringHelpers");
let ArrayHelpers = require("../helpers/ArrayHelpers");

let PostList = {
    oninit: PostModel.loadPosts,
    onbeforeremove: function (vnode) {
        window.animatelo.slideOutLeft(".animate");
    },
    onTagSelection: function (e, a) {
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
        return m(".post-list", PostModel.list.map(function (post) {
            return m(".post.clearfix",
                m(".post-inner", [
                    (function () {
                        if (post.tags.length > 0)
                            return m("span.tags", ArrayHelpers.stringToArray(post.tags).map(function (tag) {
                                return m("button.tag", { onclick: PostList.onTagSelection, "data-tag": tag }, tag);
                            }));
                    })(),
                    m("p.title", post.title),
                    m("span.date", StringHelpers.dateToReadable(post.date)),
                    m("div", m.trust(MarkdownHelpers.format(
                        StringHelpers.truncate.apply(post.body, [124, true])
                    ))),
                    m("a.button.button-outline.button-red", { href: "/posts/" + post.guid, oncreate: m.route.link }, "read")
                ])
            );
        }));
    }
};

module.exports = PostList;