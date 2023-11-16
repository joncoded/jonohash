import { resizeImage } from '@starter-kit/utils/image'
import Link from 'next/link'
import { User } from '../../generated/graphql'
import { DEFAULT_COVER } from '../../utils/const'
import { DateFormatter } from '../utilities/date-formatter'

type Author = Pick<User, 'name' | 'profilePicture'>

type Props = {
	title: string
	coverImage: string | null | undefined
	date: string
	excerpt: string
	author: Author
	slug: string
}

export const PostPreview = ({ title, coverImage, date, excerpt, slug }: Props) => {
	const postURL = `/${slug}`

	const coverImg = resizeImage(
		coverImage, 
		{ w: 100, h: 100, c: 'thumb', }, 
		DEFAULT_COVER
	)

	return (
		<section className="flex flex-row gap-10">
			<div>
				<div
					className={`rounded-full h-[100px] w-[100px] shadow-sm dark:shadow-gray-300 p-5 text-5xl bg-cover bg-center`} 
					aria-label="hidden"
					style={{
						backgroundImage: `url(${coverImg})`
					}}
				>
					&nbsp;
				</div>
			</div>
			<div className="flex flex-col gap-2">
				<h2 className="text-3xl font-bold leading-tight text-slate-800 dark:text-neutral-50">
					<Link
						href={postURL}
						className="hover:text-primary-600 dark:hover:text-primary-500 hover:underline"
					>
						{title}
					</Link>
				</h2>
				<div className="text-sm font-semibold text-slate-500 dark:text-neutral-300">					
					<DateFormatter dateString={date} />					
				</div>				
				<p className="text-md leading-snug text-slate-500 dark:text-neutral-400">
					{excerpt.length > 100 ? excerpt.substring(0, 100) + '…' : excerpt}
				</p>			
			</div>
		</section>
	)
}
