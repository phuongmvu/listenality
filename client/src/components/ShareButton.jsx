import { useState, useRef } from 'react'
import html2canvas from 'html2canvas'
import ShareCard from './ShareCard'

function ShareButton({ profile, analytics, timeRange }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const cardRef = useRef(null)

  const handleExport = async () => {
    if (!cardRef.current) return
    
    setIsGenerating(true)
    try {
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: null,
        scale: 2, // Higher quality
        logging: false,
      })
      
      // Convert to blob and download
      canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.download = `listenality-${Date.now()}.png`
        link.href = url
        link.click()
        URL.revokeObjectURL(url)
        setIsGenerating(false)
        setIsOpen(false)
      })
    } catch (error) {
      console.error('Error generating image:', error)
      setIsGenerating(false)
    }
  }

  return (
    <>
      {/* Share Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 bg-spotify-green hover:bg-spotify-green-dark text-white font-bold py-4 px-8 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 z-50"
      >
        Share your stats
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-spotify-dark-gray rounded-2xl p-8 max-w-2xl my-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Share your listenality</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/60 hover:text-white text-2xl"
              >
                ×
              </button>
            </div>

            {/* Preview */}
            <div className="mb-6 flex justify-center overflow-hidden" style={{ maxHeight: '80vh' }}>
              <div className="transform scale-[0.3] origin-top">
                <ShareCard
                  ref={cardRef}
                  profile={profile}
                  analytics={analytics}
                  timeRange={timeRange}
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 justify-center">
              <button
                onClick={handleExport}
                disabled={isGenerating}
                className="bg-spotify-green hover:bg-spotify-green-dark text-white font-bold py-3 px-8 rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isGenerating ? 'Generating...' : 'Download image'}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="bg-spotify-gray hover:bg-white/20 text-white font-medium py-3 px-8 rounded-full transition-all duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ShareButton

