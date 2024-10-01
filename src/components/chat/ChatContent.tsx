import { IconPhotoAdd, IconSend } from '@/public/icons';
import { Text } from '../common/Text';
import { TagFanPool } from '../common/tag/TagFanPool';

export default function ChatContent() {
	return (
		<section className="relative w-full h-full flex flex-col">
			<section className="py-16pxr px-20pxr flex flex-col gap-4pxr">
				<div className="flex gap-4pxr">
					<Text fontSize={12} fontWeight={700} color="gray700">
						키움히어로즈 VS KIA타이거즈
					</Text>
					<Text fontSize={12} fontWeight={400} color="gray700">
						07.14(금) 18:00, 잠실
					</Text>
				</div>
				<div className="flex gap-4pxr items-center">
					<TagFanPool type={'CAR_SHARE'} />
					<TagFanPool type={'여자만'} />
					<Text fontSize={12} fontWeight={400} color="gray700">
						이대역 출발, 2명 모집
					</Text>
				</div>
			</section>
			<div className="h-16pxr" />
			<div className="overflow-y-scroll">
				<section className="py-8pxr px-35pxr bg-gray050">
					<Text fontSize={12} fontWeight={400} color="gray500">
						팬풀은 서로가 신뢰할 수 있는 커뮤니티를 만들어가고 있어요. 개인 정보
						요구, 외부 채팅방으로 유도하는 경우 주의해 주세요.
					</Text>
				</section>
				<div className="h-24pxr" />
				<section className="w-full flex flex-col">
					<div className="w-full flex justify-center">
						<div className="py-5pxr px-12pxr rounded-20pxr bg-gray050 w-fit">
							<Text fontSize={12} fontWeight={500} color="gray700">
								2024년 7월 8일 월요일
							</Text>
						</div>
					</div>
					<div className="h-24pxr" />
					<div className="flex flex-col gap-12pxr px-20pxr w-full">
						{/* 오른쪽 배치 메시지 */}
						<div className="flex justify-end">
							<div className="px-12pxr max-w-192pxr py-8pxr bg-[#E9F1FF] rounded-b-8pxr rounded-tl-8pxr rounded-tr-1pxr">
								<Text fontSize={14} fontWeight={500} color="gray700">
									안녕하세요! 혹시 이 분 여행기 참고해보는 건 어떨까요?
								</Text>
							</div>
						</div>
						{/* 오른쪽 배치 메시지 */}
						<div className="flex justify-end items-end gap-8pxr">
							<Text fontSize={12} fontWeight={400} color="gray500">
								오후 5:12
							</Text>
							<div
								className="flex gap-10pxr max-w-253pxr rounded-b-8pxr rounded-tl-8pxr rounded-tr-1pxr p-12pxr  bg-white"
								style={{ boxShadow: '2px 2px 20px 0px rgba(47, 47, 48, 0.10)' }}
							>
								<img
									src="/images/kia.png"
									className="w-52pxr h-52pxr rounded-4pxr"
								/>
								<div className="flex-grow truncate flex flex-col gap-2pxr">
									<Text fontSize={12} fontWeight={700} color="gray500">
										키움불꽃
										<Text
											fontSize={12}
											fontWeight={500}
											color="gray500"
											className="inline-block"
										>
											님의 팬풀코스
										</Text>
									</Text>
									<Text
										fontSize={14}
										fontWeight={700}
										color="gray800"
										className="truncate"
									>
										비오는날 경기 대신
										서울나들이닒너ㅣㄹ널런러ㅣㅇ;ㄹ니ㅓㅏ;ㄴ러ㅣㄹ너ㅏㅣ;
									</Text>
									<Text fontSize={12} fontWeight={700} color="activeLylac500">
										잠실 근처 4곳
									</Text>
								</div>
							</div>
						</div>
						{/* 왼쪽 배치 메시지 */}
						<div className="flex justify-start items-end gap-8pxr">
							<div className="px-12pxr max-w-192pxr py-8pxr bg-activeLylac100 rounded-b-8pxr rounded-tl-1pxr rounded-tr-8pxr">
								<Text fontSize={14} fontWeight={500} color="gray700">
									저는 좋아요~!!
								</Text>
							</div>
							<Text fontSize={12} fontWeight={400} color="gray500">
								오후 5:13
							</Text>
						</div>
					</div>
				</section>
				<section className="absolute flex items-center gap-8pxr w-full h-60pxr bg-gray050 bottom-0 px-20pxr">
					<IconPhotoAdd />
					<input className="flex-grow px-10pxr h-38pxr rounded-30pxr border-1pxr border-gray100" />
					<IconSend />
				</section>
			</div>
		</section>
	);
}
