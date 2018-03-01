import axios, {AxiosResponse} from 'axios';

class RedditUtility {
  retreivePosts(subreddit: string, days: number): Promise<any> {
    let url = this.getPostsUrl(subreddit);

    return axios
      .get(url)
      .then(res => this.generateIdList(res.data))
      .catch(error => console.log(error));
  }

  getPostsUrl(subreddit): string {
    return "https://www.reddit.com/r/" 
      + subreddit + 
      '.json'
  }

  generateIdList(response: AxiosResponse): string[] {
    let list: string[] = [];
    response.data.children.forEach(function(child) {
      list.push(child.data.id);
    });
    return list;
  }
}

export default new RedditUtility;
