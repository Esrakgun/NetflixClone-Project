import React, { useEffect, useState } from 'react'
import { RiArrowLeftSLine } from 'react-icons/ri';
import { Link, useParams } from 'react-router-dom';
import Banner from './Banner';
import api from '../../utils';
import Error from "../../components/Error";
import Loader from "../../components/Loader";
import Content from "./Content";
import ActorList from "./ActorList";
import VideoList from "./VideoList";
import AddButton from "../../components/AddButton";


const Detail = () => {
  // Url'deki parametreye eriş:
  const {id} =useParams();
  

  // State Alanı:
  const [movie,setMovie]=useState(null);
  const [error,setError]=useState(null);
  
  console.log(id);

  useEffect(()=>{
    const params={
      append_to_response:"videos,credits",language:"tr",
    };

    api
    .get(`/movie/${id}`,params)
    .then((res)=>{setMovie(res.data);})
    .catch((err)=>setError(err.message));
  },[]);
  
  return (
    <>
      {error 
      ? (<Error />) 
      : !movie 
      ? (<Loader />)
      : ( <div>
          {/* Top */}
          <div className="flex justify-between mb-5">
            <Link
              to={".."}
              className="flex gap-2 items-center py-2 px-4 bg-gray-600 rounded hover:bg-gray-500 transition"
            >
              <RiArrowLeftSLine className="text-xl" />

              <span>Geri</span>
            </Link>

            <AddButton movie={movie} />
          </div>

          {/* Banner */}

          <Banner movie={movie} />

          {/* Content */}

          <Content movie={movie} />

          {/* Actor List */}

          <ActorList id={id} />

          {/* Video List */}
          <VideoList id={id} />
        </div>
      )}
    </>
  );
};

export default Detail;