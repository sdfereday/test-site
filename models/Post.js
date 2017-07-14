// src/models/Post.js
var m = require("mithril");
var ObjectHelpers = require("../helpers/ObjectHelpers");
var ArrayHelpers = require("../helpers/ArrayHelpers");

var Post = {
    list: [],
    current: {},
    loadPosts: function() {
        
        if(Post.list.length > 0)
            return;

        return m.request({
            method: "GET",
            url: "https://sd-blog-c1b48.firebaseio.com/posts.json"
        })
        .then(function(snap) {

            for(let key in snap) {
                Post.list.push(snap[key]);
            }

            Post.list = Post.list.sort((x, y) => ArrayHelpers.sort(x.date, y.date));

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
                Post.current = ObjectHelpers.firstInObject(snap);
            });
        }
            

    }
};

module.exports = Post;