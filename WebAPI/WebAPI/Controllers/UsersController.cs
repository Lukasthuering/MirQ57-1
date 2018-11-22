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
        /// Returns all users
        /// </summary>
        /// <returns>List of of users</returns>
        public List<UserLogin> Get()
        {
            List<UserLogin> userLogins = db.UserLogins.ToList();
            return userLogins;
        }

        /// <summary>
        /// Get user by id
        /// </summary>
        /// <param name="id">Identifier</param>
        /// <returns>Userobject</returns>
        public UserLogin Get(Guid id)
        {
            if (id != null)
            {
                return db.UserLogins.Find(id); ;
            }
            return null;
        }

        /// <summary>
        /// Save new user
        /// </summary>
        /// <param name="userLogin">User to create without id</param>
        /// <returns>Created user with id filled</returns>
        public UserLogin Post([FromBody]UserLogin userLogin)
        {
            if (ModelState.IsValid)
            {
                userLogin.UserId = Guid.NewGuid();
                db.UserLogins.Add(userLogin);
                db.SaveChanges();
            }
            return userLogin;
        }

        /// <summary>
        /// Update existing user
        /// </summary>
        /// <param name="id">Id of user to update</param>
        /// <param name="userLogin">Data to be filled in the user</param>
        public UserLogin Put(Guid id, [FromBody]UserLogin userLogin)
        {
            if (id != null)
            {
                UserLogin foundUserLogin = db.UserLogins.Find(id);
                if (foundUserLogin != null)
                {
                    foundUserLogin.Responses = userLogin.Responses;
                    foundUserLogin.FirstName = userLogin.FirstName;
                    db.SaveChanges();
                    return foundUserLogin;
                }
            }
            return null;
        }

        /// <summary>
        /// Delete user from database
        /// </summary>
        /// <param name="id">id of user to delete</param>
        public bool Delete(Guid id)
        {
            if (id != null)
            {
                var foundEntry = db.UserLogins.Find(id);
                if (foundEntry != null)
                {
                    db.UserLogins.Remove(foundEntry);
                    db.SaveChanges();
                    return true;
                }
            }
            return false;
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
