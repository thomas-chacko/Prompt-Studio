'use client'

import { useEffect } from 'react'
import { warmupAPI } from '@/lib/api-warmup'

export default function APIWarmup() {
  useEffect(() => {
    warmupAPI()
  }, [])

  return null
}
