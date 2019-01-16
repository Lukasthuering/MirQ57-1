using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using WebAPI.Models;
using WebAPI.UnitOfWork;

namespace WebAPI.Controllers
{
    public class ResponsesController : ApiController
    {
        private IUnitOfWork m_UnitOfWork = UnitOfWork.UnitOfWork.GetInstance();

        [HttpGet]
        public User_Participates_Event GetResponseByEventAndUser(int userId, int eventId)
        {
            IEnumerable<User_Participates_Event> responses = m_UnitOfWork.Responses.Find(r => r.fk_EventID == userId && r.fk_UserID == userId);
            return responses.FirstOrDefault();
        }

        [HttpPost]
        public void CreateResponse([FromBody]User_Participates_Event response)
        {
            m_UnitOfWork.Responses.Add(response);
            m_UnitOfWork.Complete();
        }

        [HttpPut]
        public void UpdateResponse([FromBody]User_Participates_Event response)
        {
            m_UnitOfWork.Responses.Update(response);
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
