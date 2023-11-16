import { resizeImage } from '@starter-kit/utils/image'
import request from 'graphql-request'
import Link from 'next/link'
import { KeyboardEventHandler, useEffect, useRef, useState } from 'react'
import {
	SearchPostsOfPublicationDocument,
	SearchPostsOfPublicationQuery,
	SearchPostsOfPublicationQueryVariables,
} from '../../generated/graphql'
import { DEFAULT_COVER } from '../../utils/const'
import { useAppContext } from '../utilities/contexts/appContext'

const GQL_ENDPOINT = process.env.NEXT_PUBLIC_HASHNODE_GQL_ENDPOINT
const NO_OF_SEARCH_RESULTS = 20

type Post = SearchPostsOfPublicationQuery['searchPostsOfPublication']['edges'][0]['node']

export const Search = () => {
	const { publication } = useAppContext()

	const searchInputRef = useRef<HTMLInputElement>(null)
	const timerRef = useRef<NodeJS.Timeout | null>(null)

	const [query, setQuery] = useState('')
	const [searchResults, setSearchResults] = useState<Post[]>([])
	const [isSearching, setIsSearching] = useState(false)

	const resetInput = () => {
		if (!searchInputRef.current) return
		searchInputRef.current.value = ''
		setQuery('')
	}

	const escapeSearchOnESC: KeyboardEventHandler<HTMLInputElement> = (e) => {
		if (e.key === 'Escape') {
			resetInput()
		}
	}

	const updateSearchQuery = () => {
		setQuery(searchInputRef.current?.value || '')
	}

	useEffect(() => {
		
		if (timerRef.current) clearTimeout(timerRef.current)

		if (!query) {
			setSearchResults([])
			setIsSearching(false)
			return
		}

		timerRef.current = setTimeout(async () => {
			setIsSearching(true)

			const data = await request<
				SearchPostsOfPublicationQuery,
				SearchPostsOfPublicationQueryVariables
			>(GQL_ENDPOINT, SearchPostsOfPublicationDocument, {
				first: NO_OF_SEARCH_RESULTS,
				filter: { query, publicationId: publication.id },
			})
			const posts = data.searchPostsOfPublication.edges.map((edge) => edge.node)
			setSearchResults(posts)
			setIsSearching(false)
		}, 500)		

	}, [publication.id, query])

	const searchResultsList = searchResults.map((post) => {
		
		const postURL = `/${post.slug}`
		
		const searchImg = resizeImage(
			post.coverImage?.url, 
			{ w: 50, h: 50, c: 'thumb', }, 
			DEFAULT_COVER
		)

		console.log(post)
		
		return (
			<Link
				key={post.id}
				href={postURL}
				className="flex flex-row items-center gap-5 p-5 hover:bg-zinc-100 dark:hover:bg-slate-700"
			>
				<div
					className={`rounded-full h-[50px] w-[50px] shadow-sm shadow-gray-300 p-5 text-5xl bg-cover bg-center`} 
					aria-label="hidden"
					style={{
						backgroundImage: `url(${searchImg})`
					}}
				>
					&nbsp;
				</div>
				<div className="flex flex-col gap-1">
					<strong className="text-base">{post.title}</strong>
					<span className="text-slate-600 dark:text-neutral-300">
						{post.brief.length > 140 ? post.brief.substring(0, 140) + '…' : post.brief}
					</span>
				</div>
				
			</Link>
		)

	})

	return (

		<div className="search-bar overflow-y-scroll">

			{/* the search bar itself */}
			<input
				type="text"
				ref={searchInputRef}
				onKeyUp={escapeSearchOnESC}
				onChange={updateSearchQuery}
				placeholder="🔎 search"
				className="w-full px-6 py-2 dark:bg-zinc-200 text-black"
			/>
			
			{query && (
				<>
					
					{/* the search results loading state */}
					{isSearching && (
						<div className="top-100 absolute max-h-80 right-0 z-10 mt-1 flex w-full md:w-1/2 flex-col items-stretch overflow-y-scroll rounded-lg border dark:border-2 dark:border-gray-400 bg-white dark:bg-gray-900 p-1 shadow-2xl">
							<div className="flex animate-pulse flex-col gap-1 p-4">
								<div className="h-8 w-full rounded-lg bg-slate-100 dark:bg-neutral-800"></div>
								<div className="h-4 w-full rounded-lg bg-slate-100 dark:bg-neutral-800"></div>
								<div className="h-4 w-2/3 rounded-lg bg-slate-100 dark:bg-neutral-800"></div>
							</div>
							<div className="flex animate-pulse flex-col gap-1 p-4">
								<div className="h-8 w-full rounded-lg bg-slate-100 dark:bg-neutral-800"></div>
								<div className="h-4 w-full rounded-lg bg-slate-100 dark:bg-neutral-800"></div>
								<div className="h-4 w-2/3 rounded-lg bg-slate-100 dark:bg-neutral-800"></div>
							</div>
							<div className="flex animate-pulse flex-col gap-1 p-4">
								<div className="h-8 w-full rounded-lg bg-slate-100 dark:bg-neutral-800"></div>
								<div className="h-4 w-full rounded-lg bg-slate-100 dark:bg-neutral-800"></div>
								<div className="h-4 w-2/3 rounded-lg bg-slate-100 dark:bg-neutral-800"></div>
							</div>
						</div>
					)}

					{/* the search results we see */}
					{searchResults.length > 0 && !isSearching && (
						<div className="top-100 absolute max-h-80 right-5 z-10 mt-1 flex w-3/4 md:w-1/2 flex-col items-stretch rounded-lg border dark:border-2 dark:border-gray-400 bg-white dark:bg-gray-900 p-1 shadow-2xl overflow-auto">
							<h3 className="px-4 py-2 font-medium text-slate-500 dark:text-neutral-400">
								{searchResults.length} {(searchResults.length >= 2 || searchResults.length === 0) ? "results" : "result"}
							</h3>
							<hr className="dark:border-neutral-800" />
							{searchResultsList}
						</div>
					)}

				</>
			)}

		</div>
	)
}
