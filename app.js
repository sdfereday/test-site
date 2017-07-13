/// Mithril https://mithril.js.org/simple-application.html
/// https://webpack.js.org/guides/getting-started/#basic-setup
var m = require("mithril"); // Will load when compiled via npm modules and webpack

var postList = require("./views/PostList");
var postDetail = require("./views/PostDetail");
var defaultLocation = "/archive";
var routes = {
    "./": postList,
    "/": postList,
    "/archive": postList,
    "/posts/:guid": postDetail
};

m.route(document.querySelector('.m-content'), defaultLocation, routes);
m.render(document.querySelector('.heading'), m("a", { href: "./", oncreate: m.route.link }, "DevNoodle Blog"));