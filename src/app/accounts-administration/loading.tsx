import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

export default function Loading() {
	// You can add any UI inside Loading, including a Skeleton.
	return (
		<SkeletonTheme baseColor="#202020" highlightColor="#444">
			<p>
				Holaaa
				<Skeleton count={3} />
			</p>
		</SkeletonTheme>
	);
}
