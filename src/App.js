import React, {useState,useEffect} from "react";
import "./style.css";
import axios from 'axios'
import Loading from './Loading';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

const url = 'https://jsonplaceholder.typicode.com/posts'

export default function App() {
 const [item,setItem]=useState({title:"",body:""})
  const [loading,setLoading]=useState(true)
  const [posts,setPosts]=useState([])

  const getPosts=async()=>{
    setLoading(true)
    try{
      const response=await axios.get(url)
      const posts=response.data
      setLoading(false)
      //console.log(posts)
      setPosts(posts)
    }

    catch(error){
     console.log("error")
      setLoading(false)
    }
 
    }
     
    useEffect(()=>{

      getPosts()

      },[])

  if(loading){

  return <main>
  <Loading/>
  </main>
 
} 
const handleCreate=async()=>{
  await axios.post(url,
    {
      "title":item.title,
        "body":item.body
    }
    
  )
//  

if(item.title && item.body){
  const newPost={id:new Date().getTime().toString(),title:item.title,body:item.body}
  setPosts([...posts,newPost])
  item.title=""
  item.body=""
}


}


const handleChange=(e)=>{
  const name=e.target.name
  const value=e.target.value 
  setItem({...item,[name]:value})
  //console.log(item.title,item.body)
}
const handleSubmit=(e)=>{
e.preventDefault()
if(item.id){
  handleUpdate()
}else{
  handleCreate()
}


}


 const handleUpdate = async () => {
  let data={
    "title":item.title,
    "body":item.body
  }
  
  let response=await axios.put(
    `https://jsonplaceholder.typicode.com/posts/${item.id}`,data
   
  );


  var index = posts.findIndex(
    (user) => user.id === response.data.id
  );
   var user = [...posts];
   user[index] = response.data;
  setPosts({ user, title:"",body:""});
  getPosts();

};

const onPopulateData = (ind) => {
   let updatedPost=posts.filter((user) => user.id === ind)[0];
  setItem({
    id: updatedPost.ind,
    title: updatedPost.title,
    body: updatedPost.body,
    
  });
  //console.log(updatedPost)
  
};





const handleDelete = async (id) => {
  await axios.delete(
    `https://jsonplaceholder.typicode.com/posts/${item.id}`
   
  );
  setPosts(posts.filter((post)=>{
return post.id!==id
  }))


};
  return (
    <div>

<Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{backgroundColor:"#c59d5f"}}>
        <Toolbar variant="dense">
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2, color:"black" }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" component="div">
           KEEP POSTING!!!!
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>

<main className="main-form">
<form className="form" onSubmit={handleSubmit}>
  <label htmlFor="headingt">Title </label>
<input type="text" id="heading"
name="title"
value={item.title}
onChange={handleChange}

/>


<label htmlFor="bodytext"> Body </label>
<input type="text" id="bodytext"
name="body"
value={item.body}
onChange={handleChange}

/> &nbsp;
<button type="submit"> Submit </button> &nbsp; 
{/* <button type="submit" onClick={handleUpdate}> Save </button> */}
  </form>
  </main>

    <section className="section-center">

   {posts.map((post)=>{
const {id,title,body}=post
return (
<div className="post-item" key={id}>
<h2 className="title"> {title}</h2>
<p className="item-text"> {body}</p>
<div className="btn-container">
<button className="btn" onClick={()=>onPopulateData(id)}>Update</button>
<button className="btn" onClick={()=>handleDelete(id)}>Delete</button>
</div>

</div>
)
   })}
   
      </section>
      </div>
  );
}
