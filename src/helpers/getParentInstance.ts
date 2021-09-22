export function getParentInstance(node) {
    const parent = node.parent
    if (node.type === "PAGE") return false

    if (parent.type === "INSTANCE") {
        return parent
    } else {
        return getParentInstance(parent)
    }


}