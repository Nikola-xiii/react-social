

module.exports = TweetsApp = React.createClass({

  // Set the initial component state
  getInitialState: function(props){

    props = props || this.props;

    // Set initial application state using props
    return {
      tweets: props.tweets,
      count: 0,
      page: 0,
      paging: false,
      skip: 0,
      done: false
    };

  },

  componentWillReceiveProps: function(newProps, oldProps){
    this.setState(this.getInitialState(newProps));
  },

  componentDidMount: function () {
    var self = this;

    var socket = io.connect();

    socket.on('tweet', function (data) {
      self.addTweet(data);
    });

    // Attach scroll event to the window for infinity paging
    window.addEventListener('scroll', this.checkWindowScroll);
  },

  // Method to add a tweet to our timeline
  addTweet: function () {
    var updates = this.state.tweets;

    // Increment the unread count
    var count = this.state.count + 1;

    // Increment the skip count
    var skip = this.state.skip + 1;

    // Add tweet to the beginning of the tweets array
    updated.unshift(tweet);

    // Set application state
    this.setState({tweets: updated, count: count, skip: skip});

  },

  // Method to show the unread tweets
  showNewTweets: function(){

    // Get current application state
    var updated = this.state.tweets;

    // Mark our tweets active
    updated.forEach(function(tweet){
      tweet.active = true;
    });

    // Set application state (active tweets + reset unread count)
    this.setState({tweets: updated, count: 0});

  },

  // Render the component
  render: function(){

    return (
      <div className="tweets-app">
        <Tweets tweets={this.state.tweets} />
        <Loader paging={this.state.paging}/>
        <NotificationBar count={this.state.count} onShowNewTweets={this.showNewTweets}/>
      </div>
    )

  }
});
