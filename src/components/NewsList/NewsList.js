import React, {useEffect, useCallback} from 'react';
import { useHttps } from '../../hook/useHttps';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from "../Spinner";
import Error from "../Error";
import NewsListItem from '../NewsListItem';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import "../style/newsList.css"
import { newsDeleted, fetchNews, filteredNewsSelected} from './news_slice';


function NewsList() {
  const filteredNews = useSelector(filteredNewsSelected)
  const filterLoadingStatus = useSelector(state => state.filterLoadingStatus);
  const dispatch = useDispatch();
  const {request} = useHttps();

  useEffect(() => {
    dispatch(fetchNews())
    //eslint-disable-next-line
  }, [])

  const onDelete = useCallback((id) => {
    request(`http://localhost:3001/news/${id}`, "DELETE")
      .then(data => console.log(data+" deleted"))
      .then(dispatch(newsDeleted(id)))
      .catch(() => dispatch("NEWS_FETCHING_ERROR"))
    //eslint-disable-next-line
  }, [])


  if(filterLoadingStatus === "loading"){
    return <Spinner/>
  }else if(filterLoadingStatus === "error"){
    return <Error/>
  }

  const renderNewsList = (arr) => {
    if(arr.length === 0) {
      return ( 
          <CSSTransition timeout={500} classNames="item">
              <h4 className='text-center mt-5'>News does not exists.</h4>
          </CSSTransition>        
      )

    }
    return arr.map(({id, ...props}) => {
      return(
        <CSSTransition key={id} timeout={500} classNames="item">
           <NewsListItem {...props} onDelete={() => onDelete(id)}/>
        </CSSTransition>
      )
    }).reverse()
  }

  const element = renderNewsList(filteredNews)
  return(
    <TransitionGroup component="ul">
      {element}
    </TransitionGroup>
  )
}

export default NewsList;