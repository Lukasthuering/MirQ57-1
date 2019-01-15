using System.Collections.Generic;
using System.Web.Http;
using WebAPI.Models;
using WebAPI.UnitOfWork;

namespace WebAPI.Controllers
{
    public class ResponsesController : ApiController
    {
        private IUnitOfWork m_UnitOfWork = UnitOfWork.UnitOfWork.GetInstance();

        [HttpGet]
        public IEnumerable<User_Participates_Event> GetResponsesByEventAndUser(int userId, int eventId)
        {
            return m_UnitOfWork.Responses.Find(r => r.fk_EventID == userId && r.fk_UserID == userId);
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
