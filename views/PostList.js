// src/views/PostList.js
var m = require("mithril");
var PostModel = require("../models/Post");
var MarkdownHelper = require("../helpers/MarkdownHelper");

module.exports = {
    oninit: PostModel.loadPosts,
    view: function() {
        return m(".post-list", PostModel.list.map(function(post) {
            return m(".post.clearfix",
                m(".post-inner", [
                    m("p.title", post.title),
                    m("span.date", post.date),
                    m("div", m.trust(MarkdownHelper.format(
                        StringHelper.truncate.apply(post.body, [24, true])
                    ))),
                    m("a.button.button-outline.button-red", { href: "/posts/" + post.guid, oncreate: m.route.link }, "read")
                ])
            );
        }));
    }
}