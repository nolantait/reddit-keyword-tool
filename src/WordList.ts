import Word from './word';

class WordList {
  public raw_text: string[];
  public words: Word[];

  constructor(raw_text = []) {
    this.raw_text = raw_text;
  }

  public update_text(text: string[]) {
    this.raw_text = this.raw_text.concat(text);
    return this.raw_text;
  }

  public generateWords(text: string[] = this.raw_text) {
    this.words = this.combineDuplicateWords(text);
    return this.words
  }

  private combineDuplicateWords(original: string[]): Word[] {
    let compressed = [];
    //Make a copy of the input array
    let copy: string[] = original.slice(0);
  
    //First loop goes over every element
    for (let i = 0; i < original.length; i++) {
  
      let myCount = 0;

      //Loop over every element in the copy and see if it's the same
      for (let w = 0; w < copy.length; w++) {
        if (original[i] == copy[w]) {
          //Increase amount of times duplicate is found
          myCount++;
          //Sets item to undefined
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

export default WordList;
