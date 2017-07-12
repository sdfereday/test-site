/// Mithril https://mithril.js.org/simple-application.html
/// https://webpack.js.org/guides/getting-started/#basic-setup
var m = require("mithril"); // Will load when compiled via npm modules and webpack

var postList = require("./views/PostList");
var postDetail = require("./views/PostDetail");

m.route(document.querySelector('.m-content'), "/archive", {
    "/archive": postList,
    "/posts/:guid": postDetail
});