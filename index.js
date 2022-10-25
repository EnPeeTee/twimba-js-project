import { tweetsData } from "./data.js";
import { v4 as uuidv4 } from "https://jspm.dev/uuid";

document.addEventListener('click', e => {
    if (e.target.dataset.like) {
        handleLikeCLick(e.target.dataset.like)
    }
    else if (e.target.dataset.retweet) {
        handleRetweetClick(e.target.dataset.retweet)
    }
    else if (e.target.dataset.reply) {
        handleReplyClick(e.target.dataset.reply)
    }
    else if (e.target.id === `tweet-btn`) {
        handleTweetBtnClick()
    }
})

function handleLikeCLick(tweetId) {
    const objTargetTweet = tweetsData.filter( tweet => {
        return tweet.uuid === tweetId
    })[0]
    
    if (objTargetTweet.isLiked){
        objTargetTweet.likes--
    }
    else{
        objTargetTweet.likes++ 
    }
    objTargetTweet.isLiked = !objTargetTweet.isLiked
    render()
}

function handleRetweetClick(tweetId) {
    const objTargetTweet = tweetsData.filter( tweet =>
        tweet.uuid === tweetId)[0]
        if (objTargetTweet.isRetweeted) {
            objTargetTweet.retweets--
        }
        else {
        objTargetTweet.retweets++
    }
    objTargetTweet.isRetweeted = !objTargetTweet.isRetweeted
    render()
}


function handleReplyClick(replyId) {
    document.getElementById(`replies-${replyId}`).classList.toggle('hidden')
}

function handleTweetBtnClick() {
    const inputTweet = document.getElementById(`tweet-input`)
    const objUserTweet = { 
        handle: `@scrimba`,
        profilePic: `images/scrimbalogo.png`,
        likes: 0,
        retweets: 0,
        tweetText: inputTweet.value,
        replies: [],
        isLiked: false,
        isRetweeted: false,
        uuid: uuidv4()
    }
    inputTweet.value = ``
    if (objUserTweet.tweetText) {
    tweetsData.unshift(objUserTweet)
    render()
    }
}

function htmlGetFeed(){
    let htmlFeed = ``
    
    tweetsData.forEach(tweet => {
        
        let classIconLike = ''
        let classIconRetweet = ''
        let htmlReplies = ''
        
        if (tweet.isLiked){
            classIconLike = 'liked'
        }
        if (tweet.isRetweeted){
            classIconRetweet = 'retweeted'
        }
        if(tweet.replies.length > 0){
            tweet.replies.forEach( reply => {
                htmlReplies+=`
                <div class="tweet-reply">
                    <div class="tweet-inner">
                        <img src="${reply.profilePic}" class="profile-pic">
                            <div>
                                <p class="handle">${reply.handle}</p>
                                <p class="tweet-text">${reply.tweetText}</p>
                            </div>
                        </div>
                </div>`
            })
        }
        
        htmlFeed += `
        <div class="tweet">
            <div class="tweet-inner">
                <img src="${tweet.profilePic}" class="profile-pic">
                <div>
                    <p class="handle">${tweet.handle}</p>
                    <p class="tweet-text">${tweet.tweetText}</p>
                    <div class="tweet-details">
                        <span class="tweet-detail">
                            <i class="fa-regular fa-comment-dots"
                            data-reply="${tweet.uuid}"
                            ></i>
                            ${tweet.replies.length}
                        </span>
                        <span class="tweet-detail">
                            <i class="fa-solid fa-heart ${classIconLike}"
                            data-like="${tweet.uuid}"
                            ></i>
                            ${tweet.likes}
                        </span>
                        <span class="tweet-detail">
                            <i class="fa-solid fa-retweet ${classIconRetweet}"
                            data-retweet="${tweet.uuid}"
                            ></i>
                            ${tweet.retweets}
                        </span>
                    </div>   
                </div>            
            </div>
            <div class="hidden" id="replies-${tweet.uuid}">
                ${htmlReplies}
            </div>   
        </div>
        `
   })
   return htmlFeed 
}

function render(){
    document.getElementById('feed').innerHTML = htmlGetFeed()
}

render()