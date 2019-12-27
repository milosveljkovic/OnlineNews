using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineNews.Entities
{
    public class UserLikes
    {
        public string Username {get; set;}
        public string NewsID { get; set; }
        public int NumberOfLikes { get; set; }
        public int NumberOfDislikes { get; set; }
        public bool IsLike { get; set; }
    }
}
