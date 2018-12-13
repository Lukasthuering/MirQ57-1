using WebAPI.Models;

namespace WebAPI.Repositories
{
    public class UserRepository : Repository<User>
    {
        public UserRepository(MirQ57Database context) : base(context)
        {
        }
    }
}