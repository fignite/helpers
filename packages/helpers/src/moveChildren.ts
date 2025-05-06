/**
 * Moves children from one node to another
 * @param {SceneNode} source The node you want to move children from
 * @param {SceneNode} target The node you want to move children to
 * @returns Returns the new target with its children
 */


export function moveChildren(source, target) {
    let children = source.children
    let length = children.length
    for (let i = 0; i < length; i++) {
        let child = children[i]
        target.appendChild(child)
    }

    return target
}