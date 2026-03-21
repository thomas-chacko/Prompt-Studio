import { v2 as cloudinary } from 'cloudinary'
import {
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
} from '../config/env.js'

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key:    CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
})

/**
 * Upload an image to Cloudinary.
 * @param {string} source - File path, URL, or base64 data URI
 * @param {string} folder - Cloudinary folder e.g. 'promptstudio/prompts'
 * @returns {Promise<string>} secure_url of the uploaded image
 */
export const uploadImage = async (source, folder) => {
  const result = await cloudinary.uploader.upload(source, {
    folder,
    resource_type: 'image',
    transformation: [{ quality: 'auto', fetch_format: 'auto' }],
  })
  return result.secure_url
}

/**
 * Delete an image from Cloudinary by its public ID.
 * @param {string} publicId - e.g. 'promptstudio/prompts/abc'
 */
export const deleteImage = async (publicId) => {
  await cloudinary.uploader.destroy(publicId)
}

/**
 * Extract the Cloudinary public ID from a full secure URL.
 * e.g. https://res.cloudinary.com/demo/image/upload/v123/promptstudio/prompts/abc.jpg
 *   → promptstudio/prompts/abc
 * @param {string} url - Cloudinary secure URL
 * @returns {string} public ID
 */
export const getPublicId = (url) => {
  const parts = url.split('/')
  const filename = parts[parts.length - 1].split('.')[0]
  const folder = parts[parts.length - 2]
  return `${folder}/${filename}`
}
