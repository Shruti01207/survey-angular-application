namespace SurveyApplication.API.Models.Dto
{
    public class ResponseDto
    {
        public Guid Id { get; set; }
        public string SessionId { get; set; }
        public string QuestionId { get; set; }
        public string Answer { get; set; }
    }
}
