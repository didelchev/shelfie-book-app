import { html,render } from "../lib.js"
import { Navigate } from "../routes.js"
import { getUserCredentials } from "../services/auth-service.js"
import { getOne } from "../services/book-service.js"
import { profileBooksTemplate } from "../templates/book-profile-template.js"
import { showMessage } from "../utils/notification.js"
import { getUserData } from "../utils/user-data.js"



const profileTemplate = (books, user) => html`
   <section class="profile-container">
        <div class="user-info">
          <img src="../../images/profile-blank.webp" alt="Profile picture" />
          <h2>${user.username}</h2>
          <h3>${user.email}</h3>
        </div>
        <section class="books">
          <section class="read-section">
            <h3>Read</h3>
            <div class="read">
            ${books.filter(book => book.status === 'read').map(book => profileBooksTemplate(book))}
            </div>
          </section>
          <section class="currently-reading-section">
            <h3>Currently Reading</h3>
            <div class="currently-reading">
            ${books.filter(book => book.status === 'currReading').map(book => profileBooksTemplate(book))}
            </div>
          </section>
          <section class="to-read-section">
            <h3>To-Read</h3>
            <div class="to-read">
              ${books.filter(book => book.status === 'to-read').map(book => profileBooksTemplate(book))}
            </div>
          </section>
        </section>
      </section>
`




export const showProfileView = () => {
  // Get the user data from DB
  getUserCredentials()
    .then(user => {
      // For each collection returnes an array of its books after the promise resloves 
      const readBooks = Promise.all(user.read.map(bookId => getOne(bookId)));
      const toReadBooks = Promise.all(user.toRead.map(bookId => getOne(bookId)));
      const currReadingBooks = Promise.all(user.currReading.map(bookId => getOne(bookId)));
      
      //Get user data
      const { email, username } = user
      const userData = { email, username}

      // Waits for all the promises to reslove 
      return Promise.all([readBooks, toReadBooks, currReadingBooks, userData])
    })
    .then(([read, toRead, currReading, userData]) => {
      //Destrucutre the values into varaiables and adds a status property for each book in the arrays
      const allBooks = [
        ...toRead.map(book => ({...book, status: 'to-read'})),
        ...read.map(book => ({...book, status: 'read'})),
        ...currReading.map(book => ({...book, status: 'currReading'}))
      ]

      render(profileTemplate(allBooks, userData))
      Navigate()
    }) 
    
    .catch(err => showMessage(err))


}