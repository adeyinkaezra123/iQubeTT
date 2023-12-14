import localFont from 'next/font/local'
import { Inter } from 'next/font/google'

// Font files can be colocated inside of `app`
export const ProductFont = localFont({
  src: '/ProductSans-Regular.ttf',
  display: 'swap',
  style: 'oblique',
  fallback: ["Inter"],
  variable: '--font-power-grotesk',
})