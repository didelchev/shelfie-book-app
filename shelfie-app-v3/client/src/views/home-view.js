import { getLatest } from "../services/book-service.js"
import { render,html } from "../lib.js"
import { Navigate } from "../routes.js"
import { bookTemplate } from "../templates/book-template.js"

const homeTemplate = (books) => 
html`<section class="main-content">
        <div class="welcome-text">
          <h1>Welcome to Shelfie</h1>
          <h2>
            Dive into a world of books. Organize your collection and find new reads.
          </h2>
          <div class="action-buttons">
            <a class="link" href="/login">Login</a>
            <a class="link" href="/register">Register</a>
          </div>
        </div>
        <div class="welcome-image">
          <img src="../images/welcome-image.jpg" alt="Image of a book shelf" />
        </div>
      </section>
      <section class="app-description">
        <h3>Description</h3>
        <p>
          Shelfie is your ultimate digital companion for every book lover. Seamlessly organize your personal library, track your reading progress, and discover new literary adventures tailored to your tastes.<br> Connect with a vibrant community of fellow readers, share recommendations, and delve deeper into the stories that matter to you. Whether you're a casual reader or a dedicated bibliophile, Shelfie helps you celebrate and manage your world of books with ease and joy.
        </p>
      </section>
      <section class="popular-books">
        <h2>Recently Added Books</h2>
        <div class="popular-books-grid">
        ${books.map(book => bookTemplate(book))}
        </div>
      </section>
    <footer>
      <div class="footer">
        <p>&copy; 2025 Shelfie - All rights reserved</p>
        <div class="footer-links">
          <a href="/privacy-policy">Privacy Policy</a>
          <a href="/terms-of-service">Terms of Service</a>
        </div>
      </div>
    </footer>
    `
  
export const showHomeView = () => {
  getLatest()
    .then(books => {
      const latestBooks = books.slice(-4)
      render(homeTemplate(latestBooks))
      Navigate()
    })
}
