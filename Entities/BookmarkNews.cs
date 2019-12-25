using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineNews.Entities
{
    public class BookmarkNews
    {
        public string username { get; set; }
        public string newsID { get; set; }
        public string title { get; set; }
        public string imageURL { get; set; }
        public string description { get; set; }
        public string date_of_publication { get; set; }
        public string journalist { get; set; }
    }
}
