using System.ComponentModel.DataAnnotations;

namespace Datinapp.API.Dtos
{
    public class UserForRegisterDto
    {
        [Required(ErrorMessage="This is required")]
        public string username {get;set;}

        [Required]
        [StringLength(8,MinimumLength=4,ErrorMessage="You must specify password between 4 and 8 char")]
        public string password {get;set;}
    }
}