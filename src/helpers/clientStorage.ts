/**
 * Helpers which make it easier to update client storage
 */

export async function getClientStorageAsync(key) {
    return await figma.clientStorage.getAsync(key)
}

export function setClientStorageAsync(key, data) {
    return figma.clientStorage.setAsync(key, data)
}

export async function updateClientStorageAsync(key, callback) {

    var data = await figma.clientStorage.getAsync(key)

    data = callback(data)

    // What should happen if user doesn't return anything in callback?
    if (!data) {
        data = null
    }
    else {
        figma.clientStorage.setAsync(key, data)
        return data
    } 
}