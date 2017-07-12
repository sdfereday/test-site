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
        
        if(!Post.current) {
            Post.current = {};
            return m.request({
                method: "GET",
                url: 'https://sd-blog-c1b48.firebaseio.com/posts.json?orderBy="guid"&equalTo="' + guid + '"&print=pretty' 
            })
            .then(function(snap) {
                // This isn't the right way to do it.
                console.log(snap);
                for(var key in snap)
                {
                    Post.current = snap[key];
                }
            });
        }
            

    }
};

module.exports = Post;