using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MyNotesService.Models
{
  public class User
  {
    public int EmpId { get; set; }
    public int CompanyId { get; set; }

    public string EmpName { get; set; }

    public string Password { get; set; }
  }
}