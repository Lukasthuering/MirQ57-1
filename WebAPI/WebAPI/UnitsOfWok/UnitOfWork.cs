using WebAPI.Models;
using WebAPI.Repositories;

namespace WebAPI.UnitOfWork
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly MirQ57Database m_dbContext = null;
        private static IUnitOfWork m_unitOfWork = null;

        private UnitOfWork(MirQ57Database dbContext)
        {
            m_dbContext = dbContext;
            Events = new EventRepository(m_dbContext);
            Users = new UserRepository(m_dbContext);
            Responses = new ResponseRepository(m_dbContext);
        }

        public EventRepository Events { get; private set; }
        public UserRepository Users { get; private set; }
        public ResponseRepository Responses { get; private set; }

        public int Complete()
        {
            return m_dbContext.SaveChanges();
        }

        public static IUnitOfWork GetInstance()
        {
            if (m_unitOfWork == null)
                m_unitOfWork = new UnitOfWork(new MirQ57Database());

            return m_unitOfWork;
        }

        #region IDisposable Support
        private bool disposedValue = false; // Dient zur Erkennung redundanter Aufrufe.

        protected virtual void Dispose(bool disposing)
        {
            if (!disposedValue)
            {
                if (disposing)
                {
                    // TODO: verwalteten Zustand (verwaltete Objekte) entsorgen.
                }

                // TODO: nicht verwaltete Ressourcen (nicht verwaltete Objekte) freigeben und Finalizer weiter unten überschreiben.
                // TODO: große Felder auf Null setzen.

                disposedValue = true;
            }
        }

        // TODO: Finalizer nur überschreiben, wenn Dispose(bool disposing) weiter oben Code für die Freigabe nicht verwalteter Ressourcen enthält.
        // ~UnitOfWork() {
        //   // Ändern Sie diesen Code nicht. Fügen Sie Bereinigungscode in Dispose(bool disposing) weiter oben ein.
        //   Dispose(false);
        // }

        // Dieser Code wird hinzugefügt, um das Dispose-Muster richtig zu implementieren.
        public void Dispose()
        {
            // Ändern Sie diesen Code nicht. Fügen Sie Bereinigungscode in Dispose(bool disposing) weiter oben ein.
            Dispose(true);
            // TODO: Auskommentierung der folgenden Zeile aufheben, wenn der Finalizer weiter oben überschrieben wird.
            // GC.SuppressFinalize(this);
        }
        #endregion
    }
}