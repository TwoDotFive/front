'use client';

import InfinityLine from '@/components/common/InfinityLine';
import TagLocation from '@/components/common/tag/TagLocation';
import TapBar from '@/components/common/TapBar';
import { Text } from '@/components/common/Text';
import RecentFanpoolLog from '@/components/fanpool-log/RecentFanpoolLog';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react'

interface Menu{
    name: string;
    price: number;
    main: boolean;
}


export default function TeamTravelogDetailPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const isOpen = true;

    const id = searchParams.get('id');
    
    const menus: {[key: number]: Menu} = {
        1: {"name": "김치찌개", "price": 7000, 'main': true},
        2: {"name": "된장찌개", "price": 7000, 'main': true},
        3: {"name": "비빔밥", "price": 7000, 'main': false},
        4: {"name": "떡볶이", "price": 7000, 'main': false},
        5: {"name": "떡볶이", "price": 7000, 'main': false},
        6: {"name": "떡볶이", "price": 7000, 'main': false},
    }

    const [visibleCnt, setVisibleCnt] = useState<number>(4);

    const handleShowMoreButton = () => {
        setVisibleCnt(Object.keys(menus).length);
    }

    const isRestaurant = true;

    // 식당인지 지역 명소인지에 따라 내용 상이
  return (
    <div>
        <TapBar text="새마을 전통시장" type="mid" isNextButton={true} />
        <Image src="/images/fanpool-log_ex.png" width={375} height={211} className="w-full h-full object-cover" alt={"장소"}/>
        <section className='w-full'>
            {/* 오버레이 */}
			<div
				className={`absolute inset-0 w-full transition-opacity duration-300 ${
					isOpen ? 'opacity-50' : 'opacity-0 pointer-events-none'
				}`}
			/>

			{/* 바텀 시트 */}
			<div
				className={`absolute inset-x-0 bottom-0 w-full bg-white rounded-t-20pxr pt-24pxr px-20pxr transition-transform transform duration-300 ${
					isOpen ? 'translate-y-0' : 'translate-y-full'
				}`}
				style={{ zIndex: 1000, maxHeight: 'calc(100vh - 300px)', overflowY: 'auto' }}
			>
				<div className="flex flex-col pb-20pxr">
                    {/* 장소 정보 태그 */}
                    <div className='flex flex-col items-start self-stretch gap-16pxr'>
                        {isRestaurant ? <TagLocation name="음식점" /> : <TagLocation name="지역명소" />}
                        {/* 장소 기본 내용 (이름, 주소) */}
                        <div className='flex flex-col items-start gap-4pxr'>
                            <Text fontSize={20} fontWeight={700} color='gray700'>새마을 전통시장</Text>
                            <Text fontSize={14} fontWeight={400} color='gray600'>서울 송파구 석촌호수로 12길 24</Text>
                            <Text fontSize={14} fontWeight={400} color='gray600' >02-234-5678</Text>
                        </div>
                        {/* 영업시간 */}
                        <div className='flex flex-col items-start gap-4pxr'>
                            <Text fontSize={16} fontWeight={700}>영업시간</Text>
                            <Text fontSize={14} fontWeight={400} color='gray600'>월, 수, 금 08:00 ~ 19:00</Text>
                        </div>
                        {/* 휴무 */}
                        <div className='flex flex-col items-start gap-4pxr'>
                            <Text fontSize={16} fontWeight={700}>휴무</Text>
                            <Text fontSize={14} fontWeight={400} color='gray600'>공휴일, 화, 목</Text>
                        </div>
                        {/* 명소인 경우, 입장료와 주차시설 추가 */}
                        {!isRestaurant && (
                        <>
                            <div className='flex flex-col items-start gap-4pxr'>
                                <Text fontSize={16} fontWeight={700}>입장료</Text>
                                <Text fontSize={14} fontWeight={400} color='gray600'>8,000원</Text>
                            </div>
                            <div className='flex flex-col items-start gap-4pxr'>
                                <Text fontSize={16} fontWeight={700}>주차시설</Text>
                                <Text fontSize={14} fontWeight={400} color='gray600'>유료</Text>
                            </div>
                        </>
                        )}
                    </div>
                    <div className='mt-40pxr'/>
                    {/* 메뉴(식당) or 없음*/}
                    {isRestaurant && 
                        <div className='flex flex-col items-start gap-8pxr self-stretch'>
                        <Text fontSize={16} fontWeight={700} color='gray800'>메뉴</Text>
                        {Object.keys(menus).slice(0, visibleCnt).map((key) => (
                            <div key={key} className='flex items-center justify-between w-full'>
                                <div className="flex items-center gap-4pxr">
                                    <Text fontSize={14} fontWeight={500} color='gray700'>{menus[Number(key)].name}</Text>
                                    {menus[Number(key)].main && <TagLocation name="대표메뉴" />}
                                </div>
                            <Text fontSize={14} fontWeight={500} color='gray700'>{menus[Number(key)].price}원</Text>
                            </div>
                        ))}
                        {visibleCnt < Object.keys(menus).length && (
                        <div className='mx-auto'>   
                            <button onClick={handleShowMoreButton} className='text-gray-500 mt-4'>
                                <Text fontSize={14} fontWeight={500} color='gray300'>더보기</Text>
                            </button>
                        </div>
                        )}
                    </div>
                    }
                    <InfinityLine color='bg-gray-50' thickness='h-3pxr' marginTop='mt-20pxr' marginBottom='mb-32pxr' />
                        {/* 방문 여행 일정 (추후 변경 필요) */}
                    <RecentFanpoolLog hasButton={false}/>
				</div>
			</div>
        </section>
    </div>
  )
}
