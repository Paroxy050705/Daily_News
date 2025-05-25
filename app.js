const apiKey = "94ed446cf5b7412aa967057d8781040e"; // Replace with your NewsAPI key
const newsContainer = document.getElementById('news-container');
const searchInput = document.getElementById('search-input');
const categorySelect = document.getElementById('category-select');
const themeToggle = document.getElementById('theme-toggle');
const prevPageBtn = document.getElementById('prev-page');
const nextPageBtn = document.getElementById('next-page');
const pageNumberSpan = document.getElementById('page-number');

let currentPage = 1;

async function fetchNews() {
  const searchQuery = searchInput.value.trim();
  const category = categorySelect.value;

  let url = `https://newsapi.org/v2/top-headlines?country=us&page=${currentPage}&pageSize=6&apiKey=${apiKey}`;

  if (searchQuery) {
    url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(searchQuery)}&page=${currentPage}&pageSize=6&apiKey=${apiKey}`;
  } else if (category) {
    url += `&category=${category}`;
  }

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!data.articles || data.articles.length === 0) {
      newsContainer.innerHTML = '<p>No articles found.</p>';
      return;
    }

    displayNews(data.articles);
  } catch (error) {
    console.error('Error:', error);
    newsContainer.innerHTML = '<p>Error fetching news.</p>';
  }
}

function displayNews(articles) {
  newsContainer.innerHTML = '';

  articles.forEach(article => {
    const card = document.createElement('div');
    card.className = 'news-card';

    card.innerHTML = `
      <img src="${article.urlToImage || 'https://via.placeholder.com/300x180'}" class="news-image" />
      <div class="news-content">
        <div class="news-title">${article.title}</div>
        <div class="news-description">${article.description || 'No description available.'}</div>
        <a href="${article.url}" target="_blank" class="read-more">Read more</a>
      </div>
    `;

    newsContainer.appendChild(card);
  });

  pageNumberSpan.textContent = currentPage;
}

// Event Listeners
searchInput.addEventListener('input', () => {
  currentPage = 1;
  fetchNews();
});

categorySelect.addEventListener('change', () => {
  currentPage = 1;
  fetchNews();
});

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
});

prevPageBtn.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    fetchNews();
  }
});

nextPageBtn.addEventListener('click', () => {
  currentPage++;
  fetchNews();
});

// Initial Fetch
fetchNews();
