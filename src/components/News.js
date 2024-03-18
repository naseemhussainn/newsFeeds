import React, { useState } from 'react'
import NewsItem from './NewsItem'
import { Routes,Route } from 'react-router-dom';
import EveryNews from './EveryNews';

function News() {
  const [search,setSerach] = useState('');
  const handleSearch = () => {
    setSerach(document.getElementById('searchWord').value);
  };
  return (
    <div className='container'>
      <div className='row my-3 mb-3'>
      <div className='text-center'>
        <h1 >News Feeds</h1>
        <hr></hr>
      </div>
      </div>
      <Routes>
        <Route exact path='/' element={<NewsItem Mainquery={'top-headlines'} search={'general'}/>}/>
        <Route exact path='/business' element={<NewsItem Mainquery={'top-headlines'} search={'business'}/>}/>
        <Route exact path='/entertainments' element={<NewsItem Mainquery={'top-headlines'} search={'entertainment'}/>}/>
        <Route exact path='/health' element={<NewsItem Mainquery={'top-headlines'} search={'health'}/>}/>
        <Route exact path='/science' element={<NewsItem Mainquery={'top-headlines'} search={'science'}/>}/>
        <Route exact path='/sports' element={<NewsItem Mainquery={'top-headlines'} search={'sports'}/>}/>
        <Route exact path='/technology' element={<NewsItem Mainquery={'top-headlines'} search={'technology'}/>}/>
      </Routes>   
    </div>
  )
}

export default News
