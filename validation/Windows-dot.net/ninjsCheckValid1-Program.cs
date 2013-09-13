using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using NewsIT.lib;
using Newtonsoft.Json.Schema;
using Newtonsoft.Json.Linq;

namespace ninjsCheckValid1
{
    class Program
    {

        static void Main(string[] args)
        {

            if (args.Count() < 2)
            {
                ShowHelp();
                return;
            }
            string fnNinjsO = string.Empty;
            string fnNinjsS = string.Empty;

            Console.WriteLine("ninjsCheckValid1 [0.1 - 2013-08-22] - www.iptc.org");
            fnNinjsO = args[0];
            fnNinjsS = args[1];

            if (!File.Exists(fnNinjsO))
            {
                Console.WriteLine("ninjs object file not found at <" + fnNinjsO + ">");
                return;
            }
            if (!File.Exists(fnNinjsS))
            {
                Console.WriteLine("ninjs JSON-schema file not found at <" + fnNinjsS + ">");
                return;
            }
            
            Console.WriteLine("Validation started");
            ValidateNinjsObject(fnNinjsO, fnNinjsS);

            Console.WriteLine("Press any key to continue");
            Console.Read();
        }

        static void ValidateNinjsObject(string fnNinjsObject, string fnNinjsSchema)
        {
            if (string.IsNullOrEmpty(fnNinjsObject))
            {
                Console.WriteLine("No file name of ninjs object");
                return;
            }
            if (string.IsNullOrEmpty(fnNinjsSchema))
            {
                Console.WriteLine("No file name of ninjs JSON-schema");
                return;
            }
            string ninjsSchemaStr = string.Empty;
            JsonSchema ninjsSchema = null;
            nitSmTextfile.ReadIntoString(fnNinjsSchema, "UTF-8", out ninjsSchemaStr);
            try
            {
                ninjsSchema = JsonSchema.Parse(ninjsSchemaStr);
            }
            catch (Exception e)
            {
                Console.WriteLine("Exception while parsing JSON-schema:" + e.Message);
            }

            if (ninjsSchema == null)
                return;

            string ninjsObjectStr = string.Empty;
            nitSmTextfile.ReadIntoString(fnNinjsObject, "UTF-8", out ninjsObjectStr);

            JObject ninjsObject = JObject.Parse(ninjsObjectStr); // parse
            
            IList<string> validationMsgs = new List<string>();
            
            bool isValid = ninjsObject.IsValid(ninjsSchema, out validationMsgs);

            if (isValid)
            {
                Console.WriteLine("Result: is valid!");
            }
            else
            {
                Console.WriteLine("Result: is NOT valid!");

                if (validationMsgs.Count > 0)
                {
                    Console.WriteLine("See the validation messages below");
                    foreach (var validationMsg in validationMsgs)
                    {
                        Console.WriteLine(validationMsg);
                    }
                }
            }
        }

        static void ShowHelp()
        {
            Console.WriteLine("ninjsCheckValid1 <file name of ninjs object> <file name of ninjs JSON-schema>");
            Console.WriteLine("Be aware: both files must be UTF-8 encoded or using a compatible encoding");
        }
    }
}
