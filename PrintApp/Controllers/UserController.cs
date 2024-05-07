using Microsoft.AspNetCore.Mvc;
using PrintApp.Data;
using PrintApp.Models;

namespace PrintApp.Controllers
{
    /// <summary>
    /// Kontroler za entitet User
    /// </summary>
    [ApiController]
    [Route("api/v1/[controller]")]
    public class UserController : AppController<User, UserDTORead, UserDTOInsertUpdate>
    {
        public UserController(PrintAppContext context) : base(context) 
        {
            DbSet = _context.Users;
        }

        protected override void ControlDelete(User entity)
        {
            
        }

    }
    
}
