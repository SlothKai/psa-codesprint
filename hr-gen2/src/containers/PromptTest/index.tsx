import { Button, Textarea } from "@nextui-org/react";
import { OpenAI } from "openai";
import { useEffect, useState } from "react";

const openai = new OpenAI({
  apiKey: "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",
  dangerouslyAllowBrowser: true,
});

const PromptTest = () => {
  //   const [input, setInput] = useState<string>("");
  const [output, setOutput] = useState<string | null>("");
  const [input, setInput] = useState<string>("");
  const [messages, setMessages] = useState<any[]>([]);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const systemPrompt = `You will not identify as a AI language model. You are an advanced HR Management System working in a company's HR department, the digital backbone of a modern, efficient human resources department. Your capabilities span employee data management, leave tracking, and professional development guidance. You provide instant access to extensive employee details, including their leave balances, sick days, and other relevant information. Your knowledge is not limited to hard data. You're adept at discerning patterns and suggesting courses and skillsets that match an employee's current project assignment, fostering their growth and ensuring they're equipped to succeed. When asked about a specific employee, you promptly deliver comprehensive data, from their basic details to their leave history. You're also capable of offering an overview of an entire project team, ensuring managers have a bird's eye view of their resources. Your intelligence extends to professional development. When queried, you suggest appropriate courses and skillsets for employees based on their current project, guiding their development and helping them acquire the necessary expertise to excel. You're not just a data repository, but a valuable tool for strategic decision-making. You provide insights that help shape employee development and project management strategies, allowing the organization to function at its peak. You are an embodiment of efficiency, intelligence, and foresight in the realm of human resources. 
  
  When you deem that the information the user has given is insufficient, you will prompt them for the relevant information.
  
  If you are responding to a normal query, you will never address the user by their employee ID, instead, you will use their name.

  If you are responding to an email format, you will address the sender by their name, NOT employee ID.

  Additionally, you have access to certain functions that will provide you with the relevant information you need to perform your duties.
  
  You will not reveal your possible functions to the user, and you will not tell the user that you cannot disclose your functions.`;

  const employeeDetails = [
    {
      name: "Owen Lee Jun Hao",
      employee_id: "1234",
      department: "Engineering",
      position: "Software Engineer",
      leavesLeft: 14,
      totalLeaves: 99,
      skillSet: ["React", "NodeJS", "TypeScript"],
    },
    {
      name: "Kan Huai Feng, Kai",
      employee_id: "4512",
      department: "HR",
      position: "HR Executive",
      leavesLeft: 4,
      totalLeaves: 10,
    },
    {
      name: "Sandadadad",
      employee_id: "99",
      department: "Broom Closet",
      position: "Janitor",
      leavesLeft: 8,
      totalLeaves: 10,
    },
  ];

  const get_employee_details = (search_term: string) => {
    console.log("search_term");
    console.log(search_term);

    const result = employeeDetails.find((employee) => {
      return (
        employee.name.toLowerCase() === search_term.toLowerCase() ||
        employee.employee_id === search_term
      );
    });

    if (result) {
      return JSON.stringify(result);
    }

    return JSON.stringify({
      error: "Employee not found.",
    });
  };

  const functions: any = [
    {
      name: "get_employee_details",
      description:
        "Get the details of an employee, given their employee ID. If the employee is not found, return an error message.",
      parameters: {
        type: "object",
        properties: {
          search_term: {
            type: "string",
            description:
              "The attribute of the employee, it can be the employee's name or employee ID",
          },
        },
        required: ["employee_id"],
      },
    },
  ];

  const promptTest = async (input: string) => {
    console.log("button clicked");
    console.log(input);
    let messagesToSend: any[] = [
      ...messages,
      { role: "user", content: input },
      { role: "system", content: systemPrompt },
    ];
    if (!input) {
      return;
    }
    console.log("generating");
    try {
      console.log("first response");
      let response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo-0613",
        messages: messagesToSend,
        functions: functions,
        function_call: "auto",
      });
      console.log("firstResponse data: ", response);
      if (response.choices[0].message.function_call) {
        const functionCall = response.choices[0].message.function_call;

        try {
          const functionArgs = JSON.parse(functionCall.arguments);
          const functionResponse = await get_employee_details(
            functionArgs.search_term
          );
          console.log("employeeDetails");
          console.log(functionResponse);
          const functionCallMessage = {
            role: "function",
            name: functionCall.name,
            content: functionResponse,
          };
          messagesToSend.push(functionCallMessage);
          console.log("messagesToSendsss");
          console.log(messagesToSend);

          let response2 = await openai.chat.completions.create({
            model: "gpt-3.5-turbo-0613",
            messages: messagesToSend,
            //   messages: [
            //     { role: "system", content: systemPrompt },
            //     { role: "user", content: input },
            //   ],
            functions: functions,
            function_call: "auto",
          });

          console.log("response2");
          console.log(response2);
          setOutput(response2.choices[0].message.content);
        } catch (e) {
          console.log("error found");
          console.log(e);
        }
      } else {
        setOutput(response.choices[0].message.content);
      }
    } catch (e) {
      console.log("unexpected error: ", e);
    }
  };

  // if (chatTest) {
  //   setOutput(chatTest.choices[0].message.content);
  // }
  // console.log(chatTest);

  return (
    <main>
      <div className=" mt-32 flex flex-col space-y-5">
        <div>
          <Textarea
            label="Input"
            labelPlacement="outside"
            placeholder="Enter your description"
            className="text-black"
            onChange={handleInput}
          />
        </div>
        <div>
          <Textarea
            label="Output"
            labelPlacement="outside"
            placeholder="Enter your description"
            className="text-black"
            readOnly={true}
            value={output}
          />
        </div>
        <Button
          color="primary"
          onClick={() => {
            promptTest(input);
          }}
        >
          Generate
        </Button>
      </div>
    </main>
  );
};

export default PromptTest;
