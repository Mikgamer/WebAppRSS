// Load aside list
const loadAside = () => {
  const asideContent = document.querySelector(".aside");
  const rssList = asideContent.querySelector("ul");
  if (rssList !== null) {
    rssList.outerHTML = "";
  }

  const rssItems = document.createElement("ul");
  const rssArray = Object.entries(rss);
  rssArray.map((currentRssItem) => {
    const rssItem = document.createElement("li");
    rssItem.setAttribute(
      "onclick",
      'loadRss("' + currentRssItem[1] + '", event)'
    );
    const h3 = document.createElement("h3");
    h3.textContent = currentRssItem[0];
    rssItem.appendChild(h3);
    const refLink = document.createElement("a");
    refLink.classList.add("fas", "fa-external-link-alt");
    refLink.title = "Go to original RSS link";
    refLink.href = currentRssItem[1];
    refLink.target = "_blank";
    refLink.rel = "noopener";

    const delLink = document.createElement("a");
    delLink.classList.add("fas", "fa-trash-alt");
    delLink.title = "Delete this RSS feed item";
    delLink.setAttribute("onclick", "delRSS(event)");

    rssItem.appendChild(refLink);
    rssItem.appendChild(delLink);
    rssItems.appendChild(rssItem);
  });
  const addItem = document.createElement("li");
  addItem.setAttribute("onclick", "loadAddRss()");
  const h3 = document.createElement("h3");
  h3.textContent = "Add your Feed";
  addItem.appendChild(h3);
  rssItems.appendChild(addItem);

  asideContent.appendChild(rssItems);
};

// Fetch RSS feed
const fetchRss = (rssFeed) => {
  return fetch(
    `https://api.allorigins.win/get?url=${encodeURIComponent(rssFeed)}`
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Network response was not ok");
      }
    })
    .then((data) => {
      return data.contents;
    });
};
