'use client';
import Button from '@/components/common/Button';
import SelectAreaButton from '@/components/common/button/SelectAreaButton'
import TapBar from '@/components/common/TapBar'
import { Text } from '@/components/common/Text'
import { regions } from '@/constants/regions';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

export default function page() {
  const router = useRouter();

  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  const handleTeamSelect = (area: string) => {
    setSelectedRegion(area);
    setIsSelected(true);
  };

  const handleNextPage = () => {
    router.push('/fanpool-log/create-log/step2');
  }

  return (
    <motion.div      
      initial={{ x: '100%', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: '-100%', opacity: 0 }}
      transition={{ duration: 0.5 }} 
      className='absolute flex flex-col items-start h-screen w-full'
      >
      {/* 탭바 */}
      <TapBar text='팬풀로그 만들기' type='mid' isNextButton={true}/>
      <div className='mt-24pxr'/>
      <div className='ml-20pxr'>
        <Text fontSize={18} fontWeight={700} color='gray700'>어느 경기장으로 직관 가시나요?</Text>
      </div>
      {/* 지역 선택 */}
      <div className='absolute w-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-20pxr'>
        <div className='grid grid-cols-3 gap-10pxr'>
          {regions.map((region) => (
            <SelectAreaButton 
              key={region.code}
              code={region.code}
              isSelected={selectedRegion === region.area}
              onClick={() => {handleTeamSelect(region.area)}}
            />
          ))}
        </div>
      </div>

      {/* 바텀 시트 */}
      <div className={'fixed flex items-center justify-center inset-x-0 bottom-0 w-full bg-white rounded-t-20pxr p-20pxr pt-16pxr'}
				style={{ zIndex: 1000, overflowY: 'unset' }}>
          <Button
            width="320px"
            height="50px"
            text={'완료'}
            borderRadius={8}
            enabledTextColor={'text-white'}
            enabledBackgroundColor={'bg-primary'}
            disabledTextColor={'text-[#5679A3]'}
            disabledBackgroundColor={'bg-primary'}
            onClick={handleNextPage}
            disabled={!isSelected}
          />
      </div>
    </motion.div>
  )
}
