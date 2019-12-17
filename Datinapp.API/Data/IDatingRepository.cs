using System.Collections.Generic;
using System.Threading.Tasks;
using Datinapp.API.Models;

namespace Datinapp.API.Data
{
    public interface IDatingRepository
    {
         void Add<T>(T entity) where T:class; // Generic method where T is any class like User,value,....

         void Delete<T>(T entity) where T:class;

         Task<bool> SaveAll();

         Task<IEnumerable<User>> GetUsers();

         Task<User> GetUser(int id);

         Task<Photo> GetPhoto(int id);

         Task<Photo> GetMainPhotoForUser(int userId);
    }
}