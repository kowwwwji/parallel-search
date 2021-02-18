import L from '../../common/logger';
var Twit = require('promised-twit')

var T = new Twit({
  consumer_key:         process.env.TWITTER_API_KEY,
  consumer_secret:      process.env.TWITTER_API_SECRET_KEY,
  access_token:         process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret:  process.env.TWITTER_ACCESS_TOKEN_SECRET,
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
  strictSSL:            true,     // optional - requires SSL certificates to be valid.
})


export class TwitterService {
  async searchTweets(q: string, count: number, result_type: string): Promise<any> {

    return await T.getSearchTweets({ q, count, result_type }).
    then((data: any) =>{
      return Promise.resolve(data.statuses);
    }).catch((err: any) =>{
      return Promise.resolve(err);
    })
  }
}

export default new TwitterService();
