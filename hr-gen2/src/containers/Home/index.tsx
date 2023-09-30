"use client";

import {
  Button,
  Card,
  CardBody,
  Chip,
  Tab,
  Tabs,
  Textarea,
} from "@nextui-org/react";
import toast from "react-hot-toast";

const Home = () => {
  let tabs = [
    // {
    //   id: "Dashboard",
    //   label: "Dashboard",
    //   content:
    //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    // },
    // {
    //   id: "employees",
    //   label: "Employees",
    //   content:
    //     "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    // },
    {
      id: "quick-reply",
      label: "Quick Reply",
      content: (
        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-2">
            <h1 className="font-bold">HR-Gen2</h1>
            <Chip color="secondary" variant="flat">
              GPT-3 Turbo
            </Chip>
          </div>
          <Textarea
            placeholder="Write your message here..."
            width="100%"
            label="Message"
            variant="bordered"
          />
          <Textarea
            placeholder=""
            width="100%"
            maxRows={999}
            label="Output"
            readOnly={true}
            value={""}
          />
          <Button
            color="secondary"
            variant="shadow"
            onClick={() => {
              toast("test");
            }}
          >
            Generate
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div>
        <Tabs aria-label="Dynamic tabs" items={tabs}>
          {(item) => (
            <Tab key={item.id} title={item.label}>
              <Card>
                <CardBody>{item.content}</CardBody>
              </Card>
            </Tab>
          )}
        </Tabs>
      </div>
    </div>
  );
};

export default Home;
