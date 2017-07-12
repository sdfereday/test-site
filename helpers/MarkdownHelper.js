// External markdown formatting (needs more research as this would be better as a helper)
// https://github.com/showdownjs/showdown
// https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet
let Formatter = new showdown.Converter();

class MarkdownHelper {

    static format(txt) {
        return Formatter.makeHtml(txt);
    }

}

module.exports = MarkdownHelper;