using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dse;
using Microsoft.AspNetCore.Mvc;
using OnlineNews.Entities;
using Newtonsoft.Json.Linq;


namespace OnlineNews.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NewsCommentsController : Controller
    {
        [HttpGet]
        public List<NewsComments> GetNewsComments()
        {
            ISession session = SessionManager.GetSession();
            List<NewsComments> comments = new List<NewsComments>();

            if (session == null)
                return null;

            var guestsData = session.Execute("select * from \"NewsComments\"");


            foreach (var guestData in guestsData)
            {
                NewsComments comment = new NewsComments();
                comment.newsID = guestData["newsID"] != null ? guestData["newsID"].ToString() : string.Empty;
                comment.commentID = guestData["commentID"] != null ? guestData["commentID"].ToString() : string.Empty;
                comment.comment = guestData["comment"] != null ? guestData["comment"].ToString() : string.Empty;
                comment.authorName = guestData["authorName"] != null ? guestData["authorName"].ToString() : string.Empty;
                comment.dateTime = guestData["dateTime"] != null ? guestData["dateTime"].ToString() : string.Empty;
                comment.username = guestData["username"] != null ? guestData["username"].ToString() : string.Empty;

                comments.Add(comment);
            }


            return comments;
        }

        [HttpGet("{id}")]
        public List<NewsComments> GetCommentsByNewsId(int id)
        {
            ISession session = SessionManager.GetSession();
            List<NewsComments> comments = new List<NewsComments>();

            if (session == null)
                return null;

            var guestsData = session.Execute("select * from \"NewsComments\" where \"newsID\"='" + id + "'");

            foreach (var guestData in guestsData)
            {
                NewsComments comment = new NewsComments();
                comment.newsID = guestData["newsID"] != null ? guestData["newsID"].ToString() : string.Empty;
                comment.commentID = guestData["commentID"] != null ? guestData["commentID"].ToString() : string.Empty;
                comment.username = guestData["username"] != null ? guestData["username"].ToString() : string.Empty;
                comment.comment = guestData["comment"] != null ? guestData["comment"].ToString() : string.Empty;
                comment.authorName = guestData["authorName"] != null ? guestData["authorName"].ToString() : string.Empty;
                comment.dateTime = guestData["dateTime"] != null ? guestData["dateTime"].ToString() : string.Empty;

                comments.Add(comment);

            }

            return comments;

        }

        [Route("Delete")]
        [HttpPost]
        public void DeleteComment([FromBody]JObject ids)
        {
            ISession session = SessionManager.GetSession();

            if (session == null)
                return;

            var commentID = ids["commentID"].ToString();
            var newsID = ids["newsID"].ToString();

            RowSet guestData = session.Execute("delete from \"NewsComments\" where \"commentID\"='" + commentID + "' and \"newsID\"='" + newsID + "'");

        }

        [HttpPost]
        public NewsComments AddComment([FromBody]NewsComments nc)
        {
            ISession session = SessionManager.GetSession();
            List<NewsComments> comments = new List<NewsComments>();


            if (session == null)
                return null;

            RowSet guest = session.Execute("insert into \"NewsComments\"(\"newsID\", \"commentID\", username, comment, \"authorName\", \"dateTime\") values ('" + nc.newsID + "', '" + nc.commentID + "', '" + nc.username + "', '" + nc.comment + "', '" + nc.authorName + "', '" + nc.dateTime + "')");

            var data = session.Execute("select * from \"NewsComments\"where \"commentID\"='" + nc.commentID + "' and \"newsID\"='" + nc.newsID + "'");

            foreach (var guestData in data)
            {
                NewsComments comment = new NewsComments();
                comment.newsID = guestData["newsID"] != null ? guestData["newsID"].ToString() : string.Empty;
                comment.commentID = guestData["commentID"] != null ? guestData["commentID"].ToString() : string.Empty;
                comment.username = guestData["username"] != null ? guestData["username"].ToString() : string.Empty;
                comment.comment = guestData["comment"] != null ? guestData["comment"].ToString() : string.Empty;
                comment.authorName = guestData["authorName"] != null ? guestData["authorName"].ToString() : string.Empty;
                comment.dateTime = guestData["dateTime"] != null ? guestData["dateTime"].ToString() : string.Empty;

                comments.Add(comment);
            }
            return comments.FirstOrDefault();
        }
    }
}