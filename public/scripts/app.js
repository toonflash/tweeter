/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(function() {

  function createTweetElement(tweet) {
    var timestamp = moment(tweet.created_at).endOf('day').fromNow();;
    const $tweet = $("<article>");
    const $tweetHeader = $(`<header><div class='avatar'><img src= ${tweet.user.avatars.small} /></div><h2>${tweet.user.name}</h2><a>${tweet.user.handle}</a></header>`);
    const $tweetBody = $(`<main><p>${tweet.content.text}</p></main>`);
    const $tweetFooter = $(`<footer><span>${timestamp}</span><div class='social'><a class='flag'></a><a class='retweet'></a><a class='like'></a></div></footer>`);

    return $tweet.append($tweetHeader).append($tweetBody).append($tweetFooter);
  }

  function renderTweets(tweets) {
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
    $('#tweets-wrapper').empty();
    for (var index in tweets) {
      let newTweet = tweets[index];
      $("#main-wrapper textarea").val('');
      createTweetElement(newTweet).prependTo("#tweets-wrapper");
    }
  }

  function loadTweets(data) {
    $.ajax({
      url: '/tweets',
      method: 'GET',
      data: data,
      dataType: "json",
      success: function(result){
        renderTweets(result);
      },
      error: function(err){
      }
    });
  }

  $('#tweetform').on('submit', (e) => {
    e.preventDefault();
    let data = $('#tweetform').serialize();

    // validation here BEFORE posting
    if($('#tweettext').val()===""){
      alert("You are empty");
      return;
    }
    if($('#tweettext').val().length >= 141){
      alert("You are too full");
      return;
    }

    // we are go!
    $.ajax({
      url: '/tweets',
      method: 'POST',
      data: data,
      dataType: "json",
      success: function(result){
      loadTweets(data);
    },
      error: function(err){
      }
    });
  });

});