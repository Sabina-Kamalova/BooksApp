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
      image: '.books-list .book__image',
    },
  };
  const templates = {
    booksList: Handlebars.compile(document.querySelector(select.templateOf.books).innerHTML),
  };

  const render = function (){
    for (const book of dataSource.books){
    /* generate HTML based on template */
      const generatedHTML = templates.booksList(book);
      /* create element using utils.createElementFromHTML */
      const elementDOM = utils.createDOMFromHTML(generatedHTML);
      /* find menu container */
      const booksContainer = document.querySelector(select.containerOf.listBooks);
      /* add element to menu */
      booksContainer.appendChild(elementDOM);
    }
  };
  render();
}