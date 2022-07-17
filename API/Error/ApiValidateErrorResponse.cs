using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Error
{
    public class ApiValidateErrorResponse : ApiErrorResponse
    {
        public ApiValidateErrorResponse() : base(400)
        {
           
        }

        public IEnumerable<string>  Errors { get; set; }
    }
}