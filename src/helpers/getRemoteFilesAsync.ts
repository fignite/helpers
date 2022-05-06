import { getClientStorageAsync } from "./clientStorage";
import { updatePluginData, getPluginData } from "./pluginData";

/**
 * Returns any remote files used by the plugin. It merges any files stored on clientStorage with those collected by the plugin on the file. It also tries to update the file name.
 * @param {any} fileData Any data you want to be associated with the file
 * @returns An array of files
 */

export async function getRemoteFilesAsync(): Promise<object[]> {
  var recentFiles = await getClientStorageAsync("recentFiles");

  return updatePluginData(figma.root, "remoteFiles", (remoteFiles) => {
    remoteFiles = remoteFiles || [];

    // Merge recentFiles into remoteFiles (because we need to add them if they don't exist, and update them if they do)
    if (recentFiles.length > 0) {
      // if (!remoteFiles) remoteFiles = []

      // I think this is a method of merging files, maybe removing duplicates?
      var ids = new Set(remoteFiles.map((file) => file.id));
      var merged = [
        ...remoteFiles,
        ...recentFiles.filter((file) => !ids.has(file.id)),
      ];

      // Exclude current file (because we want remote files to this file only)
      merged = merged.filter((file) => {
        return !(file.id === getPluginData(figma.root, "fileId"));
      });

      remoteFiles = merged;
    }

    // Then I check to see if the file name has changed and make sure it's up to date
    // For now I've decided to include unpublished components in remote files, to act as a reminder to people to publish them
    if (remoteFiles.length > 0) {
      for (var i = 0; i < remoteFiles.length; i++) {
        var file = remoteFiles[i];
        figma
          .importComponentByKeyAsync(file.data[0].component.key)
          .then((component) => {
            var remoteTemplate = getPluginData(component, "template");
            updatePluginData(figma.root, "remoteFiles", (remoteFiles) => {
              remoteFiles.map((file) => {
                if (file.id === remoteTemplate.file.id) {
                  file.name = remoteTemplate.file.name;
                }
              });
              return remoteFiles;
            });
          })
          .catch((error) => {
            console.log(error);
            // FIXME: Do I need to do something here if component is deleted?
            // FIXME: Is this the wrong time to check if component is published?
            // figma.notify("Please check component is published")
          });
      }
    }
    return remoteFiles;
  });
}
