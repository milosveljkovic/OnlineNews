//importovali smo Dse, driver za DataStax
//U packet manager console smo izvrsili sledecu komandu : [Install-Package Dse -Version 2.9.0]
using Dse;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineNews
{
    public static class SessionManager
    {
        public static ISession session;

        public static ISession GetSession()
        {
            if (session == null)
            {
                Cluster cluster = Cluster.Builder().AddContactPoint("127.0.0.1").Build();
                session = cluster.Connect("OnlineNews");
            }

            return session;
        }
    }
}
