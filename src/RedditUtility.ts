import axios, {AxiosResponse} from 'axios';
import Word from './word';
import WordList from './WordList';


class RedditUtility {
  getWordListForThread(thread): Promise<Word[]> {
    let words: WordList = new WordList;
    return this.retrieveComments(thread)
          .then(res => words.generateWords(res));
  }

  getWordListForSubreddit(subreddit): Promise<Word[]> {
    let words: WordList = new WordList;
    let promises = [];
    return this.retrieveThreads(subreddit, 1)
      .then(threads => {
        threads.forEach(e => promises.push(
          this.retrieveComments(e)
          .then(res => {
            words.update_text(res)
          })
        ))
        return Promise.all(promises).then(() => {
          return words.generateWords(words.raw_text)
        })
      });
  }


  retrieveComments(thread: string): Promise<string[]> {
    let url: string = 'https://www.reddit.com' + thread + '.json';

    return axios
      .get(url)
      .then(res => this.generateWordList(res.data))
      .catch(error => [error]);
  }

  retrieveThreads(subreddit: string, days: number): Promise<string[]> {
    let url: string = this.subredditUrl(subreddit);

    return axios
      .get(url)
      .then(res => this.generatePermalinkList(res.data))
      .catch(error => [error]);
  }

  subredditUrl(subreddit): string {
    return "https://www.reddit.com/r/" 
      + subreddit + 
      '.json'
  }

  generatePermalinkList(response: AxiosResponse): string[] {
    let list: string[] = [];
    response.data.children.forEach(function(child) {
      list.push(child.data.permalink);
    });
    return list;
  }

  generateWordList(response: AxiosResponse): string[] {
    let comments = this.getCommentsFromJSON(response);
    return comments
      .replace(/\n/g, '')
      .split(' ');
  }

  getCommentsFromJSON(json: AxiosResponse): string {
    let text = this.getCommentsFromArray(json[1].data.children);
    return text;
  }

  //Recursively go through the object tree and compile all the comments
  getCommentsFromArray(arr: string[]): string {
    let text = '';
    let self = this;
    arr.forEach(function(item: any) {
      if (typeof item !== 'undefined') {
        text += item.data.body;

        if (typeof item.data.replies !== 'undefined' && item.data.replies !== '') {
          text += self.getCommentsFromArray(item.data.replies.data.children);
        }
      }
    });
    return text;
  }

}

export default new RedditUtility;
