import { updateClientStorageAsync } from "./clientStorage";
import { getDocumentData, setDocumentData } from "./documentData";
import { genUID } from "./genUID";
/**
 * Saves recently visited files to a list in clientStorage and keeps . Saves recently visited files to clientStorage with associated data
 * @param {any} fileData Any data you want to be associated with the file
 * @returns An array of files
 */

function addUniqueToArray(object, array) {
  // // Only add new template if unique
  var index = array.findIndex((x) => x.id === object.id);
  index === -1 ? array.push(object) : console.log("object already exists");

  return array;
}

function File(data?) {
  this.id =
    getDocumentData("fileId") ||
    setDocumentData("fileId", genUID()).replace(/['"]+/g, "");
  // TODO: When getPluginData has been updated to evaluate expressions at runtime replace with below
  // this.name = `{figma.getNodeById("0:1").name}`
  this.name = figma.root.name;
  if (data) {
    this.data = data;
    setDocumentData("fileData", data);
  }
}

export async function getRecentFilesAsync(fileData?): Promise<object[]> {
  // Should it include an option top only add published components/data?
  // const publishedComponents = await getPublishedComponents(fileData)

  fileData = fileData || getDocumentData("fileData");

  return updateClientStorageAsync("recentFiles", (recentFiles) => {
    recentFiles = recentFiles || [];

    const newFile = new File(fileData);

    // We have to check if the array is empty because we can't filter an empty array
    if (recentFiles.length === 0) {
      if (fileData.length > 0) recentFiles.push(newFile);
    } else {
      // If unique then add to array
      addUniqueToArray(newFile, recentFiles);

      // If not, then update
      recentFiles.filter((item) => {
        if (item.id === newFile.id) {
          item.name = newFile.name;
          item.data = newFile.data;
          setDocumentData("fileData", newFile.data);
        }
      });
    }

    return recentFiles;
  });
}
