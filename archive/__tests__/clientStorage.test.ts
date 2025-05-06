import { getClientStorageAsync, setClientStorageAsync, updateClientStorageAsync } from '../src/helpers/clientStorage';

test(`cannot test as clientStorage doesn't exist in figma-api-test`, () => {

})

// test('get client storage', () => {
//     // Set using native method for true test
//     figma.clientStorage.setAsync('test', true)

//     getClientStorageAsync('test').then((value) => {
//         expect(value).toBe(true)
//     })

// });

// test('set client storage', () => {

//     setClientStorageAsync('test', true)

//     // Check using native method for true test
//     figma.clientStorage.getAsync('test').then((value) => {
//         expect(value).toBe(true)
//     })

// });

// test('update client storage', () => {

//     setClientStorageAsync('test', {
//         prop1: true,
//         prop2: true
//     }).then(() => {
//         // Under test condition must wait until promise is resolved. This scenario wouldn't happen in production.
//         updateClientStorageAsync('test', (value) => {
//             value.prop2 = false

//             return value
//         }).then(() => {
//             figma.clientStorage.getAsync('test').then((value) => {
//                 expect(value).toBe({prop1: true, prop2: false})
//             })

//         })
//     })
// });