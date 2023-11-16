import { PostFragment } from '../../generated/graphql'
import { PostPreview } from '../post-parts/post-preview'

type Props = {
	posts: PostFragment[]
	context: 'home' | 'series' | 'tag'
}

export const MorePosts = ({ posts }: Props) => {
	return (
		<section className="my-10 flex flex-col items-start gap-10">			
			<div className="grid items-start gap-10 md:grid-cols-2 xl:grid-cols-3">
				{posts.map((post) => (
					<PostPreview
						key={post.slug}
						title={post.title}
						coverImage={post.coverImage?.url}
						date={post.publishedAt}
						author={{
							name: post.author.name,
							profilePicture: post.author.profilePicture,
						}}
						slug={post.slug}
						excerpt={post.brief}
					/>
				))}
			</div>
		</section>
	)
}