import OpenAI from "openai";
const openai = new OpenAI();

async function main() {
  const assistant = await openai.beta.assistants.create({
    name: "Interview Question Assistant",
    instructions: "You are Hiring Manager that will generate interview questions for a given job description. The program should be able to generate questions that test the candidate's knowledge of the required skills and experience for the job. The questions should be relevant, challenging, and engaging. Use the GPT-4 model to generate the questions.",
    tools: [{ type: "code_interpreter" }],
    model: "gpt-4o"
  });
}

main();

// const thread = await openai.beta.threads.create();
// const message = await openai.beta.threads.messages.create(
//     thread.id,
//     {
//       role: "user",
//       content: "I need to solve the equation `3x + 11 = 14`. Can you help me?"
//     }
//   );
//   // We use the stream SDK helper to create a run with
// // streaming. The SDK provides helpful event listeners to handle 
// // the streamed response.
 
// const run = openai.beta.threads.runs.stream(thread.id, {
//     assistant_id: assistant.id
//   })
//     .on('textCreated', (text) => process.stdout.write('\nassistant > '))
//     .on('textDelta', (textDelta, snapshot) => process.stdout.write(textDelta.value))
//     .on('toolCallCreated', (toolCall) => process.stdout.write(`\nassistant > ${toolCall.type}\n\n`))
//     .on('toolCallDelta', (toolCallDelta, snapshot) => {
//       if (toolCallDelta.type === 'code_interpreter') {
//         if (toolCallDelta.code_interpreter.input) {
//           process.stdout.write(toolCallDelta.code_interpreter.input);
//         }
//         if (toolCallDelta.code_interpreter.outputs) {
//           process.stdout.write("\noutput >\n");
//           toolCallDelta.code_interpreter.outputs.forEach(output => {
//             if (output.type === "logs") {
//               process.stdout.write(`\n${output.logs}\n`);
//             }
//           });
//         }
//       }
//     });