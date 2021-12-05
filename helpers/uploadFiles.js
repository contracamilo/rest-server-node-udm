const { v4: uuids4 } = require("uuid");
const path = require("path");

const uploadFiles = (
  files,
  validExtensions = ["png", "jpg", "jpeg", "gif"],
  folder = ""
) => {
  return new Promise((resolve, reject) => {
    const { file } = files;
    const splittedName = `${file.name}`.split(".");
    const ext = splittedName[splittedName.length - 1];

    const temporalName = `${uuids4()}.${ext}`;

    if (!validExtensions.includes(ext)) {
      return reject(
        `.${ext} is not an allowed extension. must be: ${validExtensions}`
      );
    }

    const uploadPath = path.join(
      __dirname,
      `../uploads/`,
      folder,
      temporalName
    );

    file.mv(uploadPath, (err) => {
      if (err) {
        return reject(err);
      }

      resolve(temporalName);
    });
  });
};

module.exports = {
  uploadFiles,
};
