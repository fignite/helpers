import { getClientStorageAsync } from "./clientStorage";
import { updatePluginData, getPluginData } from "./pluginData";

/**
 * Returns any remote files associated with the current file used by the plugin and keeps the name and data up to date.
 * @returns An array of files
 */

export async function getRemoteFilesAsync(fileId?): Promise<object[]> {
  var recentFiles = await getClientStorageAsync("recentFiles");

  return updatePluginData(figma.root, "remoteFiles", (remoteFiles) => {
    remoteFiles = remoteFiles || [];

    // Add new file to remote files
    if (fileId) {
      let fileAlreadyExists = remoteFiles.find((file) => file.id === fileId);
      let recentFile = recentFiles.find((file) => file.id === fileId);

      if (!fileAlreadyExists) {
        remoteFiles.push(recentFile);
      }
    }

    // Update all remote files with data from recent files
    if (recentFiles.length > 0) {
      for (let i = 0; i < remoteFiles.length; i++) {
        var remoteFile = remoteFiles[i];
        for (let x = 0; x < recentFiles.length; x++) {
          var recentFile = recentFiles[x];
          // Update existing remote files
          if (recentFile.id === remoteFile.id) {
            remoteFiles[i] = recentFile;
          }
        }
      }

      // // I think this is a method of merging files, maybe removing duplicates?
      // var ids = new Set(remoteFiles.map((file) => file.id));
      // var merged = [
      //   ...remoteFiles,
      //   ...recentFiles.filter((file) => !ids.has(file.id)),
      // ];

      // // Exclude current file (because we want remote files to this file only)
      // merged = merged.filter((file) => {
      //   return !(file.id === getPluginData(figma.root, "fileId"));
      // });

      // Exclude current file (because we want remote files to this file only)
      remoteFiles = remoteFiles.filter((file) => {
        return !(file.id === getPluginData(figma.root, "fileId"));
      });
    }
    // }

    // Then I check to see if the file name has changed and make sure it's up to date
    // For now I've decided to include unpublished components in remote files, to act as a reminder to people to publish them
    if (remoteFiles.length > 0) {
      for (var i = 0; i < remoteFiles.length; i++) {
        var file = remoteFiles[i];
        if (file.data[0]) {
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
    }
    return remoteFiles;
  });
}

export function removeRemoteFile(fileId): object[] {
  return updatePluginData(figma.root, "remoteFiles", (remoteFiles) => {
    let fileIndex = remoteFiles.findIndex((file) => {
      return file.id === fileId;
    });

    if (fileIndex !== -1) {
      remoteFiles.splice(fileIndex, 1);
    }

    return remoteFiles;
  });
}
