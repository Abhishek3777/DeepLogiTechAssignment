import https from "https";

function fetchTopStories() {
  https.get("https://time.com/feed/", (res) => {
    let data = "";

    
    res.on("data", (chunk) => {
      data += chunk;
    });

   
    res.on("end", () => {
      const items = data.match(/<item>([\s\S]*?)<\/item>/g) || [];

      const stories = items.slice(0, 6).map(block => {
        const title = block.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/)?.[1];
        const link = block.match(/<link>(.*?)<\/link>/)?.[1];
        const pubDate = block.match(/<pubDate>(.*?)<\/pubDate>/)?.[1];
        const description = block.match(/<description><!\[CDATA\[(.*?)\]\]><\/description>/)?.[1];

        return { title, link, pubDate, description };
      });

      console.log(stories);
    });
  }).on("error", (err) => {
    console.error("Error fetching feed:", err);
  });
}

fetchTopStories();
