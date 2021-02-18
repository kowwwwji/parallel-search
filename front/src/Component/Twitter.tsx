import React, {useState, useEffect} from 'react';
import Axios, {AxiosInstance, AxiosRequestConfig} from 'axios';

import './Result.css'

function Twitter(props: any){

  const [result, setResult] = useState<any>({});
  const [items, setItems] = useState<Array<number>>([]);

  useEffect(()=>{
    if(props.searchWord){
      let unmounted = false;
      (async()=>{
        const res = await getTwtter(props.searchWord);
        setResult(res);
        setItems(res.data);
      })()
      //クリーンアップ関数を返す
      return ()=>{ unmounted = true; };
    }
  },[props.searchWord, setResult])

  const listItems = items.map((item: any, index:number)=>{
    return <article key={index}>
      <a href={`https://twitter.com/${item.user.screen_name}`} target="_blank" rel="noopener noreferrer">
        <img src={item.user.profile_image_url} alt='thumbnail'></img>
        {item.user.name}
      </a>
      <a href={`https://twitter.com/${item.user.screen_name}/status/${item.id_str}`} target="_blank" rel="noopener noreferrer">
        <p>{item.text}</p>
        <p>{item.created_at}</p>
      </a>
    </article>
  });

  return <section className='result'>
    {listItems}
  </section>

}

const config: AxiosRequestConfig = {
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
};
const ai: AxiosInstance = Axios.create(config);
const getTwtter = async(query: string)=>{
  // return await ai.get('/api/v1/twitter/recent', {params: {query: query}})
  return await ai.get('/api/v1/twitter/popular', {params: {query: query}})
}

export default Twitter