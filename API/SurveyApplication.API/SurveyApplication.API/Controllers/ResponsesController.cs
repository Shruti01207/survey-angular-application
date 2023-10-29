
using Microsoft.AspNetCore.Mvc;
using SurveyApplication.API.Data;
using Microsoft.EntityFrameworkCore;
using SurveyApplication.API.Models.Domain;
using SurveyApplication.API.Models.Dto;

namespace SurveyApplication.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ResponsesController:ControllerBase
    {
        private readonly ApplicationDbContext dbContext;

        public ResponsesController(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpPost]
        public async Task<IActionResult> addResponse(addResponseRequestDto request)
        {
            var userResponse = new Response
            {
                SessionId = request.SessionId,
                QuestionId = request.QuestionId,
                Answer = request.Answer
            };

            await dbContext.Responses.AddAsync(userResponse);
            await dbContext.SaveChangesAsync();

            var response = new ResponseDto
            {
                Id = userResponse.Id,
                SessionId = userResponse.SessionId,
                QuestionId = userResponse.QuestionId,
                Answer = userResponse.Answer
            };

            return Ok(response);

        }



    }
}
