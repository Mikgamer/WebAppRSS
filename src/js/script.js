// Load RSS feed in main
const loadRss = async (currentFeed, event) => {
  const asideItems = document.querySelectorAll(".aside li");
  for (const item of asideItems) {
    item.classList.remove("active");
  }
  event.currentTarget.classList.add("active");

  mainContent.innerHTML = "";
  currentFeed = await fetchRss(currentFeed);
  const feed = new DOMParser().parseFromString(currentFeed, "text/xml");

  const feedTitle = document.createElement("h2");
  feedTitle.textContent = feed.querySelector("channel > title").textContent;
  mainContent.appendChild(feedTitle);

  const items = feed.querySelectorAll("item");
  [...items].map((item) => {
    const feedItem = document.createElement("article");
    feedItem.classList.add("article");
    const link = document.createElement("a");
    link.classList.add("article__link");
    link.href = item.querySelector("link").textContent;
    link.target = "_blank";
    link.rel = "noopener";
    const feedItemTitle = document.createElement("h3");
    feedItemTitle.classList.add("article__title");
    feedItemTitle.textContent = item.querySelector("title")?.textContent;
    link.appendChild(feedItemTitle);

    const feedItemDesc = document.createElement("p");
    feedItemDesc.classList.add("article__desc");
    feedItemDesc.textContent = item.querySelector("description")?.textContent;
    link.appendChild(feedItemDesc);
    feedItem.appendChild(link);
    const addToFav = document.createElement("i");
    addToFav.classList.add("article__addToFav", "fas", "fa-plus");
    addToFav.setAttribute("onclick", "addFav(event)");
    feedItem.appendChild(addToFav);
    mainContent.appendChild(feedItem);
  });
};

// Load bookmarked articles
const loadFav = () => {
  const asideItems = document.querySelectorAll(".aside li");
  for (const item of asideItems) {
    item.classList.remove("active");
  }

  mainContent.innerHTML = "";
  if (localStorage.rssFav === undefined) {
    const accountLoginDisplay = new DocumentFragment();
    const h2 = document.createElement("h2");
    h2.textContent = "First time ?";
    accountLoginDisplay.append(h2);
    const h3 = document.createElement("h3");
    h3.textContent = "Click on a feed and bookmark articles :)";
    accountLoginDisplay.append(h3);
    mainContent.appendChild(accountLoginDisplay);
  } else {
    const rssFavItems = JSON.parse(localStorage.rssFav);

    const h2 = document.createElement("h2");
    h2.textContent = "Favorites :";
    mainContent.append(h2);

    rssFavItems.map((item, index) => {
      const feedItem = document.createElement("article");
      feedItem.classList.add("article");
      const link = document.createElement("a");
      link.classList.add("article__link");
      link.href = item.link;
      link.target = "_blank";
      link.rel = "noopener";
      const feedItemTitle = document.createElement("h3");
      feedItemTitle.classList.add("article__title");
      feedItemTitle.textContent = item.title;
      link.appendChild(feedItemTitle);
      const feedItemDesc = document.createElement("p");
      feedItemDesc.classList.add("article__desc");
      feedItemDesc.textContent = item.desc;
      link.appendChild(feedItemDesc);
      feedItem.appendChild(link);
      const delFav = document.createElement("i");
      delFav.classList.add("article__delFav", "fas", "fa-trash-alt");
      delFav.setAttribute("onclick", "delFav(" + index + ")");
      // delFav.textContent = "";
      feedItem.appendChild(delFav);
      mainContent.appendChild(feedItem);
    });
  }
};

const loadAddRss = () => {
  mainContent.innerHTML = "";

  const h2 = document.createElement("h2");
  h2.textContent = "Add your own RSS feed :";
  mainContent.append(h2);

  const rssTitle = document.createElement("label");
  rssTitle.htmlFor = "rssTitleInput";
  rssTitle.textContent = "Title";
  mainContent.append(rssTitle);
  const rssTitleInput = document.createElement("input");
  rssTitleInput.id = "rssTitleInput";
  rssTitleInput.type = "text";
  mainContent.append(rssTitleInput);

  const rssUrl = document.createElement("label");
  rssUrl.htmlFor = "rssUrlInput";
  rssUrl.textContent = "RSS url";
  mainContent.append(rssUrl);
  const rssUrlInput = document.createElement("input");
  rssUrlInput.id = "rssUrlInput";
  rssUrlInput.type = "text";
  mainContent.append(rssUrlInput);

  const validateRSS = document.createElement("button");
  validateRSS.textContent = "Add";
  validateRSS.classList.add("addRSS");
  validateRSS.setAttribute("onclick", "addRSS()");
  mainContent.append(validateRSS);
};

const popupAlert = (alert) => {
  const popup = document.querySelector(".popup");
  const popupAlert = document.createElement("p");
  popupAlert.textContent = alert;
  popupAlert.classList.add("popup__alert");
  popupAlert.style.marginBottom = "-110px";
  setTimeout(() => (popupAlert.style.marginBottom = "30px"), 10);
  setTimeout(() => (popupAlert.outerHTML = ""), 2000);
  popup.appendChild(popupAlert);
};

feedFirstLoad();
loadFav();
loadAside();
loadStorage();
