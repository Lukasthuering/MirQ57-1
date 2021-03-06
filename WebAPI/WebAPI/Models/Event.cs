//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace WebAPI.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class Event
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Event()
        {
            this.User_Participates_Event = new HashSet<User_Participates_Event>();
        }
    
        public int EventID { get; set; }
        public string EventDescription { get; set; }
        public string EventLocation { get; set; }
        public System.DateTime EventStart { get; set; }
        public System.DateTime EventEnd { get; set; }
        public bool IsAllDay { get; set; }
        public Nullable<Guid> fk_UserEventHost { get; set; }
    
        public virtual User User { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<User_Participates_Event> User_Participates_Event { get; set; }
    }
}
