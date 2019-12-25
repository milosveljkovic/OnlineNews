using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OnlineNews.Entities;
using Dse;

namespace OnlineNews.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        
        [HttpPost("login", Name = "LogIn")]
        public User LogIn([FromBody]User _user)
        {

            Dse.ISession session = SessionManager.GetSession();
            User user = new User();

            if (session == null)
                return null;


            Row userData = session.Execute("select * from \"User\" where \"username\"='" + _user.Username + "'").FirstOrDefault();
            if (userData != null)
            {
                if(userData["password"].ToString().Trim() == _user.Password)
                {
                    user.Username = userData["username"].ToString();
                    user.isJournalist = Boolean.Parse(userData["isJournalist"].ToString());
                    return user;
                }
            }
            return null;
        }

        [HttpPost("register")]
        public ActionResult Post([FromBody]User _user)
        {
            Dse.ISession session = SessionManager.GetSession();
            User user = new User();
            if(_user != null)
                user = _user;
            if (session == null)
                return StatusCode(500);
            Row userData = session.Execute("select * from \"User\" where \"username\"='" + user.Username + "'").FirstOrDefault();
            if (userData != null)
                return StatusCode(500);
            session.Execute("insert into \"User\"(\"username\", \"password\", \"isJournalist\") values('" + user.Username + "', '" + user.Password + "', " + false + ")");
            return StatusCode(200);
        }

    }
}