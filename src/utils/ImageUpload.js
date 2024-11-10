const ImageUpload = async (file) => {
  const cloudname = import.meta.env.VITE_CLOUDINARY_CLOUDNAME
  const upload_preset = import.meta.env.VITE_UPLOAD_PRESET

  if (typeof file !== 'string') {
    try {
      if (cloudname && upload_preset) {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('upload_preset', upload_preset)

        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudname}/image/upload`,
          {
            method: 'POST',
            body: formData,
          }
        )

        if (response.ok) {
          const data = await response.json()
          return data.secure_url
        } else {
          throw new Error('Image upload failed')
        }
      } else {
        throw new Error('Missing Cloudinary configuration')
      }
    } catch (error) {
      console.error('Error uploading image:', error)
      return null
    }
  } else {
    return file
  }
}

export default ImageUpload
