/**
 * Helpers which automatically parse and stringify when you get, set or update plugin data
 */



/**
 * 
 * @param {BaseNode} node A figma node to get data from
 * @param {string} key  The key under which data is stored 
 * @returns Plugin Data
 */
 export function getPluginData(node, key) {
	var data
	if (node.getPluginData(key)) {
		data = JSON.parse(node.getPluginData(key))
	}
	else {
		data = undefined
	}
	return data
}

/**
 * 
 * @param {BaseNode} node  A figma node to set data on
 * @param {String} key A key to store data under
 * @param {any} data Data to be stoed
 */
export function setPluginData(node: BaseNode, key: string, data: any) {
    node.setPluginData(key, JSON.stringify(data))
}

export function updatePluginData(node: BaseNode, key: string, callback: Function) {
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

    return data as any
}