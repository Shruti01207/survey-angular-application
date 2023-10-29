using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SurveyApplication.API.Data;
using SurveyApplication.API.Models.Domain;
using SurveyApplication.API.Models.Dto;

namespace SurveyApplication.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuestionsController: ControllerBase
    {
        private readonly ApplicationDbContext dbContext;

        public QuestionsController(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpPost]
        public async Task<IActionResult> AddQuestion([FromBody] CreateQuestionRequestDto request)
        {

            var newQuestion = new Question
            {
                FeedbackQue = request.FeedbackQue,
                Type = request.Type
            };
            await dbContext.Questions.AddAsync(newQuestion);
            await dbContext.SaveChangesAsync();

            var response = new QuestionDto
            {
                Id = newQuestion.Id,
                FeedbackQue = newQuestion.FeedbackQue,
                Type = newQuestion.Type

            };
            return Ok(response);


        }

        [HttpGet]

        public async Task<IActionResult> GetQuestions()
        {
            var questions = await dbContext.Questions.ToListAsync(  );

            var response = new List<QuestionDto>();
            foreach(var question in questions)
            {
                response.Add(new QuestionDto
                {
                    Id = question.Id,
                    FeedbackQue = question.FeedbackQue,
                    Type = question.Type
                });

            }
            return Ok(response);
        }


    }
}
