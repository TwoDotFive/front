'use client';

import NavBar from '@/components/common/navbar/NavBar';
import Profile from '@/components/profile/Profile';
import ProfileTabMenu from '@/components/profile/ProfileTabMenu';
import ProfileTapbar from '@/components/profile/ProfileTapBar';

export default function ProfilePage({ params }: { params?: { id?: string } }) {
	return (
		<section>
			<ProfileTapbar />
			<div className="px-20pxr">
				<Profile /> {/* profileId로 해당 프로필 정보 전달 */}
				<div className="h-30pxr" />
				<ProfileTabMenu />
			</div>
		</section>
	);
}
