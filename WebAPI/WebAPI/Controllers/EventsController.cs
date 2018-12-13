using System;
using System.Linq;
using System.Web.Http;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    public class EventsController : ApiController
    {
        private MirQ57Database db = new MirQ57Database();

        [HttpGet]
        public Event GetEventByDate(DateTime date)
        {
            return db.Events.FirstOrDefault(e => e.EventDateTime == date);
        }

        [HttpGet]
        public Event[] GetAllEvents()
        {
            return db.Events.ToArray();
        }

        [HttpPost]
        public Event CreateEvent([FromBody]Event eventParam)
        {
            db.Events.Add(eventParam);
            db.SaveChanges();
            var createdEvent = db.Events.FirstOrDefault(e => e.EventDateTime == eventParam.EventDateTime && e.EventDescription == eventParam.EventDescription);
            return createdEvent;
        }

        [HttpPut]
        public Event UpdateEvent([FromBody]Event eventParam)
        {
            var existing = db.Events.FirstOrDefault(e => e.EventID == eventParam.EventID);
            if (existing != null)
            {
                existing = eventParam;
                db.SaveChanges();
                return eventParam;
            }
            return null;
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}