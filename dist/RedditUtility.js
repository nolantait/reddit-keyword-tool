"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const word_1 = require("./word");
class RedditUtility {
    getWordListForThread(thread) {
        return this.retreiveComments(thread)
            .then(res => this.combineDuplicateWords(res));
    }
    getWordListForSubreddit(subreddit) {
        let words = [];
        return this.retreiveThreads(subreddit, 1)
            .then(threads => {
            threads.forEach(thread => {
                this.retreiveComments(thread)
                    .then(res => words.concat(res));
            });
            return this.combineDuplicateWords(words);
        });
    }
    retreiveComments(thread) {
        let url = 'https://www.reddit.com' + thread + '.json';
        return axios_1.default
            .get(url)
            .then(res => this.generateWordList(res.data))
            .catch(error => [error]);
    }
    retreiveThreads(subreddit, days) {
        let url = this.subredditUrl(subreddit);
        return axios_1.default
            .get(url)
            .then(res => this.generatePermalinkList(res.data))
            .catch(error => [error]);
    }
    subredditUrl(subreddit) {
        return "https://www.reddit.com/r/"
            + subreddit +
            '.json';
    }
    generatePermalinkList(response) {
        let list = [];
        response.data.children.forEach(function (child) {
            list.push(child.data.permalink);
        });
        return list;
    }
    generateWordList(response) {
        let comments = this.getCommentsFromJSON(response);
        return comments
            .replace(/\n/g, '')
            .split(' ');
    }
    getCommentsFromJSON(json) {
        let text = this.getCommentsFromArray(json[1].data.children);
        return text;
    }
    //Recursively go through the object tree and compile all the comments
    getCommentsFromArray(arr) {
        let text = '';
        let self = this;
        arr.forEach(function (item) {
            if (typeof item !== 'undefined') {
                text += item.data.body;
                if (typeof item.data.replies !== 'undefined' && item.data.replies !== '') {
                    text += self.getCommentsFromArray(item.data.replies.data.children);
                }
            }
        });
        return text;
    }
    combineDuplicateWords(original) {
        let compressed = [];
        //Make a copy of the input array
        let copy = original.slice(0);
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
                let word = new word_1.default();
                word.value = original[i];
                word.count = myCount;
                compressed.push(word);
            }
        }
        return compressed
            .sort((a, b) => {
            return b.count - a.count;
        });
    }
}
exports.default = new RedditUtility;
