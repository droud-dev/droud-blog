import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

function RoundedImage(props: any) {
  return <Image alt={props.alt || ''} className="rounded-lg w-full" width="350" height="200" {...props} />
}

function NxtLink(props: any) {
  return <Link target="_blank" rel="nofollow noopener noreferrer" className="border-transparent hover:border-amber-500 box-border border-2 px-0.5 border-dotted rounded-md no-underline" {...props} />
}

export const components = {
  img: RoundedImage,
  a: NxtLink
}