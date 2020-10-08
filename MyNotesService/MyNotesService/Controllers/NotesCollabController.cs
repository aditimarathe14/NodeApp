using MyNotesService.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace MyNotesService.Controllers
{
  [EnableCors(origins: "*", headers: "*", methods: "*")]

  public class NotesCollabController : ApiController
    {

    MyNotesEntities entities = new MyNotesEntities();

    [HttpGet]
    public IEnumerable<NotesCollabe> GetCollab(int Id)
    {
      return entities.NotesCollabes.Where(x => x.Note_id == Id).ToList();
    }

    [HttpPost]
    public void Post(NotesCollabe note)
    {
      entities.NotesCollabes.Add(note);
      entities.SaveChanges();
    }


    [HttpDelete]
    public string Delete(int Id)
    {
      //Rules
      //1> atleast one Admin User is required for the note before removing collab
      //2> User can not delete Note Collabration with note

      
      var notecollab = entities.NotesCollabes.Where((x) => x.Id == Id).FirstOrDefault();
      if (notecollab == null) return "Record Not found";

      if(notecollab.Permission == "A")
      {
        var adminentities  = entities.NotesCollabes.Where((x) => x.Note_id== notecollab.Note_id && x.Permission == "A").ToList();
        if(adminentities.Count() < 2)
        {
          return "Need alteast 1 admin to delete the note";
        }

      }

      var note = entities.Notes.Where(x => x.Id == notecollab.Note_id).FirstOrDefault();
      if (note== null) return "Note not found";


      if (note.UserId != notecollab.Note_id)
      {
        entities.NotesCollabes.Remove(notecollab);
        entities.SaveChanges();

        return "Record deleted successfull";
      }

      return "";
    }

  }
}
