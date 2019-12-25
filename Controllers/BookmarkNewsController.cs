using System;
using System.Collections.Generic;
using System.Linq;
using Dse;
using OnlineNews.Entities;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace OnlineNews.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookmarkNewsController
    {
        [HttpGet("{username}")]
        public List<BookmarkNews> GetNewsByTag(string username)
        {
            Dse.ISession session = SessionManager.GetSession();

            List<BookmarkNews> listOfTagedNews = new List<BookmarkNews>();
            if (session == null)
                return null;
            string query = "select * from \"BookmarkNews\" where \"username\"=\'" + username + "\'";
            var allRows = session.Execute(query);
            if (allRows != null)
            {
                foreach (var BookmarkNewsData in allRows)
                {
                    BookmarkNews news = new BookmarkNews();
                    news.newsID = BookmarkNewsData["newsID"] != null ? BookmarkNewsData["newsID"].ToString() : string.Empty;
                    news.username = BookmarkNewsData["username"] != null ? BookmarkNewsData["username"].ToString() : string.Empty;
                    news.title = BookmarkNewsData["title"] != null ? BookmarkNewsData["title"].ToString() : string.Empty;
                    news.imageURL = BookmarkNewsData["imageurl"] != null ? BookmarkNewsData["imageurl"].ToString() : string.Empty;
                    news.description = BookmarkNewsData["description"] != null ? BookmarkNewsData["description"].ToString() : string.Empty;
                    news.date_of_publication = BookmarkNewsData["date_of_publication"] != null ? BookmarkNewsData["date_of_publication"].ToString() : string.Empty;
                    news.journalist = BookmarkNewsData["journalist"] != null ? BookmarkNewsData["journalist"].ToString() : string.Empty;
                    listOfTagedNews.Add(news);
                }
            }
            return listOfTagedNews;
        }
    }
}
