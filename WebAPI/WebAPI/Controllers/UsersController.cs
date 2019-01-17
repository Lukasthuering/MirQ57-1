using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using WebAPI.Helpers;
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
        public User GetUserByLogin(string username, string password)
        {
            var users = m_UnitOfWork.Users.Find(u => u.Username == username)?.ToArray();
            foreach(var user in users)
            {
                if(CryptoHelper.ValidatePassword(password, user.Password))
                {
                    return user;
                }
            }

            return null;
        }

        public User GetUserById(Guid userId)
        {
            if(userId != null && userId != Guid.Empty)
            {
                return m_UnitOfWork.Users.Find(u => u.UserID == userId)?.Single();
            }
            return null;
        }

        [HttpPost]
        public void CreateUser([FromBody]User user)
        {
            user.UserID = Guid.NewGuid();
            user.Password = CryptoHelper.HashPassword(user.Password);
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
