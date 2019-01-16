using System;
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
        public User_Participates_Event GetResponseByEventAndUser(Guid userId, int eventId)
        {
            var responses = m_UnitOfWork.Responses.Find(r => r.fk_EventID == eventId && r.fk_UserID == userId);
            if(responses != null && responses.Count() > 0)
            {                
                return responses.First();
            }
            return null;
        }

        [HttpGet]
        public IEnumerable<KeyValuePair<User, bool?>> GetUserResponsesByEvent(int eventId)
        {
            var userReturnList = new List<KeyValuePair<User, bool?>>();

            var responses = m_UnitOfWork.Responses.Find(r => r.fk_EventID == eventId).ToArray();
            Guid[] responsesId = responses.Select(r => r.fk_UserID).ToArray();

            // Get participants
            Guid[] participantUserIds = responses.Where(r => r.Participates).Select(r => r.fk_UserID)?.ToArray();
            User[] participants = m_UnitOfWork.Users.Find(u => participantUserIds.Contains(u.UserID))?.ToArray();
            userReturnList.AddRange(GetKeyValueFromUser(participants, true));

            // Get absentees
            Guid[] absenteeUserIds = responses.Where(r => !r.Participates).Select(r => r.fk_UserID).ToArray();
            User[] absentees = m_UnitOfWork.Users.Find(u => absenteeUserIds.Contains(u.UserID)).ToArray();
            userReturnList.AddRange(GetKeyValueFromUser(absentees, false));

            // Get not set users
            User[] undefinedUsers = m_UnitOfWork.Users.Find(u => !responsesId.Contains(u.UserID)).ToArray();
            userReturnList.AddRange(GetKeyValueFromUser(undefinedUsers, null));

            return userReturnList;
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

        private List<KeyValuePair<User, bool?>> GetKeyValueFromUser(User[] keys, bool? value)
        {
            var list = new List<KeyValuePair<User, bool?>>();
            foreach(var key in keys)
            {
                list.Add(new KeyValuePair<User, bool?>(key, value));
            }
            return list;
        }
    }
}
