﻿//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace MyNotesService.Models
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    using System.Data.Entity.Core.Objects;
    using System.Linq;
    
    public partial class MyNotesEntities : DbContext
    {
        public MyNotesEntities()
            : base("name=MyNotesEntities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<Note> Notes { get; set; }
        public virtual DbSet<NotesCollabe> NotesCollabes { get; set; }
    
        public virtual ObjectResult<Note> GetNotesForUserId(Nullable<int> userId)
        {
            var userIdParameter = userId.HasValue ?
                new ObjectParameter("UserId", userId) :
                new ObjectParameter("UserId", typeof(int));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<Note>("GetNotesForUserId", userIdParameter);
        }
    
        public virtual ObjectResult<Note> GetNotesForUserId(Nullable<int> userId, MergeOption mergeOption)
        {
            var userIdParameter = userId.HasValue ?
                new ObjectParameter("UserId", userId) :
                new ObjectParameter("UserId", typeof(int));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<Note>("GetNotesForUserId", mergeOption, userIdParameter);
        }
    }
}
