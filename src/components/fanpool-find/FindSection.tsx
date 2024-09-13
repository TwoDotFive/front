import React from 'react';
import FindFilter from './FindFilter';
import FindResult from './FindResult';

export default function FindSection() {
	return (
		<section className="px-20pxr">
			<FindFilter />
			<div className="h-16pxr" />
			<FindResult />
		</section>
	);
}
