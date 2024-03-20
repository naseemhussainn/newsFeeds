import React from 'react'
import { useState, useEffect } from "react";
import newsImage from '../files/noNews.jpg';
import Loader from './Loader';
import InfiniteScroll from "react-infinite-scroll-component";
import { useLocation } from 'react-router-dom';

function NewsItem(props) {
    const[news,setNews] = useState([]);
    const[page,setPage] = useState(1);
    const[pageCount,setPageCount] = useState(0);
    const[loader,SetLoader] = useState(true);
    const location = useLocation();
    const fetchMoreData = () => {
        setPage(prevState => prevState + 1);
    };
    const fetchNews = async() =>{
            try{
                props.progress(10)
                const response = await fetch(`https://newsapi.org/v2/${props.Mainquery}?apiKey=${props.Apikey}&pageSize=10&country=in${props.search ? `&category=${props.search}`: ''}&page=${page}`);
                props.progress(30)
                const result = response.json();
                props.progress(50)
                result.then((res)=>{
                    if (page === 1) {
                        setNews(res.articles);
                    } else {
                        setNews(prevNews => [...prevNews, ...res.articles]);
                    }
                    props.progress(70)
                    setPageCount(Math.ceil(res.totalResults/10));
                    SetLoader(false);
                    props.progress(100)
                })
            }catch(err){
                SetLoader(false);
            }
    }
    useEffect(() => {
        fetchNews();
    },[props.search,page]);
    useEffect(()=>{
        setNews([])
        setPage(1)
    },[location.pathname])
    useEffect(() => {
        console.log(news);
        console.log(page);
    },[props.search,page]);

  return (
    <>
        <InfiniteScroll
            dataLength={news.length}
            next={fetchMoreData}
            hasMore={page !== pageCount}
            loader={<Loader/>}
        >
        <div className='row'>
        {      
                news.map((e, index) => (
                        <div key={index} className='col-sm-4 my-3'>
                            <div className="card" style={{width: '18rem'}}>
                            <span className="badge position-absolute top-0 start-100 translate-middle p-2 text-bg-info">{e.source.name ? e.source.name : 'no source'}</span>
                                { e.urlToImage ? <img src={e.urlToImage} width={'287px'} height={'160px'} className="card-img-top" alt=""/>: <img src={newsImage} width={'287px'} height={'160px'} className="card-img-top" alt=""/>}
                                
                                <div className="card-body">
                                    <h5 className="card-title">{e.title}</h5>
                                    <p className="card-text">{(e.description) ? (e.description).slice(0, 82) + '...' : ''}</p>
                                    <p className="card-text">by: {e.author ? e.author : 'no author'}, at: {(e.publishedAt)}</p>
                                    <a href={e.url} className="btn btn-dark">Read More</a>
                                </div>
                            </div>
                        </div>
                    ))
        } 
        </div>
        </InfiniteScroll>

    </>

    )   
}
export default NewsItem