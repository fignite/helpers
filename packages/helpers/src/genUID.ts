/**
 * Generates a Unique ID
 * @returns A unique identifier
 */

// TODO: Use with figma.activeUser session ID

export function genUID() {
  // var randPassword = Array(10)
  //   .fill("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz")
  //   .map(function (x) {
  //     return x[Math.floor(Math.random() * x.length)];
  //   })
  //   .join("");
  return `${
    figma.currentUser.id +
    "-" +
    figma.currentUser.sessionId +
    "-" +
    new Date().valueOf()
  }`;
}
