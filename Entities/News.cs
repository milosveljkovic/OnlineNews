﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineNews.Entities
{
    public class News
    {
        public string newsID { get; set; }
        public string title { get; set; }
        public string imageURL { get; set; }
        public string description { get; set; }
        public int likes { get; set; }
        public int dislikes { get; set; }
       // public LocalDate time { get; set; } //change this 
        public string journalist { get; set; }
        public List<string> tags { get; set; }
    }
}
