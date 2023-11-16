import Link from 'next/link'
import { DEFAULT_COVER } from '../../utils/const'
import { DateFormatter } from '../utilities/date-formatter'
import { resizeImage } from '@starter-kit/utils/image'

type Props = {
	title: string
	coverImage: string
	date: string
	excerpt: string
	slug: string
}

export const HeroPost = ({ title, coverImage, date, excerpt, slug }: Props) => {

	const postURL = `/${slug}`

	const coverImg = resizeImage(
		coverImage, 
		{ w: 150, h: 300, c: 'thumb', }, 
		DEFAULT_COVER
	)

	return (		
		<section className="grid gap-5">		
			<Link href={postURL} className="">
				<div
					className={`h-auto min-h-[200px] md:min-h-[400px] w-full border p-5 text-5xl bg-transparent dark:bg-white bg-no-repeat bg-contain bg-center dark:shadow-sm dark:shadow-gray-300`} 
					aria-hidden={true}
					style={{
						backgroundImage: `url(${coverImg})`
					}}
				>
					&nbsp;
				</div>
				<div className="p-5 lg:mb-5">
					<h2 className="mb-2 text-3xl md:text-5xl font-bold text-slate-800 dark:text-neutral-50 lg:text-3xl hover:text-primary-600 dark:hover:text-primary-500 hover:underline">{title}</h2>
					<div className="mb-1 text-sm font-semibold text-slate-500 dark:text-neutral-300">				
						<DateFormatter dateString={date} />				
					</div>
					<p className="text-md leading-snug text-slate-500 dark:text-neutral-400">{excerpt}</p>
				</div>
			</Link>
		</section>
	)
}
