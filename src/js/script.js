{
  'use strict';
  const select = {
    templateOf: {
      books: '#template-book',
    },
    containerOf: {
      listBooks: '.books-list'
    },
    book: {
      image: '.book__image',
    },
  };
  const templates = {
    books: Handlebars.compile(document.querySelector(select.templateOf.books).innerHTML),
  };

  const render = function (){
    for (const book of dataSource.books){
    /* generate HTML based on template */
      const generatedHTML = templates.books(book);
      /* create element using utils.createElementFromHTML */
      const elementDOM = utils.createDOMFromHTML(generatedHTML);
      /* find menu container */
      const booksContainer = document.querySelector(select.containerOf.listBooks);
      /* add element to menu */
      booksContainer.appendChild(elementDOM);
    }
  };
  

  
  const favoriteBooks = [];

  const initActions = function(){
    const books = document.querySelectorAll(select.book.image);
    for (let book of books){
      book.addEventListener('dblclick', function(event){
        event.preventDefault;
        const bookId = book.getAttribute('data-id');
        if(favoriteBooks.includes(bookId)){
          book.classList.remove('favorite');
          favoriteBooks.splice(favoriteBooks.indexOf(bookId), 1);
        }
        else {
          book.classList.add('favorite');
          favoriteBooks.push(bookId);
        }
        console.log('book', book);
        console.log('favoriteBooks', favoriteBooks);
      });
    }
  
  };
  render();
  initActions();


}