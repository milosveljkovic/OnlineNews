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
        // GET: api/News
        [HttpGet]
        public News Get()
        {
            Dse.ISession session = SessionManager.GetSession();
            News news = new News();

            if (session == null)
                return null;

            Row newsData = session.Execute("select * from \"News\" where \"newsID\"='2'").FirstOrDefault();
            if (newsData != null)
            {
                news.newsID = newsData["newsID"] != null ? newsData["newsID"].ToString() : string.Empty;
                news.title = newsData["title"] != null ? newsData["title"].ToString() : string.Empty;
                news.imageURL = newsData["imageurl"] != null ? newsData["imageurl"].ToString() : string.Empty;
                news.description = newsData["description"] != null ? newsData["description"].ToString() : string.Empty;
                news.likes = newsData["likes"] != null ? Int32.Parse(newsData["likes"].ToString()) : -1;
                news.dislikes = newsData["dislikes"] != null ? Int32.Parse(newsData["dislikes"].ToString()) : -1;
                //news.time = newsData["time"] != null ? DateTime.Parse(newsData["time"].ToString()) : string.Empty;
                news.journalist = newsData["journalist"] != null ? newsData["journalist"].ToString() : string.Empty;
                //Object a = newsData["tags"];
                //a.Select(x => x.ToString());
            }
            return news;
        }

        // GET: api/News/5
        [HttpGet("{id}", Name = "Get")]
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/News
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT: api/News/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
