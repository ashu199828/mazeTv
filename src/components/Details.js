import React from 'react'
import { useEffect, useState } from 'react';
const Details = (props) => {
  const [name, setName] = useState({name:'',mobileNo:''});
    const [visible, setVisible] = useState(false)
    const{id}= props
    const [datas, setDatas] = useState([])
    
    useEffect(() => {
      // storing input name
      localStorage.setItem("name", JSON.stringify(name));
    }, [name]);
    useEffect(() => {
        fetchUsers();
          // eslint-disable-next-line
    }, [id]);
  
    const fetchUsers = async () => {
        const res = await fetch(`https://api.tvmaze.com/shows/${props.id}`);
        const data = await res.json();
        try {
          setDatas(data);
        
          
        } catch (err) {
            console.log(err);
        }
    };
 
 
  return (
    <div>
  {visible && <div class='alert alert-success alert-dismissible fade show'role="alert">
  <strong>Horray!</strong> You movie ticket is confirmed.
  <button onClick={()=>setVisible(false)} type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>
}
<div className="card pb-3 pt-3 ps-4" style={{width: '100%'}}>
  <div className="row g-0">
    <div className="col-md-4">
      <img src={datas?.image?.medium} style={{width: '60%'}} className="img-fluid rounded-start" alt="..."/>
    </div>
    <div className="col-md-8">
      <div className="card-body">
        <h1 className="card-title">{datas?.name}</h1>
        <p id='sum' className="card-text">{datas?.summary}</p>
        <p className="card-text">Language: {datas?.language}</p>
        <p className="card-text">Premiered: {datas?.premiered}</p>
        <p className="card-text">Rating: {datas?.rating?.average}</p>
        <button data-bs-toggle="modal" data-bs-target="#exampleModal" className="btn bg-danger text-white">Book ticket</button>
        
      </div>
    </div>
  </div>
</div>

<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <form>
  <div className="mb-3">
      <h2>Movie Name: {datas?.name}</h2>
    <label htmlFor="exampleInputEmail1" className="form-label">Your Name</label>
    <input onChange={(e) => setName({...name,name:e.target.value})} type="email" className="form-control" id="personName" aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text"></div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Your Mobile no:-</label>
    <input onChange={(e) => setName({...name,mobileNo:e.target.value})} type="password" className="form-control" id="exampleInputPassword1"/>
  </div>
  <div className="mb-3 form-check">
    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
    <label className="form-check-label" htmlFor="exampleCheck1">Are you 18+</label>
  </div>
  <button onClick={(e)=>{e.preventDefault(); localStorage.setItem('user',{name}); setVisible(true)}} data-bs-dismiss="modal" type="submit" className="btn btn-danger text-white">Confirm Ticket</button>
</form>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        
      </div>
    </div>
  </div>
</div>




    </div>
  )
}

export default Details





