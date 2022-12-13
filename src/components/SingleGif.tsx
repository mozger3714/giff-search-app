import React from 'react';
import { IGiphy } from '../models';

interface GiphyProps {
    giphy: IGiphy
}

const SingleGif = ({ giphy }:GiphyProps ) => {
    return ( 
        <div className="max-w-sm w-full lg:max-w-full lg:flex mx-auto my-2 py-1 c-giphy">            
            <img src={giphy.images.downsized.url} alt={giphy.title} className="mx-auto" />   
            <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                <div className="mb-8">      
                    <h2 className="text-gray-900 font-bold text-xl mb-2">{giphy.title}</h2>
                    <p className="text-gray-700 text-base">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.</p>
                    <p className="text-gray-600 pt-2">GIF's URL: <a href={giphy.url} className="underline text-gray-500">{giphy.url}</a></p>
                    <p className="text-gray-600 pt-2">GIF's ID: {giphy.id}</p>
                </div>
                <div className="flex items-center">
                <img className="w-10 h-10 rounded-full mr-4" src={giphy.username !== '' ? giphy.user?.avatar_url : 'https://via.placeholder.com/30'} alt={giphy.username !== '' ? giphy.user?.username : 'Author'}/>
                    <div className="text-sm">
                        <p className='text-gray-400'>Author</p>
                        <p className="text-gray-900 leading-none">{giphy.username !== '' ? giphy.user?.username : 'uknown'}</p>                        
                    </div>
                </div>
            </div>
        </div>
     );
}

export default SingleGif;