using MyNotesService.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Cors;

namespace MyNotesService.Controllers
{
  [EnableCors(origins: "*", headers: "*", methods: "*")]
  public class NotesController : ApiController
  {
    MyNotesEntities entities = new MyNotesEntities();

    public NotesController()
    {
      
    }

    
    public IEnumerable<Note> Get(int CompanyId , int UserId)
    { 
     return entities.GetNotesForUserId(UserId) ; 
    }

    public Note Get(int id)
    {
      return entities.Notes.Where((x) => x.Id == id).FirstOrDefault();
    }

    public void Post([FromBody]Note note)
    {
      note.createdOn = DateTime.Now;
      note.lastUpdateOn = DateTime.Now;
      entities.Notes.Add(note);
      entities.SaveChanges();
      NotesCollabe collabe = new NotesCollabe();
      collabe.Note_id = note.Id;
      collabe.Permission = "A";
      collabe.UserId = note.UserId.Value;
      entities.NotesCollabes.Add(collabe);
      entities.SaveChanges();
    }


    [HttpPut]
    // PUT: api/Tasks/5
    public void Put(int Id, [FromBody]Note note)
    {
      var _note = entities.Notes.Where((x) => x.Id == Id).FirstOrDefault();
      _note.Title = note.Title;
      _note.Body = note.Body;
      _note.lastUpdateOn = DateTime.Now;
      entities.SaveChanges();
    }


    [HttpDelete]
    // DELETE: api/Tasks/5
    public void Delete(int id)
    {
      var noteToRemove = Get(id);
      entities.Notes.Remove(noteToRemove);
      entities.SaveChanges();
    }
  }
}