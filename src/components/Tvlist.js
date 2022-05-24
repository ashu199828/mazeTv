import React from 'react'
import { useEffect, useState } from 'react';
import Details from './Details';
const Tvlist = () => {



  const [datas, setDatas] = useState([])
  const [selectedMovie, setselctedMovie] = useState()
 
  useEffect(() => {
    fetchUsers();
}, []);

const fetchUsers = async () => {
    const res = await fetch("https://api.tvmaze.com/search/shows?q=all");
    const data = await res.json();
    try {
      setDatas(data);
      
    } catch (err) {
        console.log(err);
    }
};


function summary(id){
  setselctedMovie(id)
  document.documentElement.scrollTop = 0; 
}

  return (
    <div id='tv'>
     {selectedMovie && <Details id={selectedMovie}/>}
      <div className="row">
        
          
      {datas.map(x=> { 
       let id = x.show.id
      return <div key={id} className="col-md-4 d-flex justify-content-center pt-4 ps-4">
        <div id={id} className="card" style={{width:'18rem'}}>
       
          <img src={x?.show?.image?.medium} className="card-img-top" alt="..."/>
         <div className="card-body">
           <h5 className="card-title">{x?.show?.name}</h5>
         </div>
         <ul className="list-group list-group-flush">
           <li className="list-group-item">Language: {x?.show?.language} </li>
           <li className="list-group-item">Genres: {x?.show?.genres[0]} </li>
           <li className="list-group-item">Premiered: {x?.show?.premiered} </li>
           <button onClick={()=>summary(id)} className='btn-primary text-start'>More Details</button>
         </ul>
          </div>
          </div>
      })}
      
      </div>
     
    </div>
    
  )
}

export default Tvlist