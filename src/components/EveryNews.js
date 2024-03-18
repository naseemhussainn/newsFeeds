import React from 'react'
import { useState, useEffect } from "react";
import newsImage from '../files/noNews.jpg';
import apiKey from '../files/Apikey';
function EveryNews(props) {
    const[news,setNews] = useState([]);
    const[page,setPage] = useState(1);
    const[pageCount,setPageCount] = useState(1);
    const fetchNews = async() =>{
            try{
                const response = await  fetch(`https://newsapi.org/v2/everything?apiKey=96e87a4d72f847c595290d5757a9f1dc${props.search ? `&q=${props.search}`: '&q=software'}&page=${page}&pageSize=20`);
                const result = response.json();
                result.then((res)=>{
                    setNews(res.articles);
                    setPageCount(Math.ceil(res.totalResults/20));
                    console.log(res);
                })
            }catch(err){
                setNews(err);
            }
    }
    useEffect(() => {
    fetchNews();
    },[props.search,page]);
    useEffect(() => {
        console.log(news);
    },[fetchNews]);

    return (
        <>

            {      

                news.length !== 0 ? news.reduce((rows, key, index) => (index % 3 === 0 ? rows.push([key]) : rows[rows.length - 1].push(key)) && rows, [])
                    .map((row, rowIndex) => (
                        <div key={rowIndex} className='row'>
                            {row.map((e, index) => (
                                <div key={index} className='col-sm-4 my-2'>
                                    <div className="card" style={{width: '18rem'}}>
                                        { e.urlToImage ? <img src={e.urlToImage} width={'287px'} height={'160px'}  className="card-img-top" alt=""/>: <img src={newsImage} width={'287px'} height={'160px'} className="card-img-top" alt=""/>}
                                        
                                        <div className="card-body">
                                            <h5 className="card-title">{e.title}</h5>
                                            <p className="card-text">{e.description}</p>
                                            <a href={e.url} target='_blank' className="btn btn-dark">Read More</a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )) : <div className='container' style={{display:'grid',placeItems:'center'}}><h1>No news to show</h1></div>
                
            }
            <div className='d-flex justify-content-between my-3 mb-3'>   
                <button disabled={page <= 1} type="button" className="btn btn-dark" onClick={()=>{setPage(prevState => prevState - 1)}}> &laquo; Prev</button>
                <button disabled={page === pageCount} type="button" className="btn btn-dark" onClick={()=>{setPage(prevState => prevState + 1)}}>Next &raquo;</button>  
            </div>
        </>

    )   
}

export default EveryNews
