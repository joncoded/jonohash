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
		{ w: 200, h: 125, c: 'thumb', }, 
		DEFAULT_COVER
	)

	return (
		<Link href={postURL}>
			<section>

				<div className="flex gap-5 items-center">
					<div>
						<div
							className={`h-[125px] w-[200px] border p-5 text-5xl dark:bg-white bg-no-repeat bg-contain bg-center dark:shadow-sm dark:shadow-gray-300`} 							
							style={{
								backgroundImage: `url(${coverImg})`
							}}
							aria-hidden={true}
						>
							&nbsp;
						</div>
					</div>
					<div className="flex flex-col gap-2">
						<h2 className="text-3xl font-bold leading-tight text-slate-800 dark:text-neutral-50 hover:text-primary-600 dark:hover:text-primary-500 hover:underline">						
							{title}
						</h2>
						<div className="text-sm font-semibold text-slate-500 dark:text-neutral-300">					
							<DateFormatter dateString={date} />					
						</div>				
						<p className="text-md leading-snug text-slate-500 dark:text-neutral-400">
							{excerpt.length > 100 ? excerpt.substring(0, 100) + '…' : excerpt}
						</p>			
					</div>
				</div>

			</section>
		</Link>
	)
}
