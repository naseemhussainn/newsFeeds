import React from 'react'
import { useState, useEffect } from "react";
import newsImage from '../files/noNews.jpg';
import apiKey from '../files/Apikey';
import Loader from './Loader';
function NewsItem(props) {
    const[news,setNews] = useState([]);
    const[page,setPage] = useState(1);
    const[pageCount,setPageCount] = useState(1);
    const[loader,SetLoader] = useState(true);
    const fetchNews = async() =>{
            try{
                SetLoader(true);
                const response = await fetch(`https://newsapi.org/v2/${props.Mainquery}?apiKey=${apiKey}&country=in${props.search ? `&category=${props.search}`: ''}&page=${page}`);
                const result = response.json();
                result.then((res)=>{
                    setNews(res.articles);
                    setPageCount(Math.ceil(res.totalResults/10));
                    SetLoader(false);
                })
            }catch(err){
                SetLoader(false);
                console.log(err);
            }
    }
    useEffect(() => {
        fetchNews();
    },[props.search,page]);
    useEffect(() => {
        console.log(news);
    },[]);
    useEffect(() => {
        console.log(page);
        console.log(pageCount);
    },[page]);

  return (
    <>
        
        {      
            !loader ? (news.length !== 0 ? news.reduce((rows, key, index) => (index % 3 === 0 ? rows.push([key]) : rows[rows.length - 1].push(key)) && rows, [])
            .map((row, rowIndex) => (
                <div key={rowIndex} className='row'>
                    {row.map((e, index) => (
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
                    ))}
                </div>
            )) : <div className='container' style={{display:'grid',placeItems:'center'}}><h1>No news to show</h1></div> ): <Loader/>
        }
        <div className='d-flex justify-content-between my-3 mb-3'>
           <button disabled={page <= 1} type="button" className="btn btn-dark" onClick={()=>{setPage(prevState => prevState - 1)}}> &laquo; Prev</button>
           <button disabled={page === pageCount} type="button" className="btn btn-dark" onClick={()=>{setPage(prevState => prevState + 1)}}>Next &raquo;</button>  
        </div>

    </>

    )   
}
export default NewsItem