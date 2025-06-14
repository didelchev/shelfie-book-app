import { Navigate } from "../routes.js";
import { render, html } from "../lib.js";
import { getAll } from "../services/book-service.js";
import { bookTemplate } from "./book-template.js";
import { spinnerTemplate } from "./spinner-template.js";

let allBooks = [];

const catalogTemplate = (books, submitHandler, searchHandler, newHandler) => html`
  <main class="book-catalog">
    <h1>Explore books</h1>
    <form @submit=${submitHandler} class="search-form">
      <input @input=${searchHandler} placeholder="Search for a book..." type="text" name="text" class="input"/>
      <button class="search-button" type="submit">Search</button>
    </form>
    <details class="category-filter">
      <summary class="category-filter-toggle">Select Categories ⌄</summary>
      <form @submit=${newHandler} class="category-filter-menu">
        <label><input type="checkbox" value="fiction" /> Fiction</label>
        <label><input type="checkbox" value="fantasy" /> Fantasy</label>
        <label><input type="checkbox" value="biography" /> Biography</label>
        <label><input type="checkbox" value="science fiction" /> Science Fiction</label>
        <label><input type="checkbox" value="business" /> Business</label>
        <label><input type="checkbox" value="classics" /> Classics</label>
        <label><input type="checkbox" value="psychology" /> Psychology</label>
        <label><input type="checkbox" value="mystery" /> Mystery</label>
        <label><input type="checkbox" value="nonfiction" /> Nonfiction</label>
        <label><input type="checkbox" value="romance" /> Romance</label>
        <button class="search-button" type="submit">Submit</button>
    </form>
    </details>
    <div class="book-catalog-grid">
      ${books.map((book) => bookTemplate(book))}
    </div>
  </main>
`;

const submitHandler = (e) => {
  e.preventDefault();
  console.log(e.currentTarget);
};

const newHandler = (e) => {
  e.preventDefault()
  console.log('yes')
}

const searchHandler = (e) => {
  const query = e.currentTarget.value.toLowerCase();

  let filteredBooks = allBooks.filter((book) => {
    return (
      book.title.toLowerCase().includes(query) ||
      book.author.toLowerCase().includes(query)
    );
    // TODO:  Search by ISBN
  });
  render(catalogTemplate(filteredBooks, submitHandler, searchHandler ));
};

export const showCatalogView = () => {
  if (!allBooks.length) {
    render(spinnerTemplate());
  }
  getAll().then((books) => {
    allBooks = books;
    render(catalogTemplate(allBooks, submitHandler, searchHandler, newHandler));
    Navigate();
  });
};
