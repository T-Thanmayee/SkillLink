import {useState,useEffect} from 'react';
import { axiosWithToken } from '../../axiosWithToken';
import {useNavigate,Outlet} from 'react-router-dom'
import { useForm } from "react-hook-form";

function Articles() {
  let { register, handleSubmit } = useForm();
  const [articlesList, setArticlesList] = useState([]);
  let navigate=useNavigate()
  let [search,setSearch]=useState({})

  const getArticlesOfCurrentAuthor=async()=>{
    let res=await axiosWithToken.get(`http://localhost:4000/user-api/articles`)
    console.log(res)
    setArticlesList(res.data.payload)
  }


  const readArticleByArticleId=(articleObj)=>{
    navigate(`../article/${articleObj.articleId}`,{state:articleObj})
  }


    useEffect(()=>{
      getArticlesOfCurrentAuthor()
    },[])
     let getOccupation=async(e)=>{
     
       const res=await axiosWithToken.get(`http://localhost:4000/user-api/article/${e.occupation}`)
       console.log("hii u called me",res)
       setSearch(res.payload)
      
     }



  return (
    <div>
       <div className="dropdown" onClick={(e)=>console.log(e.target.value)}>
  <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    Dropdown button
  </button>
  <ul className="dropdown-menu">
    <li><a className="dropdown-item" href="#" >Cleaning</a></li>
    <li><a className="dropdown-item" href="#">Landscaping</a></li>
  </ul>
</div> 
 <div>
  <form onSubmit={handleSubmit(getOccupation)} className='w-25'>
  <input type="text"  id='occupation' className="form-control" {...register("occupation")}/>
  <button type='submit'>Search</button>
  </form>
</div> *
   {search!=null ? <div>  hii</div>: <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4 mt-5">
      {articlesList.map((article) => (
        <div className="col" key={article.articleId}>
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">{article.title}</h5>
              <p className="card-text">
                {article.content.substring(0, 80) + "...."}
              </p>
              <button className="custom-btn btn-4" onClick={()=>readArticleByArticleId(article)}>
                <span>Read More</span>
              </button>
            </div>
            <div className="card-footer">
              <small className="text-body-secondary">
                Last updated on {article.dateOfModification}
              </small>
            </div>
          </div>
        </div>
      ))}
    </div>}
   
    <Outlet />
  </div>
  )
}

export default Articles