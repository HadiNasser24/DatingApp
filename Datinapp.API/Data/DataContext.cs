using Datinapp.API.Controllers.Models;
using Microsoft.EntityFrameworkCore;

namespace Datinapp.API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) {}
        
        public DbSet<Value> Values { get; set; }
        
    }
}