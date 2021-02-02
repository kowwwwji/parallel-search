import React, {useState} from 'react';
import Axios, {AxiosInstance, AxiosRequestConfig} from 'axios';

const config: AxiosRequestConfig = {
  baseURL: 'https://www.googleapis.com',
  headers: { 'Content-Type': 'application/json' },
};
const inst: AxiosInstance = Axios.create(config);
const getdata = async(query: string)=>{
  return inst.get('/customsearch/v1', {
    params: {
      key: process.env.REACT_APP_GOOGLE_API_KEY,
      cx: process.env.REACT_APP_GOOGLE_SERCH_ENGINE_ID,
      q: query
    }
  });
}

function Google(){
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('結果')

  return (
    <div className="Google">
      <textarea className='query' value={query} onChange={(e)=>setQuery(e.target.value)}></textarea>
      <button onClick={() => searchGoogle()}>Search</button>
      <textarea value={response}></textarea>
    </div>
  );

  async function searchGoogle(){
    const res = await getdata(query);
    setResponse(JSON.stringify(res.data));
    console.log(res);
  }
}


export default Google;