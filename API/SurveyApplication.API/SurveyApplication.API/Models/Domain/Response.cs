namespace SurveyApplication.API.Models.Domain
{
    public class Response
    {

       public Guid Id { get; set; }

       public string SessionId { get; set; }

       public string QuestionId { get; set; }

       public string Answer { get; set; }


    }
}
