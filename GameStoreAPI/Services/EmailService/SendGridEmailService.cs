using SendGrid;
using SendGrid.Helpers.Mail;

namespace GameStoreAPI.Services.EmailService
{
    public class SendGridEmailService : IEmailService
    {
        private readonly IConfiguration _configuration;

        public SendGridEmailService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task SendEmailAsync(string toEmail, string subject, string htmlContent)
        {

            var apiKey = _configuration["SendGrid:Key"];
            var client = new SendGridClient(apiKey);


            var fromEmail = _configuration["SendGrid:FromEmail"];
            var fromName = _configuration["SendGrid:FromName"];
            var from = new EmailAddress(fromEmail, fromName);


            var to = new EmailAddress(toEmail);


            var plainTextContent = "Please view this email in an email client that supports HTML.";
            var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);


            var response = await client.SendEmailAsync(msg);

        }
    }
}
