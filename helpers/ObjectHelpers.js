class ObjectHelpers {

    static firstInObject(obj) {
        return obj[Object.keys(obj)[0]];
    }

}

module.exports = ObjectHelpers;