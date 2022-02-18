import { SVGProps } from 'react'

const Close = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg width="16px" height="16px" viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="m14.999 12 8.379-8.379a2.121 2.121 0 1 0-3-3L11.999 9 3.62.621a2.121 2.121 0 0 0-3 3L8.999 12 .62 20.379a2.121 2.121 0 0 0 3 3L11.999 15l8.379 8.379a2.121 2.121 0 0 0 3-3Z"
      />
    </svg>
  )
}

export default Close
