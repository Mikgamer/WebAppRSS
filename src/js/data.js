const mainContent = document.querySelector(".main__content");

// RSS feeds
let rss = "";
const feedFirstLoad = () => {
  if (localStorage.rss === undefined) {
    rss = {
      CNN: "http://rss.cnn.com/rss/edition_world.rss",
      "The New York Times":
        "https://rss.nytimes.com/services/xml/rss/nyt/World.xml",
      Huffpost: "https://www.huffpost.com/section/front-page/feed",
    };

    localStorage.rss = JSON.stringify(rss);
  } else {
    rss = JSON.parse(localStorage.rss);
  }
  localStorage.rss = JSON.stringify(rss);
  rss = JSON.parse(localStorage.rss);
};

// Add bookmark
const addFav = (event) => {
  const article = event.target.parentNode;
  const favItem = {
    link: article.querySelector(".article__link").href,
    title: article.querySelector(".article__title").textContent,
    desc: article.querySelector(".article__desc").textContent,
  };

  if (localStorage.rssFav === undefined) {
    localStorage.rssFav = JSON.stringify([favItem]);
  } else {
    let rssFav = JSON.parse(localStorage.rssFav);
    rssFav.push(favItem);
    localStorage.rssFav = JSON.stringify(rssFav);
  }
  popupAlert("Bookmarked item saved");
  loadStorage();
};

// Delete bookmark
const delFav = (index) => {
  let rssFav = JSON.parse(localStorage.rssFav);
  rssFav.splice(index, 1);
  if (rssFav.length > 0) {
    localStorage.rssFav = JSON.stringify(rssFav);
  } else {
    localStorage.removeItem("rssFav");
  }
  loadFav();
  popupAlert("Bookmarked item deleted");
  loadStorage();
};

const addRSS = () => {
  const rssTitle = String(document.getElementById("rssTitleInput").value);
  const rssUrl = String(document.getElementById("rssUrlInput").value);
  let item = {};
  item[rssTitle] = rssUrl;

  rss = JSON.parse(localStorage.rss);
  rss = Object.assign(rss, item);
  localStorage.rss = JSON.stringify(rss);
  loadAside();
  loadStorage();
};

const delRSS = (event) => {
  rss = event.target.parentNode;
  const rssTitle = rss.querySelector("h3").textContent;
  rss.outerHTML = "";

  rss = JSON.parse(localStorage.rss);
  delete rss[rssTitle];
  if (Object.keys(rss).length === 0 && rss.constructor === Object) {
    rss = {
      CNN: "http://rss.cnn.com/rss/edition_world.rss",
      "The New York Times":
        "https://rss.nytimes.com/services/xml/rss/nyt/World.xml",
      Huffpost: "https://www.huffpost.com/section/front-page/feed",
    };
    popupAlert("You need at least 1 RSS feed");
  }
  localStorage.rss = JSON.stringify(rss);
  loadAside();
};

const clearData = () => {
  localStorage.clear();
  loadFav();
  feedFirstLoad();
  loadAside();
  popupAlert("Data cleared");
  loadStorage();
};
