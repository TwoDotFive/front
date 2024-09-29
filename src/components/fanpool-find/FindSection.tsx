'use client';
import React, { useState } from 'react';
import FindFilter from './FindFilter';
import FindResult from './FindResult';
import { FanpoolInformation } from '@/types/types';

export default function FindSection() {
	const [fanpoolData, setFanpoolData] = useState<FanpoolInformation[]>([]);
	return (
		<section className="px-20pxr">
			<FindFilter setFanpoolData={setFanpoolData} />
			<div className="h-16pxr" />
			<FindResult fanpoolDatas={fanpoolData} />
		</section>
	);
}
