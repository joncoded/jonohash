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
		{ w: 1024, h: 512, c: 'thumb', }, 
		DEFAULT_COVER
	)

	return (		
		<section className="grid gap-5">		
			<Link href={postURL} className="">
				<div
					className={`h-auto min-h-[200px] md:min-h-[400px] w-full border p-5 text-5xl bg-transparent dark:bg-white bg-no-repeat bg-cover bg-center dark:shadow-sm dark:shadow-gray-300`} 
					aria-hidden={true}
					style={{
						backgroundImage: `url(${coverImg})`
					}}
				>
					&nbsp;
				</div>
				<div className="px-0 py-5 md:p-5 lg:mb-5 text-center md:text-left">
					<h2 className="font-bold text-6xl text-primary-600 hover:text-black dark:hover:text-white hover:underline">{title}</h2>
					<div className="mb-3 text-sm font-semibold text-slate-500 dark:text-neutral-300">				
						<DateFormatter dateString={date} />				
					</div>
					<p className="text-md leading-snug text-slate-500 dark:text-neutral-400">{excerpt}</p>
				</div>
			</Link>
		</section>
	)
}
