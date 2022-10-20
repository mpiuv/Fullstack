const dummy = (blogs) => {
    return 1
  }
  
  const totalLikes = (blogs) => {
    return  blogs.reduce(getSum, 0);

    function getSum(total, elem) {
        return total + elem.likes;
      }
  }

  module.exports = {
    dummy, totalLikes
  }
