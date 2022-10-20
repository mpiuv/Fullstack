const dummy = (blogs) => {
    return 1
  }
  
  const totalLikes = (blogs) => {
    return  blogs.reduce(getSum, 0);

    function getSum(total, elem) {
        return total + elem.likes;
      }
  }

  const favoriteBlog =(blogs) =>{
    let maksi = blogs.reduce(getMax, 0)
    function getMax(previousMax, elem) {
      return Math.max(previousMax, elem.likes);
    }
    let maxElement= blogs.find(element => element.likes === maksi)
    if (typeof maxElement!="undefined")
      return {title: maxElement.title, author:maxElement.author, likes:maxElement.likes}
    else 
      return maxElement
  }

  module.exports = {
    dummy, totalLikes, favoriteBlog
  }
