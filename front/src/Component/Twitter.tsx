import React, {useState, useEffect} from 'react';
import Axios, {AxiosInstance, AxiosRequestConfig} from 'axios';

import TwitterClient from 'twitter';

function Twitter(props: any){

  const [result, setResult] = useState<any>({});
  const [items, setItems] = useState<Array<number>>([]);

  useEffect(()=>{
    if(props.searchWord){
      let unmounted = false;
      (async()=>{
        // const res = await getData(props.searchWord);
        const res = await getTwtter(props.searchWord);
        // setResult(res.data);
        // setItems(res.data.items)
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

const client = new TwitterClient({
  consumer_key: process.env.REACT_APP_TWITTER_API_KEY!,
  consumer_secret: process.env.REACT_APP_TWITTER_API_SECRET_KEY!,
  access_token_key: process.env.REACT_APP_TWITTER_ACCESS_TOKEN!,
  access_token_secret: process.env.REACT_APP_TWITTER_ACCESS_TOKEN_SECRET!,
})
const getData = async(query: string)=>{
  const param = {
    q: query,
    lang: 'ja',
    locale: 'ja',
    result_type: 'mixed'
  }
  return await client.get("search/tweets", param, (error: any, res: any, req: any) => {
    if (error) {
      console.log(error)
    }
    return res
  })
}

const config: AxiosRequestConfig = {
  baseURL: 'https://api.twitter.com/1.1/',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${process.env.REACT_APP_TWITTER_BEARLER_TOKEN}`,
  },
};
const inst: AxiosInstance = Axios.create(config);
const getTwtter = async(query: string)=>{
  return await Axios.get('/api/v1/')
  // return inst.get('search/tweets.json', {
  //   params: {
  //     q: query,
  //     lang: 'ja',
  //     locale: 'ja',
  //     result_type: 'mixed'
  //   }
  // });
}

export default Twitter