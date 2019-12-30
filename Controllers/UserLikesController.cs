using System;
using System.Collections.Generic;
using System.Linq;
using Dse;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OnlineNews.Entities;

namespace OnlineNews.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserLikesController : ControllerBase
    {

        //GET: api/UserLikes/5
        [HttpGet("{username}")]
        public object Get(string username)
        {
            Dse.ISession session = SessionManager.GetSession();
            List<UserLikes> listOfNewsLiked = new List<UserLikes>();
            if(session!=null)
            {
                UserLikes tmp;
                var rows = session.Execute("select * from \"UserLikes\" where username = '" + username + "'");
                if(rows!=null)
                {
                    foreach(var row in rows)
                    {
                        tmp = new UserLikes();
                        tmp.NewsID = row["newsID"].ToString();
                        tmp.Username = row["username"].ToString();
                        tmp.IsLike = Boolean.Parse(row["isLike"].ToString());
                        listOfNewsLiked.Add(tmp);
                    }
                }
            }
            return listOfNewsLiked;
        }

        // POST: api/UserLikes
        [HttpPost]
        public ActionResult Post([FromBody]UserLikes value)
        {
            Dse.ISession session = SessionManager.GetSession();
            if (session != null)
            {
                Row hasLiked = session.Execute("select count(*), username, \"newsID\", \"isLike\" from \"UserLikes\" where username = '" + value.Username + "' and \"newsID\" =" + "'" + value.NewsID + "'").FirstOrDefault();
                if (Int32.Parse(hasLiked["count"].ToString()) == 0)
                {
                    session.Execute("insert into \"UserLikes\"(\"username\", \"newsID\", \"isLike\") values('" + value.Username + "', '" + value.NewsID + "', " + value.IsLike + ")");
                    if (value.IsLike)
                    {
                        session.Execute("update \"OnlineNews\".\"News\" set likes = " + (value.NumberOfLikes + 1)+ " where \"newsID\" = '" + value.NewsID + "'");
                        return StatusCode(200);
                    }
                    else
                    {
                        session.Execute("update \"OnlineNews\".\"News\" set dislikes = " + (value.NumberOfDislikes + 1)+ " where \"newsID\" = '" + value.NewsID + "'");
                        return StatusCode(200);
                    }
                }
                else if(value.IsLike)
                {
                    if (Boolean.Parse(hasLiked["isLike"].ToString()))
                    {
                        session.Execute("delete from \"UserLikes\" where username = '" + value.Username + "' and \"newsID\" ='" + value.NewsID + "'");
                        session.Execute("update \"OnlineNews\".\"News\" set likes = " + (value.NumberOfLikes - 1) + " where \"newsID\" = '" + value.NewsID + "'");
                        return StatusCode(200);
                    }
                    else
                    {
                        session.Execute("update \"OnlineNews\".\"UserLikes\" set \"isLike\" = " + true + " where username = '" + value.Username + "' and \"newsID\" ='" + value.NewsID + "'");
                        session.Execute("update \"OnlineNews\".\"News\" set likes = " + (value.NumberOfLikes + 1)+ ", dislikes = " + (value.NumberOfDislikes - 1)+ " where \"newsID\" = '" + value.NewsID + "'");
                        return StatusCode(200);
                    }
                }
                else if (!value.IsLike)
                {
                    if (!Boolean.Parse(hasLiked["isLike"].ToString()))
                    {
                        session.Execute("delete from \"UserLikes\" where username = '" + value.Username + "' and \"newsID\" ='" + value.NewsID + "'");
                        session.Execute("update \"OnlineNews\".\"News\" set dislikes = " + (value.NumberOfDislikes - 1)+ " where \"newsID\" = '" + value.NewsID + "'");
                        return StatusCode(200);
                    }
                    else
                    {
                        session.Execute("update \"OnlineNews\".\"UserLikes\" set \"isLike\" = " + false + " where username = '" + value.Username + "' and \"newsID\" ='" + value.NewsID + "'");
                        session.Execute("update \"OnlineNews\".\"News\" set likes = " + (value.NumberOfLikes - 1)+ ", dislikes = " + (value.NumberOfDislikes + 1)+ " where \"newsID\" = '" + value.NewsID + "'");
                        return StatusCode(200);
                    }
                }
            }
            return StatusCode(500);
        }

    }
}
