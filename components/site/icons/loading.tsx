import React from 'react'


export function Loading({ className }: { className?: string }) {

  return (
    <svg width="24" height="24" className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <circle className="animate-spinner-horizontal" cx="4" cy="12" r="3" />
      <circle className="
        animate-spinner-horizontal delay-250" cx="4" cy="12" r="3" />
      <circle className="
        animate-spinner-horizontal delay-500" cx="4" cy="12" r="3" />
      <circle className="
        animate-spinner-horizontal delay-750" cx="4" cy="12" r="3" />
    </svg>
  )
}
