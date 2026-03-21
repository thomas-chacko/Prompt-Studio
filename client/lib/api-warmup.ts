// API warmup utility to wake up Render free tier
export const warmupAPI = async () => {
  try {
    const baseURL = process.env.NODE_ENV === 'development' 
      ? 'http://localhost:5000'
      : 'https://prompt-studio-0egh.onrender.com'
    
    await fetch(`${baseURL}`, { 
      method: 'GET',
      cache: 'no-store'
    })
  } catch (error) {
    // Silently fail - this is just a warmup call
    console.log('API warmup initiated')
  }
}
