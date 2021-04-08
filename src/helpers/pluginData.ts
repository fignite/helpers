/**
 * Helpers which automatically parse and stringify when you get, set or update plugin data
 */

export function getPluginData(node, key) {
    return JSON.parse(node.getPluginData(key))
}

export function setPluginData(node, key, data) {
    node.setPluginData(key, JSON.stringify(data))
}

export function updatePluginData(node, key, callback) {
    var data

    if (node.getPluginData(key)) {
        data = JSON.parse(node.getPluginData(key))
    }
    else {
        data = null
    }

    data = callback(data)

    // What should happen if user doesn't return anything in callback?
    if (!data) {
        data = null
    }

    node.setPluginData(key, JSON.stringify(data))

    return data
}