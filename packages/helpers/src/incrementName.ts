/**
 * Increments the name numerically by 1.
 * @param {String} name The name you want to increment
 * @param {Array} array An array of objects to sort and compare against
 * @returns The incremented name
 */

export function incrementName(name, array?) {
  let nameToMatch = name;

  if (array && array.length > 1) {
    array.sort((a, b) => {
      if (a.name === b.name) return 0;

      return a.name > b.name ? -1 : 1;
    });

    nameToMatch = array[0].name;
  }

  let matches = nameToMatch.match(/^(.*\S)(\s*)(\d+)$/);

  // And increment by 1
  // Ignores if array is empty
  if (matches && !(array && array.length === 0)) {
    name = `${matches[1]}${matches[2]}${parseInt(matches[3], 10) + 1}`;
  }

  return name;
}
