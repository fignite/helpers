import { updateClientStorageAsync } from "./clientStorage";
import { getDocumentData, setDocumentData } from "./documentData";
import { getPluginData } from "./pluginData";
import { genUID } from "./genUID";
/**
 * Saves recently visited files to a list in clientStorage and keeps the data and name up to date each time they're visited. If a file is duplicated it could be problematic. The only solution is for the user to run the plugin when the file has been duplicated with the suffix "(Copy)" still present. Then the plugin will reset the fileId.
 * @param {any} fileData Any data you want to be associated with the file
 * @returns An array of files excluding the current file
 */

function addUniqueToArray(array, object) {
  // // Only add new template if unique
  var index = array.findIndex((x) => x.id === object.id);
  index === -1 ? array.push(object) : false;

  return array;
}

function isUnique(array, object) {
  // // Only add new template if unique
  var index = array.findIndex((x) => x.id === object.id);
  return index === -1 ? true : false;
}

function getDupeFile(array, object) {
  let index = array.findIndex((x) => x.id === object.id);
  return array[index];
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
  } else {
    this.data = getDocumentData("fileData");
  }
}

export async function getRecentFilesAsync(fileData?): Promise<object[]> {
  // Should it include an option top only add published components/data?
  // const publishedComponents = await getPublishedComponents(fileData)

  fileData = fileData || getDocumentData("fileData");

  let recentFiles = await updateClientStorageAsync(
    "recentFiles",
    (recentFiles) => {
      recentFiles = recentFiles || [];

      const currentFile = new File(fileData);

      // We have to check if the array is empty because we can't filter an empty array
      if (recentFiles.length === 0) {
        if (fileData.length > 0) recentFiles.push(currentFile);
      } else {
        // BUG: It's not possible to check for duplicates because you would need some way to tell them apart, otherwise you don't know if its a duplicate file for just the same file. I tried resetting the fileId when it wasn't unique, but then when it was a file that's already been added I had no way of telling them apart.

        // This is sort of like a get out clause. It enables a user to register a duplicated file if its the same user and the plugin is run when the file name ends in (Copy).
        if (!isUnique(recentFiles, currentFile)) {
          let [id, sessionId, timestamp] = currentFile.id.split("-");

          if (
            id === figma.currentUser.id &&
            sessionId !== figma.currentUser.sessionId.toString() &&
            figma.root.name.endsWith("(Copy)") &&
            !getDocumentData("duplicateResolved")
          ) {
            currentFile.id = setDocumentData("fileId", genUID()).replace(
              /['"]+/g,
              ""
            );
            setDocumentData("duplicateResolved", true);
          }
        }

        if (!figma.root.name.endsWith("(Copy)")) {
          setDocumentData("duplicateResolved", "");
        }

        // If unique then add to array
        addUniqueToArray(recentFiles, currentFile);

        // If not, then update
        recentFiles.filter((item, i) => {
          if (item.id === currentFile.id) {
            item.name = currentFile.name;
            item.data = currentFile.data;
            setDocumentData("fileData", fileData);

            // If data no longer exists, delete the file
            if (
              !fileData ||
              (Array.isArray(fileData) && fileData.length === 0)
            ) {
              recentFiles.splice(i, 1);
            }
          }
        });
      }

      return recentFiles;
    }
  );

  // Exclude current file
  recentFiles = recentFiles.filter((file) => {
    return !(file.id === getPluginData(figma.root, "fileId"));
  });

  return recentFiles;
}
