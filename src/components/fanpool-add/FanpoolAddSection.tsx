'use client';
import { useState } from 'react';
import FanpoolAddForm from './FanpoolAddForm';
import FanpoolAddInit from './FanpoolAddInit';

export function FanpoolAddSection() {
	const [step, setStep] = useState(1);

	// 다음 단계로 이동하는 함수
	const handleNextStep = () => {
		setStep(step + 1);
	};

	return (
		<div>
			{step === 1 && (
				<div>
					<FanpoolAddInit handleNextStep={handleNextStep} />
				</div>
			)}

			{/* step이 2일 때 FanpoolAddForm을 보여줌 */}
			{step === 2 && (
				<div>
					<FanpoolAddForm />
				</div>
			)}
		</div>
	);
}
