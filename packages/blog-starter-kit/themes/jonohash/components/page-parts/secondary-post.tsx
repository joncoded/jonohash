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
		{ w: 400, h: 200, c: 'thumb', }, 
		DEFAULT_COVER
	)

	return (
		<Link href={postURL}>
			<section>

				<div className="flex flex-col md:flex-row gap-5 items-start">
					<div className="w-full md:w-[150px] lg:w-[200px]">
						<div
							className={`h-[200px] w-full md:h-[100px] md:w-[150px] lg:w-[200px] border p-5 text-5xl dark:bg-white bg-no-repeat bg-cover bg-center dark:shadow-sm dark:shadow-gray-300`} 							
							style={{
								backgroundImage: `url(${coverImg})`
							}}
							aria-hidden={true}
						>
							&nbsp;
						</div>
					</div>
					<div className="flex flex-col gap-2 text-center md:text-left">
						<h2 className="font-bold text-3xl text-primary-600 hover:text-black dark:hover:text-white hover:underline">						
							{title}
						</h2>
						<div className="text-sm font-semibold text-slate-500 dark:text-neutral-300">					
							<DateFormatter dateString={date} />					
						</div>				
						<p className="text-md leading-snug text-slate-500 dark:text-neutral-400">
							{excerpt.length > 150 ? excerpt.substring(0, 150) + '…' : excerpt}
						</p>			
					</div>
				</div>

			</section>
		</Link>
	)
}
