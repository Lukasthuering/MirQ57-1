using System;
using WebAPI.Repositories;

namespace WebAPI.UnitOfWork
{
    public interface IUnitOfWork : IDisposable
    {
        EventRepository Events { get; }
        ResponseRepository Responses { get; }
        UserRepository Users { get; }
        int Complete();
    }
}
