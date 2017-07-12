// src/models/Post.js
var m = require("mithril");
var Post = {
    list: [],
    current: {},
    loadPosts: function() {
        return m.request({
            method: "GET",
            url: "https://sd-blog-c1b48.firebaseio.com/posts.json"
        })
        .then(function(snap) {

            for(let key in snap) {
                Post.list.push(snap[key]);
            }

        });
    },
    loadPost: function(guid) {
        // Should load a post if none available (try at least)
        Post.current = Post.list.find(x => x.guid === guid);
    }
};

module.exports = Post;