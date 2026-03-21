import crypto from 'crypto'
import { ENCRYPT_SECRET } from '../config/env.js'

const ALGORITHM = 'aes-256-gcm'
const IV_LENGTH = 12   // 96-bit IV recommended for GCM
const KEY = Buffer.from(ENCRYPT_SECRET, 'hex')  // 32-byte key from hex string

/**
 * Encrypt a plaintext string using AES-256-GCM.
 * @param {string} plaintext - The value to encrypt (e.g. a Gemini API key)
 * @returns {string} Colon-separated hex string: iv:authTag:ciphertext
 */
export const encrypt = (plaintext) => {
  const iv = crypto.randomBytes(IV_LENGTH)
  const cipher = crypto.createCipheriv(ALGORITHM, KEY, iv)

  const encrypted = Buffer.concat([
    cipher.update(plaintext, 'utf8'),
    cipher.final(),
  ])
  const authTag = cipher.getAuthTag()

  return [
    iv.toString('hex'),
    authTag.toString('hex'),
    encrypted.toString('hex'),
  ].join(':')
}

/**
 * Decrypt a value produced by encrypt().
 * @param {string} encryptedStr - Colon-separated hex string: iv:authTag:ciphertext
 * @returns {string} Original plaintext
 */
export const decrypt = (encryptedStr) => {
  const [ivHex, authTagHex, ciphertextHex] = encryptedStr.split(':')

  const iv         = Buffer.from(ivHex, 'hex')
  const authTag    = Buffer.from(authTagHex, 'hex')
  const ciphertext = Buffer.from(ciphertextHex, 'hex')

  const decipher = crypto.createDecipheriv(ALGORITHM, KEY, iv)
  decipher.setAuthTag(authTag)

  return Buffer.concat([
    decipher.update(ciphertext),
    decipher.final(),
  ]).toString('utf8')
}
