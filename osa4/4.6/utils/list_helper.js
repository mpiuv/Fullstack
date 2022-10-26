var _ = require('lodash');

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

  const mostBlogs=(blogs) =>{
    if (blogs.length===0)
       return undefined
    if (blogs.length===1)
      return {author:blogs[0].author,blogs:1}

    blogsPerAuthor=_.countBy(blogs,getAuthor)
    function getAuthor(elem){return elem.author}
    
    let authorMax = 'Nobody'
    let blogCountMax = 0
    for (const author in blogsPerAuthor ) {
      if (blogsPerAuthor[author]>blogCountMax){
        blogCountMax=blogsPerAuthor[author]
        authorMax=author
      }
    }
    return { author: authorMax, blogs: blogCountMax }
  
  }

  module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs
  }
