/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(function() {

  // Preventing XSS with Escaping function
  function escape(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  function createTweetElement(tweet) {
    var timestamp = moment(tweet.created_at).endOf('day').fromNow();
    const $tweet = $("<article>");
    const $tweetHeader = $(`<header><div class='avatar'><img src= ${escape(tweet.user.avatars.small)} /></div><h2>${escape(tweet.user.name)}</h2><a>${escape(tweet.user.handle)}</a></header>`);
    const $tweetBody = $(`<main><p>${escape(tweet.content.text)}</p></main>`);
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

  function loadTweets() {
    $.ajax({
      url: '/tweets',
      method: 'GET',
      dataType: "json",
      success: function(result){
        renderTweets(result);
      },
      error: function(err){
        alert("loadTweets failed");
      }
    });
  }

  $('#tweetform').on('submit', (e) => {
    e.preventDefault();
    $( ".error" ).hide();
    let data = $('#tweetform').serialize();

    // validation here BEFORE posting
    if($('#tweettext').val()===""){
      $(".error").text("Please make sure you have entered a meowsage and try again.").slideDown();
      return;
    }
    if($('#tweettext').val().length >= 141){
      $(".error").text("Ooops. It looks like you have too many characters in your meowsage. Please keet it within 140 characters and try again.").slideDown();
      return;
    }

    // we are go!
    $.ajax({
      url: '/tweets',
      method: 'POST',
      data: data,
      dataType: "json",
      success: function(result){
      $('#tweettext').val(" ");
      $(".error").slideUp().hide();
      loadTweets();
    },
      error: function(err){
        alert("ajax POST request failed");
      }
    });
  });

  loadTweets();

});