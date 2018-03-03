import axios, {AxiosResponse} from 'axios';
import Word from '../src/word';

class RedditUtility {
  getWordListFor(thread): Promise<Word[]> {
    return this.retreiveComments(thread)
          .then(res => this.compressArray(res));
  }

  retreiveComments(thread: string): Promise<any> {
    let url: string = 'https://www.reddit.com' + thread + '.json';

    return axios
      .get(url)
      .then(res => this.generateWordList(res.data))
      .catch(error => console.log(error));
  }

  retreiveThreads(subreddit: string, days: number): Promise<any> {
    let url: string = this.subredditUrl(subreddit);

    return axios
      .get(url)
      .then(res => this.generatePermalinkList(res.data))
      .catch(error => console.log(error));
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

  compressArray(original: string[]): Word[] {
    let compressed = [];
    // make a copy of the input array
    let copy: string[] = original.slice(0);
  
    // first loop goes over every element
    for (let i = 0; i < original.length; i++) {
  
      let myCount = 0;

      // loop over every element in the copy and see if it's the same
      for (let w = 0; w < copy.length; w++) {
        if (original[i] == copy[w]) {
          // increase amount of times duplicate is found
          myCount++;
          // sets item to undefined
          delete copy[w];
        }
      }
      if (myCount > 0) {
        let word = new Word();
        word.value = original[i];
        word.count = myCount;
        compressed.push(word);
      }
    }
    return compressed
      .sort((a, b) => {
        return b.count - a.count
      })
  }
}

export default new RedditUtility;
