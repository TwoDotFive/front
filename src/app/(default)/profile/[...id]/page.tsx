'use client';

import NavBar from '@/components/common/navbar/NavBar';
import Profile from '@/components/profile/Profile';
import ProfileTabMenu from '@/components/profile/ProfileTabMenu';
import ProfileTapbar from '@/components/profile/ProfileTapBar';

export default function ProfilePage({ params }: { params?: { id?: string } }) {
	return (
		<section>
			<ProfileTapbar id={params?.id![0]} />
			<div className="px-20pxr">
				<Profile id={params?.id![0]} />
				<div className="h-30pxr" />
				<ProfileTabMenu id={params?.id![0]} />
			</div>
		</section>
	);
}
