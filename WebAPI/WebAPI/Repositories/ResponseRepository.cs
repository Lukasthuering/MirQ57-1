using WebAPI.Models;

namespace WebAPI.Repositories
{
    public class ResponseRepository : Repository<User_Participates_Event>
    {
        public ResponseRepository(MirQ57Database context) : base(context)
        {
        }
    }
}