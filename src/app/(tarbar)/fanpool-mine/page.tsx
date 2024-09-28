import Profile from '@/components/fanpool-mine/Profile';
import ProfileTabMenu from '@/components/fanpool-mine/ProfileTabMenu';
import ProfileTapbar from '@/components/fanpool-mine/profileTapbar';

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
