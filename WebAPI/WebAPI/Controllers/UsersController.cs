using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using WebAPI.Models;
using WebAPI.UnitOfWork;

namespace WebAPI.Controllers
{
    public class UsersController : ApiController
    {
        private IUnitOfWork m_UnitOfWork = UnitOfWork.UnitOfWork.GetInstance();

        /// <summary>
        /// Get user by username and password
        /// </summary>
        /// <param name="username">Username of user</param>
        /// <param name="password">Passwort of user</param>
        /// <returns>Userobject</returns>
        [HttpGet]
        public User Get([FromBody]User user)
        {
            return m_UnitOfWork.Users.Find(u => u.Username == user.Username && u.Password == user.Password).First();
        }

        [HttpPost]
        public void CreateUser([FromBody]User user)
        {
            m_UnitOfWork.Users.Add(user);
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
