/**
 * Helpers which automatically parse and stringify when you get, set or update plugin data
 */

/**
 *
 * @param {BaseNode} node A figma node to get data from
 * @param {string} key  The key under which data is stored
 * @returns Plugin Data
 */
export function getPluginData(node, key, opts?) {
  var data;

  data = node.getPluginData(key);

  if (data) {
    if (data.startsWith(">>>")) {
      data = data;
    } else {
      data = JSON.parse(data);
    }
  } else {
    data = undefined;
  }

  if (typeof data === "string" && data.startsWith(">>>")) {
    data = data.slice(3);

    var string =
      `(() => {
            return ` +
      data +
      `
            })()`;
    data = eval(string);
  }

  return data;
}

/**
 *
 * @param {BaseNode} node  A figma node to set data on
 * @param {String} key A key to store data under
 * @param {any} data Data to be stoed
 */
export function setPluginData(node: BaseNode, key: string, data: any) {
  if (typeof data === "string" && data.startsWith(">>>")) {
    node.setPluginData(key, data);
  } else {
    node.setPluginData(key, JSON.stringify(data));
  }
}

export function updatePluginData(
  node: BaseNode,
  key: string,
  callback: Function
) {
  var data;

  if (node.getPluginData(key)) {
    data = JSON.parse(node.getPluginData(key));
  } else {
    data = null;
  }

  data = callback(data);

  // What should happen if user doesn't return anything in callback?
  if (!data) {
    data = null;
  }

  node.setPluginData(key, JSON.stringify(data));

  return data as any;
}
