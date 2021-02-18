import TwitterService from '../../services/twitter.service';
import { Request, Response } from 'express';
import qs from 'qs'

export class Controller {
  search(req: Request, res: Response): void {
    const result_type= req.params.result_type;
    // const q = qs.stringify(req.query.query);
    const q = req.query.query as string;

    TwitterService.searchTweets(q, 10, result_type).then((r) => res.json(r));
  }

}
export default new Controller();
