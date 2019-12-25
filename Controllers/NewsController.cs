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
    public class NewsController : ControllerBase
    {
        // GET: api/News/newsID    
        [HttpGet("{newsID}")]
        public News Get(string newsID)
        {
            Dse.ISession session = SessionManager.GetSession();
            News news = new News();

            if (session == null)
                return null;

            Row newsData = session.Execute("select * from \"News\" where \"newsID\"='"+newsID+ "'").FirstOrDefault();
            if (newsData != null)
            {
                news.newsID = newsData["newsID"] != null ? newsData["newsID"].ToString() : string.Empty;
                news.title = newsData["title"] != null ? newsData["title"].ToString() : string.Empty;
                news.imageURL = newsData["imageurl"] != null ? newsData["imageurl"].ToString() : string.Empty;
                news.description = newsData["description"] != null ? newsData["description"].ToString() : string.Empty;
                news.likes = newsData["likes"] != null ? Int32.Parse(newsData["likes"].ToString()) : -1;
                news.dislikes = newsData["dislikes"] != null ? Int32.Parse(newsData["dislikes"].ToString()) : -1;
                news.dateOfPublication = newsData["date_of_publication"] != null ? newsData["date_of_publication"].ToString() : string.Empty;
                news.journalist = newsData["journalist"] != null ? newsData["journalist"].ToString() : string.Empty;
                news.tags = (string[])newsData["tags"];
            }

            return news;
        }

        // GET: api/News/5
        //[HttpGet("{id}", Name = "Get")]
        //public string Get(int id)
        //{
        //    Dse.ISession session = SessionManager.GetSession();
        //    News news = new News();

        //    if (session == null)
        //        return null;


        //}

        // POST: api/News
        [HttpPost]
        public ActionResult Post([FromBody]News _news)
        {
            Dse.ISession session = SessionManager.GetSession();
            News news = new News();

            if (_news != null)
                news = _news;

            if (session == null)
                return StatusCode(500);

            string formatedTags = getFormatedTags(news.tags);

            RowSet newsData = session.Execute("insert into \"News\" (\"newsID\", title, imageURL, description, likes, dislikes, journalist, tags, date_of_publication) " +
                "values ('" + news.newsID + "', '"+ news.title+ "', '" + news.imageURL + "', '" + news.description + "', " + news.likes + ", " + news.dislikes + ", '" + news.journalist + "', [" + formatedTags + "],'"+news.dateOfPublication+"')");
            foreach(string tag in news.tags)
            {
                session.Execute("insert into \"TagNews\" (\"tagID\", \"newsID\", title, imageURL, description, journalist, date_of_publication) values " +
                    "('"+ tag + "', '" + news.newsID + "', '" + news.title + "', '" + news.imageURL + "', '" + news.description + "', '" + news.journalist + "', '" + news.dateOfPublication + "')");
            }
            return StatusCode(200);
        }

        string getFormatedTags(IEnumerable<string> tags)
        {
            int i;
            List<string> tagList = tags.ToList();
            string current="'";
            for( i=0;i< tagList.Count()-1;i++)
            {
                current += tagList[i] + "','";
            }
            return current += tagList[i]+"'";
        }

        // PUT: api/News/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{newsID}")]
        public void Delete(string newsID)
        {
            Dse.ISession session = SessionManager.GetSession();
            News news = new News();

            if (session == null)
                return;

            RowSet newsData = session.Execute("delete from \"News\" where \"newsID\" = '" + newsID + "'");
        }
    }
}
