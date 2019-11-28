using System.Threading.Tasks;
using Datinapp.API.Models;

namespace Datinapp.API.Data
{
    public interface IAuthRepository
    {
         Task<User> Register(User user,string password);

         Task<User> Login(string username, string password);

         Task<bool> UserExists(string username);
    }
}