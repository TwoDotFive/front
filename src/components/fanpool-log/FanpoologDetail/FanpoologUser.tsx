import { Text } from '@/components/common/Text'
import { IconRightArrow } from '@/public/icons'
import React from 'react'

export default function FanpoologUser() {
  return (
    <div className='w-full h-45 flex items-center justify-start gap-8pxr p-20pxr pb-0'>
        <div className="w-40pxr h-40pxr rounded-24pxr">
            <img className='w-full h-full' src='/images/kt.png'/>
        </div>
        <div className='flex justify-center flex-col'>
            <Text fontSize={16} fontWeight={600} color='gray700'>네임드호빵</Text>
            <Text fontSize={12} fontWeight={400} color='gray700'>3개의 팬풀 / 4개의 여행기</Text>
        </div>
        <button className='flex items-center jusitify-center p-8pxr ml-auto'>
                <IconRightArrow />
        </button>
    </div>
  )
}
