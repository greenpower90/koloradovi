
//zjištění indexů, které nejsou intermezzo
let articlesArray = [];
overviews.forEach((article, index) => {
  if(article.type === 'intermezzo'){
    return;
  } else {
    articlesArray.push(index);
  }

});
console.log(`články bez intermezzo: ${articlesArray}`);


//zjištění indexu současného článku v celé řadě všech článků pomocí article ID
let articleId='';
document.querySelectorAll('.js-article-id')
  .forEach((clanek) => {
    articleId = clanek.dataset.articleId;

  });

console.log(`ID is: ${articleId}`);

let nextArticleLink = 0;
let previousArticleLink = 0;
let currentArticle;

overviews.forEach((article, index) => {
  if(article.articleId === articleId){
    currentArticle = index;
    console.log('současný článek ' + index)


    
    console.log(overviews[nextArticleLink].articleLink);
  }

});



articlesArray.forEach((array, index) => {
  if(array === currentArticle){
    nextArticleLink = articlesArray[index-1];
    previousArticleLink = articlesArray[index+1];

  }
})

//vytvoření linku na další článek

if(currentArticle === articlesArray[articlesArray.length -1]){
  document.querySelector('.js-previous-article')
  .innerHTML = '';
}else{
  document.querySelector('.js-previous-article')
  .innerHTML = `
  <a href="../${overviews[previousArticleLink].articleLink}" class="js-next-article">
    <p>předchozí článek</p>
    <p>${overviews[previousArticleLink].title}</p>
  </a>
  `;
}


if(currentArticle === articlesArray[0]){
  document.querySelector('.js-next-article')
  .innerHTML = '';
}else{
  document.querySelector('.js-next-article')
  .innerHTML = `
    <a href="../${overviews[nextArticleLink].articleLink}" class="next-article js-next-article">
    <p>další článek</p>
    <p>${overviews[nextArticleLink].title}</p>
  
  </a>
  `;
}


