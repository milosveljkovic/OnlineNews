﻿using System;
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
    public class TagNewsController:ControllerBase
    {

        [HttpGet("getNewsByTag/{tagId}", Name = "GetNewsByTag")]
        public List<TagNews> GetNewsByTag(string tagId)
        {
            Dse.ISession session = SessionManager.GetSession();

            List<TagNews> listOfTagedNews = new List<TagNews>();
            if (session == null)
                return null;
            string query = "select * from \"TagNews\" where \"tagID\"=\'" + tagId + "\'";
            var allRows = session.Execute(query);
            if (allRows != null)
            {
                foreach (var tagNewsData in allRows)
                {
                    TagNews news = new TagNews();
                    news.newsID = tagNewsData["newsID"] != null ? tagNewsData["newsID"].ToString() : string.Empty;
                    news.tagID = tagNewsData["tagID"] != null ? tagNewsData["tagID"].ToString() : string.Empty;
                    news.title = tagNewsData["title"] != null ? tagNewsData["title"].ToString() : string.Empty;
                    news.imageURL = tagNewsData["imageurl"] != null ? tagNewsData["imageurl"].ToString() : string.Empty;
                    news.description = tagNewsData["description"] != null ? tagNewsData["description"].ToString() : string.Empty;
                    news.dateOfPublication = tagNewsData["date_of_publication"] != null ? tagNewsData["date_of_publication"].ToString() : string.Empty;
                    news.journalist = tagNewsData["journalist"] != null ? tagNewsData["journalist"].ToString() : string.Empty;
                    listOfTagedNews.Add(news);
                }
            }
            if (listOfTagedNews.Count == 0)
                return null;
            return listOfTagedNews;

        }
    }
}
