import Profile from '@/components/profile/Profile';
import ProfileTabMenu from '@/components/profile/ProfileTabMenu';
import ProfileTapbar from '@/components/profile/ProfileTapBar';

export default function page() {
	return (
		<section>
			<ProfileTapbar />
			<div className="px-20pxr">
				<Profile />
				<div className="h-30pxr" />
				<ProfileTabMenu />
			</div>
		</section>
	);
}
