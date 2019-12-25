using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineNews.Entities
{
    public class NewsComments
    {
        public string newsID { get; set; }
        public string commentID { get; set; }
        public string username { get; set; }
        public string comment { get; set; }
        public string authorName { get; set; }
        public string dateTime { get; set; }
       
    }
}
