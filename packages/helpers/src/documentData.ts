import { setPluginData, getPluginData, updatePluginData } from "./pluginData";

/**
 * An alias for `figma.root` plugin data
 * @param {String} key A key to store data under
 * @param {any} data Data to be stored
 */
export function setDocumentData(key: string, data: any) {
  return setPluginData(figma.root, key, data);
}

/**
 * An alias for `figma.root` plugin data
 * @param {String} key A key to store data under
 */
export function getDocumentData(key: string) {
  return getPluginData(figma.root, key);
}

/**
 * An alias for `figma.root` plugin data
 * @param {String} key A key to store data under
 */
export function updateDocumentData(
  node: BaseNode,
  key: string,
  callback: Function
) {
  return updatePluginData(node, key, callback);
}
