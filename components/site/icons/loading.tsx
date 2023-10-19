import React from 'react'

import './loading.css' 


export function Loading({className}: {className:string}) {
  return (
    <svg width="24" height="24" className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <circle className="spinner_nOfF" cx="4" cy="12" r="3" />
      <circle className="spinner_nOfF spinner_fVhf" cx="4" cy="12" r="3" />
      <circle className="spinner_nOfF spinner_piVe" cx="4" cy="12" r="3" />
      <circle className="spinner_nOfF spinner_MSNs" cx="4" cy="12" r="3" />
    </svg>
  )
}
