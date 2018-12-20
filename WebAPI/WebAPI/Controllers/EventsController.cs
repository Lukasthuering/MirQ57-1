using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using WebAPI.Models;
using WebAPI.UnitOfWork;

namespace WebAPI.Controllers
{
    public class EventsController : ApiController
    {
        private IUnitOfWork m_UnitOfWork = UnitOfWork.UnitOfWork.GetInstance();

        [HttpGet]
        public Event GetEventByDate(DateTime date)
        {
            return m_UnitOfWork.Events.Find(e => e.EventDateTime == date).First();
        }

        [HttpGet]
        public Event GetEventById(int id)
        {
            return m_UnitOfWork.Events.Get(id);
        }

        [HttpGet]
        public IEnumerable<Event> GetAllEvents()
        {
            return m_UnitOfWork.Events.GetAll();
        }

        [HttpPost]
        public void CreateEvent([FromBody]Event eventParam)
        {
            m_UnitOfWork.Events.Add(eventParam);
            m_UnitOfWork.Complete();
        }

        [HttpPut]
        public Event UpdateEvent([FromBody]Event eventParam)
        {
            m_UnitOfWork.Events.Update(eventParam);
            m_UnitOfWork.Complete();
            return m_UnitOfWork.Events.Get(eventParam.EventID);
        }

        [HttpDelete]
        public void DeleteEvent(int eventId)
        {
            var entity = m_UnitOfWork.Events.Get(eventId);
            m_UnitOfWork.Events.Remove(entity);
            m_UnitOfWork.Complete();
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                m_UnitOfWork.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}