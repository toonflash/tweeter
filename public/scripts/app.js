/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(function() {

  // Preventing XSS with Escaping function
  function escape(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  function createTweetElement(tweet) {
    let timestamp = moment(tweet.created_at).fromNow();
    const $tweet = $("<article>");
    const $tweetHeader = $(`<header><div class='avatar'><img src= ${escape(tweet.user.avatars.small)} /></div><h2>${escape(tweet.user.name)}</h2><a>${escape(tweet.user.handle)}</a></header>`);
    const $tweetBody = $(`<main><p>${escape(tweet.content.text)}</p></main>`);
    const $tweetFooter = $(`<footer><span>${timestamp}</span><div class='social'><a class='flag'></a><a class='retweet'></a><a class='like'></a></div></footer>`);

    return $tweet.append($tweetHeader).append($tweetBody).append($tweetFooter);
  }

  function renderTweets(tweets) {
    $("#tweets-wrapper").empty();
    // loop through tweets
    // call createTweetElement for each tweet
    // take return value and prepend it to the tweet container
    for (let index in tweets) {
      let newTweet = tweets[index];
      $("#main-wrapper textarea").val('');
      createTweetElement(newTweet).prependTo("#tweets-wrapper");
    }
  }

  function loadTweets() {
    $.ajax({
      url: "/tweets",
      method: "GET",
      dataType: "json",
      success: function(result){
        renderTweets(result);
      },
      error: function(err){
        alert("loadTweets failed");
      }
    });
  }

  $("#tweetform").on("submit", (e) => {
    e.preventDefault();
    let data = $("#tweetform").serialize();

    // validation here BEFORE posting
    if($("#tweettext").val() === ""){
      $(".error").slideUp('fast', function() {
        $(".error").text("Please make sure you have entered a meowssage and try again.").slideDown();
      });
      return;
    }
    
    if($("#tweettext").val().length >= 141){
      $(".error").slideUp("fast", function() {
        $(".error").text("Please keep your meowssage within 140 characters and try again.").slideDown();
      });
      return;
    }

    // we are go!
    $.ajax({
      url: "/tweets",
      method: "POST",
      data: data,
      dataType: "json",
      success: function(result){
      $(".error").slideUp();
      loadTweets();
      $("#tweetform footer .counter").text(140);
    },
      error: function(err){
        console.log(data);
        alert("ajax POST request failed");
      }
    });
  });

  // Load tweet database on page load
  loadTweets();

});