{
  'use strict';
  const select = {
    templateOf: {
      books: '#template-book',
    },
    containerOf: {
      booksList: '.books-list',
      filters: '.filters',
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
      const booksContainer = document.querySelector(select.containerOf.booksList);
      /* add element to menu */
      booksContainer.appendChild(elementDOM);
    }
  };
  

  
  const favoriteBooks = [];
  const filters = [];

  function initActions(){
    const booksList = document.querySelector(select.containerOf.booksList);
    
    booksList.addEventListener('dblclick', function(event){
      event.preventDefault;
      const clickedBook = event.target;
      if(clickedBook.offsetParent.classList.contains('book__image')){
        const bookId = clickedBook.offsetParent.getAttribute('data-id');
        if(favoriteBooks.includes(bookId)){
          clickedBook.offsetParent.classList.remove('favorite');
          favoriteBooks.splice(favoriteBooks.indexOf(bookId), 1);
        }
        else {
          clickedBook.offsetParent.classList.add('favorite');
          favoriteBooks.push(bookId);
        }
        console.log('clickedBook', clickedBook);
        console.log('favoriteBooks', favoriteBooks);      
      }
    });

    const filtersForm = document.querySelector(select.containerOf.filters);

    filtersForm.addEventListener('click', function(event){
      const clickedElem = event.target;
      if(clickedElem.tagName == 'INPUT' && clickedElem.type == 'checkbox' && clickedElem.name == 'filter'){
  
        console.log(clickedElem.value);

        const booksValue = clickedElem.value;                                
        if(clickedElem.checked == true){
          filters.push(booksValue);
        }
        else{
          filters.splice(filters.indexOf(booksValue), 1);
        }
        console.log('filters', filters);
      }
      filterBooks();
    });
  };

  function filterBooks(){
    const books = dataSource.books;
    
    for(let book of books){
      let shouldBeHidden = false;
      const filterBook = document.querySelector('.book__image[data-id="' + book.id + '"]');
      for(let filter of filters){
        if(!book.details[filter]){
          shouldBeHidden = true;
          break;
        }
      }
      if(shouldBeHidden){
        filterBook.classList.add('hidden');
      }
      else {
        filterBook.classList.remove('hidden');
      }
    }
  }

  render();
  initActions();
}