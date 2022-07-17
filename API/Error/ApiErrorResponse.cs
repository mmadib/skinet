using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Error
{
    public class ApiErrorResponse
    {
        public ApiErrorResponse(int statusCode, string message=null)
        {
            StatusCode = statusCode;
            Message = message ?? GetDefaultMessageForStatusCode(statusCode);
        }

        public int StatusCode { get; set; }
        public string Message { get; set; }

        private string GetDefaultMessageForStatusCode(int statusCode)
        {
            return statusCode switch
            {
                400 => "A bad request was made",
                401 => "Not authorized to be here!",
                404 => "Resource not found",
                500 => "Server error occured. Fix to go to the other side",
                _ => null,
            };
        }
    }
}