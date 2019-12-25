using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineNews.Entities
{
    public class User
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public bool isJournalist { get; set; }
    }
}
