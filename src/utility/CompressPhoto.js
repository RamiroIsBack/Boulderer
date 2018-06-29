// https://stackoverflow.com/questions/44429798/compressing-base64-encoded-images-in-react-native-on-android-does-not-recognise

export function compressPhoto(photo) {
  return new Promise((resolve, reject) => {
  
      let tempUri = `${cache}/Vire_${photo.data.userPhotoDate}.jpg`
  
      fs.writeFile(tempUri, photo.data.userPhoto, "base64")
          .then(() => {
              ImageResizer.createResizedImage(
                  `file:${tempUri}`, IMAGE_TARGET_SIZE, IMAGE_TARGET_SIZE, "JPEG", 100, 0).then((resizedImageUri) => {
                  fs.readFile(`${resizedImageUri}`, "base64")
                      .then( data => {
                          resolve({...photo, data: { ...photo.data, userPhoto: data }})
                      })
                      .catch(error => reject(`readFile:error: ${error}`))
              },
              (error) => reject(`createResizedImage:error: ${error}`)
              )
          })
          .catch( error => {
              reject(`writeFile:error: ${error}`)
          })
  
  })
}