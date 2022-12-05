import { useState } from "react";
import { useDispatch, useSelector} from "react-redux";
import { useHttps } from "../hook/useHttps";
import {newsCreated} from "./NewsList/news_slice";
import { v4 } from "uuid";

function NewsAddForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const {filters, filterLoadingStatus} = useSelector(state => state.filter);
  const {request} = useHttps();
  const dispatch = useDispatch()

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const news = {id:v4(), name, description, category}
    request(" http://localhost:3001/news", "POST", JSON.stringify(news))
      .then(res =>  console.log(res))
      .then(dispatch(newsCreated(news)))
      .catch(err => console.log(err))

    setName("")
    setDescription("")
    setCategory("")
  }

  const renderFilters = (filters, status) => {
    if(status === "loading"){
      return <option>Loading Options</option>
    }else if(status === "error"){
      return <option>Error options</option>
    }

    if(filters && filters.length > 0) {
      return filters.map(({name, label}) => {
        // eslint-disable-next-line
        if(name === "all") return;
        return <option key={name} value={name}>{label}</option>
      })
    }
  }

  return (
    <form className='border p-4 shadow-lg rounded' onSubmit={onSubmitHandler}>
      <div className='mb-3'>
        <label htmlFor="name" className='form-label fs-4'>Name for new News</label>
        <input 
          type="text" 
          required name='name' 
          className='form-control' 
          id='name' 
          placeholder='What is name of News?'
          value={name}
          onChange={(e) =>  setName(e.target.value)}
        />
      </div>
      <div className='mb-3'>
        <label htmlFor="text" className='form-label fs-4'>Description</label>
        <textarea 
          type="text" 
          required name='text' 
          className='form-control' 
          id='text' 
          placeholder='What is your news about?' 
          style={{"height":"120px"}}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className='mb-3'>
        <label htmlFor="category" className='form-label'>Choose category of news</label>
        <select 
        required className='form-select' 
        id='category' name='category'
        value={category}
        onChange = {(e) => setCategory(e.target.value)}
        >
          <option>Category of News...</option>
          {renderFilters(filters, filterLoadingStatus)}
        </select>
      </div>
      <button type='submit' className='btn btn-dark w-100 shadow-lg text-light'>Create News</button>
    </form>
  )
}

export default NewsAddForm;