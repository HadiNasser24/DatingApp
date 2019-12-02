using Microsoft.AspNetCore.Http;

namespace Datinapp.API.Help
{
    public static class Extensions
    {
        public static void AddApplicationError(this HttpResponse response,string message){
             //we used this to override the response
             response.Headers.Add("Application-Error",message);
             response.Headers.Add("Access-Control-Expose-Headers","Application-Error");
             response.Headers.Add("Access-Control-Allow-Origin","*");
        }
    }
}