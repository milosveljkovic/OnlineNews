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
    public class BookmarkNewsController:ControllerBase
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
                    news.dateOfPublication = BookmarkNewsData["date_of_publication"] != null ? BookmarkNewsData["date_of_publication"].ToString() : string.Empty;
                    news.journalist = BookmarkNewsData["journalist"] != null ? BookmarkNewsData["journalist"].ToString() : string.Empty;
                    listOfTagedNews.Add(news);
                }
            }
            return listOfTagedNews;
        }


        [HttpPost("addBookmark")]
        public BookmarkNews AddBookmark([FromBody]BookmarkNews _bookmarkNews)
        {
            Dse.ISession session = SessionManager.GetSession();
            BookmarkNews bookMark = new BookmarkNews();

            if (session == null)
            {
                StatusCode(204);
                return null;
            }

           session.Execute("insert into \"BookmarkNews\" (\"username\", \"newsID\", title, imageURL, description, journalist, date_of_publication) values " +
                    "('" + _bookmarkNews.username + "', '" + _bookmarkNews.newsID + "', '" + _bookmarkNews.title + "', '" + _bookmarkNews.imageURL + "', '" + _bookmarkNews.description + "', '" + _bookmarkNews.journalist + "', '" + _bookmarkNews.dateOfPublication + "')");
            

            var data = session.Execute("select * from \"BookmarkNews\" where \"username\"='" + _bookmarkNews.username + "' and \"newsID\"='" + _bookmarkNews.newsID + "'");
            foreach (var bookmarkedNewsData in data)
            {
                bookMark.username = bookmarkedNewsData["username"] != null ? bookmarkedNewsData["username"].ToString() : string.Empty;
                bookMark.newsID = bookmarkedNewsData["newsID"] != null ? bookmarkedNewsData["newsID"].ToString() : string.Empty;
                bookMark.title = bookmarkedNewsData["title"] != null ? bookmarkedNewsData["title"].ToString() : string.Empty;
                bookMark.imageURL = bookmarkedNewsData["imageurl"] != null ? bookmarkedNewsData["imageurl"].ToString() : string.Empty;
                bookMark.description = bookmarkedNewsData["description"] != null ? bookmarkedNewsData["description"].ToString() : string.Empty;
                bookMark.dateOfPublication = bookmarkedNewsData["date_of_publication"] != null ? bookmarkedNewsData["date_of_publication"].ToString() : string.Empty; 
                bookMark.journalist = bookmarkedNewsData["journalist"] != null ? bookmarkedNewsData["journalist"].ToString() : string.Empty;
            }
            StatusCode(200);
            return bookMark;
        }
    }
}
