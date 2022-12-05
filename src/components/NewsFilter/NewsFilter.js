import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../Spinner";
import { activeFilterChanged, fetchFilterNews } from "./filters_slice";
import Error from "../Error";
import classNames from "classnames";

function NewsFilter() {
  const {filters, filterLoadingStatus, activeFilter} = useSelector(state =>  state.filter);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFilterNews())
    //eslint-disable-next-line
  }, [])

  if(filterLoadingStatus === "loading"){
    return <Spinner/>
  }
  else if(filterLoadingStatus === "error"){
    return <Error/>
  }

  const renderFilters = (arr) => {
    if(arr.length === 0) {
      return <h4 className="text-center mt-5">Filters is not found.</h4>
    }
    return arr.map(({name, className ,label}) => {
     
      const btnClasses = classNames("btn", className, {
        "active": name === activeFilter
      })
      return(
        <button 
          key={name} 
          id={name} 
          className={btnClasses} 
          onClick={() => dispatch(activeFilterChanged(name))}>
            {label}
          </button>
      ) 
    })
    
  }

  const elements = renderFilters(filters)

  return (
    <div className='card shadow-lg mt-4'>
      <div className='card-body'>
        <p className='card-text'>Filter by category</p>
        <div className='btn-group'>
          {elements}
        </div>
      </div>
    </div>
  )
}

export default NewsFilter