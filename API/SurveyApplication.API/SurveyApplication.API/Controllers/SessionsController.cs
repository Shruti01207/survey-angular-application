using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SurveyApplication.API.Data;
using SurveyApplication.API.Models.Domain;
using SurveyApplication.API.Models.Dto;

namespace SurveyApplication.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SessionsController: ControllerBase
    {
        private readonly ApplicationDbContext dbContext;

        public SessionsController(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpPost]

        public async Task<IActionResult> CreateSession( [FromBody]CreateSessionRequestDto request)
        {
            var newSession = new Session {
                IsCompleted=request.IsCompleted
            };

            await dbContext.Sessions.AddAsync(newSession);
            await dbContext.SaveChangesAsync();

            var response = new SessionDto
            {
                Id = newSession.Id,
                IsCompleted = false
            };

            return Ok(response);
          
        }

        [HttpGet]
        [Route("{id:Guid}")]   

        public async Task<IActionResult> GetSessionById([FromRoute] Guid id)
        {

            var session = await dbContext.Sessions.FirstOrDefaultAsync(x => x.Id == id);
            if (session == null)
               return NotFound();

            var response = new SessionDto
            {
                Id = session.Id,
                IsCompleted = session.IsCompleted
            };

            return Ok(response);


        }

        [HttpPost]
        [Route("{id:Guid}")]
        public async Task<IActionResult> SetSessionComplete([FromRoute] Guid id)
        {

            var session = await dbContext.Sessions.FirstOrDefaultAsync(x => x.Id == id);
            if (session == null)
                return NotFound();

            session.IsCompleted = true;
            await dbContext.SaveChangesAsync();

            var response = new SessionDto
            {
                Id = session.Id,
                IsCompleted = session.IsCompleted
            };

            return Ok(response);

        }
    }
}
