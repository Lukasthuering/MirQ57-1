using WebAPI.Models;

namespace WebAPI.Repositories
{
    public class EventRepository : Repository<Event>
    {
        public EventRepository(MirQ57Database context) : base(context)
        {
        }
    }
}