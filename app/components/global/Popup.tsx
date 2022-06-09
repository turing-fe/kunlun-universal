import type { FC } from 'react'
import { useEffect, useState } from 'react'

interface PopupProps {
  text: string
  url: string
}

export const Popup: FC<PopupProps> = ({ text, url }) => {
  const [show, setShow] = useState<boolean>(true)

  useEffect(() => {
    const showPopup: string | null = localStorage.getItem('showPopup')
    if (showPopup === 'FALSE') {
      setShow(false)
    }
  }, [])

  function hidePopup() {
    localStorage.setItem('showPopup', 'FALSE')
    setShow(false)
  }

  if (!show) return <></>

  return (
    <aside className="fixed bottom-4 right-4 z-50 flex items-center justify-center rounded-lg bg-black px-5 py-3 text-white">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm font-medium hover:opacity-75"
      >
        {text}
      </a>

      <button
        onClick={() => hidePopup()}
        className="ml-3 rounded bg-white/20 p-1 hover:bg-white/10"
        aria-label="Dismiss Popup"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </aside>
  )
}
