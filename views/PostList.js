// src/views/PostList.js
var m = require("mithril");
// var anims = require("animatelo"); <-- broken
var PostModel = require("../models/Post");
var MarkdownHelpers = require("../helpers/MarkdownHelpers");
var StringHelpers = require("../helpers/StringHelpers");

module.exports = {
    oninit: PostModel.loadPosts,
    onbeforeremove: function(vnode) {
        window.animatelo.slideOutLeft(".animate");
    },
    view: function() {
        window.animatelo.slideInLeft(".animate", {
            delay: 100,
            duration: 200
        });
        window.scrollTo(0, 0);
        return m(".post-list", PostModel.list.map(function(post) {
            return m(".post.clearfix",
                m(".post-inner", [
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
}