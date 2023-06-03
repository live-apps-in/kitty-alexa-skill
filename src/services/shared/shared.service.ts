import axios from 'axios';
import { injectable } from 'inversify';

interface axiosConfig {
  method: string;
  route: string;
  body?: any;
}

@injectable()
export class SharedService {
	private readonly KITTY_BOT_API = 'https://kittychan.live';
	
  /////Global Axios Config
  async axiosInstance(payload: axiosConfig): Promise<void> {
    const { method, route } = payload;

    const headers = {
      Authorization: `Bot ${process.env.KITTY_CHAN_TOKEN}`,
    };
    const data = {
      ...payload.body,
    };

    const axiosConfig = {
      method,
      url: `${this.KITTY_BOT_API}/${route}`,
      data,
      headers,
	};
	  
    await axios(axiosConfig)
      // .then(res=> console.log(res))
      .catch((err) => {
        console.log(err.message);
      });
  }
}
