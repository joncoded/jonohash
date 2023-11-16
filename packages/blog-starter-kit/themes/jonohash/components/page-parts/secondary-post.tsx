import { resizeImage } from '@starter-kit/utils/image'
import Link from 'next/link'
import { DEFAULT_COVER } from '../../utils/const'
import { DateFormatter } from '../utilities/date-formatter'

type Props = {
	title: string
	coverImage: string
	date: string
	excerpt: string
	slug: string
}

export const SecondaryPost = ({ title, coverImage, date, excerpt, slug }: Props) => {
	const postURL = `/${slug}`

	const coverImg = resizeImage(
		coverImage, 
		{ w: 150, h: 300, c: 'thumb', }, 
		DEFAULT_COVER
	)

	return (
		<section className="flex gap-5">
			<div>
				<div
					className={`h-[100px] w-[200px] md:h-[150px] md:w-[300px] border p-5 text-5xl dark:bg-white bg-no-repeat bg-contain bg-center dark:shadow-sm dark:shadow-gray-300`} 
					aria-label="hidden"
					style={{
						backgroundImage: `url(${coverImg})`
					}}
				>
					&nbsp;
				</div>
			</div>
			<div className="flex flex-col gap-2">
				<h2 className="text-3xl font-semibold leading-tight text-slate-800 dark:text-neutral-50">
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
