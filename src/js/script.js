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
    classNames: {
      bookFavourite: 'favorite',
      bookInvisible: 'hidden',
    }
  };
  const templates = {
    books: Handlebars.compile(document.querySelector(select.templateOf.books).innerHTML),
  };

  class BooksList {
    constructor(){
      const thisBooksList = this;
      thisBooksList.favoriteBooks = [];
      thisBooksList.filters = [];
      thisBooksList.getElements();
      thisBooksList.initData();
      thisBooksList.render();
      thisBooksList.initActions();
      thisBooksList.determinRatingBgc();
    }
    initData() {
      const thisBooksList = this;
      thisBooksList.data = dataSource.books;
    }
    getElements(){
      const thisBooksList = this;
      thisBooksList.dom = {
        booksContainer: document.querySelector(select.containerOf.booksList),
        filtersForm: document.querySelector(select.containerOf.filters),
      };
    }
    render(){
      const thisBooksList = this;
      for (const book of thisBooksList.data){
        const ratingBgc = thisBooksList.determinRatingBgc(book.rating);
        const ratingWidth = (book.rating)*10;

        book.ratingBgc = ratingBgc;
        console.log('ratingBgc', ratingBgc);
        book.ratingWidth = ratingWidth;
        /* generate HTML based on template */
        const generatedHTML = templates.books(book);
        /* create element using utils.createElementFromHTML */
        const elementDOM = utils.createDOMFromHTML(generatedHTML);
        /* add element to menu */
        thisBooksList.dom.booksContainer.appendChild(elementDOM);
      }
    }
    
    initActions(){
      const thisBooksList = this;
      
      thisBooksList.dom.booksContainer.addEventListener('dblclick', function(event){
        event.preventDefault;
        const clickedBook = event.target;
        if(clickedBook.offsetParent.classList.contains('book__image')){
          const bookId = clickedBook.offsetParent.getAttribute('data-id');
          if(thisBooksList.favoriteBooks.includes(bookId)){
            clickedBook.offsetParent.classList.remove(select.classNames.bookFavourite);
            thisBooksList.favoriteBooks.splice(thisBooksList.favoriteBooks.indexOf(bookId), 1);
          }
          else {
            clickedBook.offsetParent.classList.add(select.classNames.bookFavourite);
            thisBooksList.favoriteBooks.push(bookId);
          }
          console.log('clickedBook', clickedBook);
          console.log('favoriteBooks', thisBooksList.favoriteBooks);      
        }
      });
  
      thisBooksList.dom.filtersForm.addEventListener('click', function(event){
        const clickedElem = event.target;
        if(clickedElem.tagName == 'INPUT' && clickedElem.type == 'checkbox' && clickedElem.name == 'filter'){
    
          console.log(clickedElem.value);
  
          const booksValue = clickedElem.value;                                  
          if(clickedElem.checked == true){
            thisBooksList.filters.push(booksValue);
          }
          else{
            thisBooksList.filters.splice(thisBooksList.filters.indexOf(booksValue), 1);
          }
          console.log('filters', thisBooksList.filters);
        }
        thisBooksList.filterBooks();
      });
    }
    determinRatingBgc(rating){
      let background = '';
      if(rating<6){
        background = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
      }
      else if(rating>6 && rating<=8){
        background = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
      }
      else if(rating>8 && rating<=9){
        background = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
      }
      else if(rating>9){
        background = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
      }
      return background;
    }
    filterBooks(){
      const thisBooksList = this;
      for(let book of thisBooksList.data){
        let shouldBeHidden = false;
        const filterBook = document.querySelector('.book__image[data-id="' + book.id + '"]');
        for(let filter of thisBooksList.filters){
          if(!book.details[filter]){
            shouldBeHidden = true;
            break;
          }
        }
        if(shouldBeHidden){
          filterBook.classList.add(select.classNames.bookInvisible);
        }
        else {
          filterBook.classList.remove(select.classNames.bookInvisible);
        }
      }
    }
  }

  new BooksList();
  
}
