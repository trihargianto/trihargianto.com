export default function isMobile() {
  const mobileThreshold = 768;
  
  if (typeof window !== "undefined") {
    if (window.innerWidth < mobileThreshold) {
      return true
    }
  }
  return false
}
