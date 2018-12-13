using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    public class UsersController : ApiController
    {
        private MirQ57Database db = new MirQ57Database();

        /// <summary>
        /// Get user by username and password
        /// </summary>
        /// <param name="username">Username of user</param>
        /// <param name="password">Passwort of user</param>
        /// <returns>Userobject</returns>
        [HttpGet]
        public User Get([FromBody]User user)
        {
            if (user == null)
            {
                throw new ArgumentNullException("user");
            }
            return db.Users.FirstOrDefault(u => u.Username == user.Username && u.Password == user.Password);
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
