class Utilities {
  static getFormattedDateTime(timestamp) {
    const options = {
      weekday: "long", year: "numeric", month: "short",
      day: "numeric", hour: "2-digit", minute: "2-digit"
    };
    const date = new Date(timestamp);
    return date.toLocaleTimeString("en-us", options);
  }

  static adjustPostForSortingAndRanking(posts) {
    let adjustedPosts = [];
    if (posts && posts.length > 0) {
      adjustedPosts = posts;
      adjustedPosts.sort((a, b) => {
        return this.compareByVoteScore(a.voteScore, b.voteScore);
      });

      adjustedPosts = adjustedPosts.map((post, index) => {
        post.ranking = index + 1;
        post.sortTitle = post.title.toLowerCase();
        post.sortAuthor = post.author.toLowerCase();
        post.sortCategory = post.category.toLowerCase();
        return post;
      });
    }
    return adjustedPosts;
  }

  static sortCommentsByRanking(comments) {
    let sortedComments = [];
    if (comments && comments.length > 0) {
      sortedComments = comments;
      sortedComments.sort((a, b) => {
        return this.compareByVoteScore(a.voteScore, b.voteScore);
      });
    }
    return sortedComments;
  }

  static compareByVoteScore = (numA, numB) => {
    if (numA > numB) {
      return -1;
    } else if (numA < numB) {
      return 1;
    } else {
      return 0;
    }
  };
}

export default Utilities;