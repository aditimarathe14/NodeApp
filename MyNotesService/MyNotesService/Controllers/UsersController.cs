using MyNotesService.Models;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Cors;

namespace MyNotesService.Controllers
{
  [EnableCors(origins: "*", headers: "*", methods: "*")]
   public partial class EmployeeController : ApiController
  {
   
    private List<User> BuildList()
    {
      return new List<User>()
      {
        new User {  CompanyId = 1 , Password = "12345" , EmpName = "Swati" , EmpId = 2},
        new User { CompanyId = 1, Password = "12345" , EmpName = "Amit", EmpId = 3 },
        new User { CompanyId = 1, Password = "12345" , EmpName = "Nilesh", EmpId = 4 },
        new User { CompanyId = 1, Password = "12345" , EmpName = "mahesh", EmpId = 5 },
        new User { CompanyId = 1, Password = "12345" , EmpName = "Aditi", EmpId = 6 },
        new User { CompanyId = 1, Password = "12345" , EmpName = "Ganesh", EmpId = 7 }
      };
    }
    public List<User> Get(int CompanyId)
    {
      return BuildList();
    }


    [HttpPost]
    [Route("api/Employee/Login/")]

    public User Login(string username , string password)
    {
      var usrs = BuildList();
      var usr = usrs.Where((x) => x.EmpName.ToLower() == username.ToLower() 
      && x.Password == password).FirstOrDefault();
      return usr;
    }

    [Route("Employee/GetActiveEmployeeList")]
    public List<User> GetActiveEmployeeList(int companyId)
    {
      return BuildList();
    }
  }
}