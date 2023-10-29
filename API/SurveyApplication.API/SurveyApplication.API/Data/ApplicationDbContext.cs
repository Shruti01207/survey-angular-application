using Microsoft.EntityFrameworkCore;
using SurveyApplication.API.Models.Domain;

namespace SurveyApplication.API.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Session> Sessions { get; set; }

        public DbSet<Question> Questions { get; set; }

        public DbSet<Response> Responses { get; set; }

    }
}
