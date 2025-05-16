import React from 'react'
import Image from 'next/image'

function RoundedImage(props: any) {
  return <Image alt={props.alt || ''} className="rounded-lg w-full" width="350" height="200" {...props} />
}

function HorizontalRules(props: any) {
  console.dir(props);
  return <hr className="bg-green-500 text-red-500" />;
}

export const components = {
  img: RoundedImage,
  hr: HorizontalRules,
}