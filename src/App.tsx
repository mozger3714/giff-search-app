import React, { useRef, useState, useCallback } from 'react';

import useGifSearch from './hooks/useGifSearch';
import SingleGif from './components/SingleGif';
import { Skeleton } from './components/Skeleton';

import SearchIcon from './search.svg';
import './App.scss';

function App() {
  const [query, setQuery] = useState('')
  const [pageNumber, setPageNumber] = useState(0)

  function handleGifSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value)
    setPageNumber(0)
  }

  const {
    loading, 
    error,
    giphies, 
    amountFound,
    hasMore   
  } = useGifSearch(query, pageNumber)
  
  const intObserver = useRef<IntersectionObserver| null >(null);
  const lastGifElementRef = useCallback((node: HTMLElement | HTMLDivElement | null) => {    
    if(loading) return;
    if(intObserver.current) intObserver.current.disconnect();
    intObserver.current = new IntersectionObserver(entries => {
      if(entries[0].isIntersecting && hasMore){
       setPageNumber(prev => prev + 5)
      }
    })
    if (node) intObserver.current.observe(node);
  }, [loading, hasMore])

  return (
    <div className="App">
      <div className="container mx-auto">
        <div className="c-search">
            <input 
                type='text'
                value={query}
                placeholder='Search for giphy image...'
                onChange={handleGifSearch}/>
            <img
                src={SearchIcon}
                alt="search"
            />
        </div>
        <div className='mx-1'>
          {amountFound > 0 && (<p className="text-lg pb-2">So far we found {amountFound} GIFs for '{query}'</p>)}
          {giphies.map((giphy, index) => {
            if (giphies.length === index + 1) {
              
              return (<div key={giphy.id} ref={lastGifElementRef}><SingleGif giphy={giphy} /></div> )
            } else {
              return <SingleGif key={giphy.id} giphy={giphy} /> 
            }
            })
            }
            {loading && (
            <div className="skeleton-list">
              <Skeleton />
              <Skeleton />
            </div>
            )}
        </div>
        {error && <div className="error">Error fetching data...</div>}
      </div>
    </div>
  );
}

export default App;
