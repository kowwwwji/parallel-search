import React, {useState, useEffect} from 'react';
import Axios, {AxiosInstance, AxiosRequestConfig} from 'axios';

// import './Google.css'

function Google(props: any){
  const [result, setResult] = useState('result');

  useEffect(()=>{
    if(props.searchWord){
      let unmounted = false;
      (async()=>{
        const res = await getdata(props.searchWord);
        setResult(JSON.stringify(res.data));
      })()
      //クリーンアップ関数を返す
      return ()=>{ unmounted = true; };
    }
  },[props.searchWord, setResult])


  return <div>
    <p>{props.searchWord}</p>
    <textarea value={result} onChange={(e)=>setResult(e.target.value)}></textarea>
  </div>

}

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

export default Google