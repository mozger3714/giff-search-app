import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { IGiphy } from '../models'

interface IUseGiphies{
	loading: boolean;
    error: boolean;
    giphies: IGiphy[];
    hasMore: boolean;
    amountFound: number;
}

export default function useGifSearch(query: string, pageNumber: number):IUseGiphies {
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(false)
	const [giphies, setGiphies] = useState<IGiphy[]>([])
	const [hasMore, setHasMore] = useState(false)
	const [amountFound, setAmountFound] = useState(0)

	const API_URL = 'https://api.giphy.com/v1/gifs/search?api_key=z3TCxWMXI3poet0DNQBeC8RfYrprX7U1'

	useEffect(()=> {
		setGiphies([])
	}, [query])

	useEffect(()=> {
		setLoading(true)
		setError(false)
		let cancel:any
		axios({
			method:'GET',
			url: `${API_URL}&limit=5&rating=G&lang=en`,
			params: {q: query, offset: pageNumber},
			cancelToken: new axios.CancelToken(c => cancel = c )
		}).then(res => {
			setGiphies(prevGiphies => [...prevGiphies, ...res.data.data])
			setHasMore(res.data.data.length > 0)
			const amountFound = res.data.pagination.total_count;    
      		setAmountFound(amountFound);
			setLoading(false)			
		}).catch(e => {
			if(axios.isCancel(e)) return
			setError(true)
		})
		return () => cancel()
	}, [query, pageNumber])


  return {loading, error, giphies, hasMore, amountFound}
}


