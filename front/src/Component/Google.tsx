import React, {useState, useEffect} from 'react';
import Axios, {AxiosInstance, AxiosRequestConfig} from 'axios';

import './Result.css'

function Google(props: any){

  const [result, setResult] = useState<any>({});
  const [items, setItems] = useState<Array<number>>([]);

  useEffect(()=>{
    if(props.searchWord){
      let unmounted = false;
      (async()=>{
        const res = await getData(props.searchWord);
        setResult(res.data);
        setItems(res.data.items)
      })()
      //クリーンアップ関数を返す
      return ()=>{ unmounted = true; };
    }
  },[props.searchWord, setResult])

  const listItems = items.map((item: any, index:number)=>{
    return <article key={index}>
      {item.pagemap.cse_thumbnail &&
        <img src={item.pagemap.cse_thumbnail[0].src} alt='thumbnail'></img>
      }
      <a href={item.link} target="_blank" rel="noopener noreferrer">{item.title}</a>
      <pre>{item.snippet}</pre>
    </article>
  });

  return <section className='result'>
    <p>{result.searchInformation?.formattedTotalResults}件ヒットしました。</p>
    {listItems}
  </section>

}

const config: AxiosRequestConfig = {
  baseURL: 'https://www.googleapis.com',
  headers: { 'Content-Type': 'application/json' },
};
const inst: AxiosInstance = Axios.create(config);
const getData = async(query: string)=>{
  return inst.get('/customsearch/v1', {
    params: {
      key: process.env.REACT_APP_GOOGLE_API_KEY,
      cx: process.env.REACT_APP_GOOGLE_SERCH_ENGINE_ID,
      q: query
    }
  });
}

export default Google