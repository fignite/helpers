import { getPluginData, setPluginData, updatePluginData } from '../src/helpers/pluginData';

var node = figma.createRectangle()

test('get plugin data', () => {
    // Set using native method for true test
    node.setPluginData('test', "true")

    expect(getPluginData(node, 'test')).toBe(true)
});

test('set plugin data', () => {

    setPluginData(node, 'test', true)

    // Check using native method for true test
    expect(node.getPluginData('test')).toBe("true")
});

test('update plugin data', () => {

    setPluginData(node, 'test', {
        prop1: true,
        prop2: true
    })

    updatePluginData(node, 'test', (value) => {
        value.prop2 = false

        return value
    })

    // Check using native method for true test
    expect(node.getPluginData('test')).toBe('{"prop1":true,"prop2":false}')
});