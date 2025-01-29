using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.DurableTask;
using Microsoft.DurableTask.Client;
using Microsoft.Extensions.Logging;

namespace OrderProcessingFunctionApp
{
    public static class Function1
    {
        [Function(nameof(Function1))]
        public static async Task<List<string>> RunOrchestrator(
            [OrchestrationTrigger] TaskOrchestrationContext context)
        {
            ILogger logger = context.CreateReplaySafeLogger(nameof(Function1));
            logger.LogInformation("Saying hello.");
            var outputs = new List<string>();

            // Replace name and input with values relevant for your Durable Functions Activity
            outputs.Add(await context.CallActivityAsync<string>(nameof(InventoryUpdate), "Inventory is updated."));
            outputs.Add(await context.CallActivityAsync<string>(nameof(ProcessedPayment), "Payment is processed."));
            outputs.Add(await context.CallActivityAsync<string>(nameof(OrderConfirmation), "Order confirmed."));

            
            return outputs;
        }
        //Functions for updating inventory
        [Function("InventoryUpdate")]
        public static string InventoryUpdate([ActivityTrigger] string name, FunctionContext executionContext)
        {
            ILogger logger = executionContext.GetLogger("");
            logger.LogInformation("Connecting to database or inventory update", name);
            return $"{name}";
        }
        //Functions for processing payment
        [Function("ProcessedPayment")]
        public static string ProcessedPayment([ActivityTrigger] string name, FunctionContext executionContext)
        {
            ILogger logger = executionContext.GetLogger("");
            logger.LogInformation("Processing payment, please wait.", name);
            return $"{name}";
        }
        //Functions for confirming orders
        [Function("OrderConfirmation")]
        public static string OrderConfirmation([ActivityTrigger] string name, FunctionContext executionContext)
        {
            ILogger logger = executionContext.GetLogger("");
            logger.LogInformation("Confirming the orders", name);
            return $"{name}";
        }

        [Function("Function1_HttpStart")]
        public static async Task<HttpResponseData> HttpStart(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", "post")] HttpRequestData req,
            [DurableClient] DurableTaskClient client,
            FunctionContext executionContext)
        {
            ILogger logger = executionContext.GetLogger("Function1_HttpStart");

            // Function input comes from the request content.
            string instanceId = await client.ScheduleNewOrchestrationInstanceAsync(
                nameof(Function1));

            logger.LogInformation("Started orchestration with ID = '{instanceId}'.", instanceId);

            // Returns an HTTP 202 response with an instance management payload.
            // See https://learn.microsoft.com/azure/azure-functions/durable/durable-functions-http-api#start-orchestration
            return await client.CreateCheckStatusResponseAsync(req, instanceId);
        }
    }
}
