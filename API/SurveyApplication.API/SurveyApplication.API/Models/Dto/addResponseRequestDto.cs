namespace SurveyApplication.API.Models.Dto
{
    public class addResponseRequestDto
    {
        public string SessionId { get; set; }
        public string QuestionId { get; set; }
        public string Answer { get; set; }
    }
}
