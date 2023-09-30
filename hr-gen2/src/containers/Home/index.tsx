"use client";

import {
  Button,
  Card,
  CardBody,
  Chip,
  ChipProps,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tabs,
  Textarea,
  Tooltip,
  User,
} from "@nextui-org/react";
import toast from "react-hot-toast";
import { columns, users } from "@/utils/egdata";
import React from "react";
import { Pencil } from "../../../public/icons/pencil.jsx";
import { Trash } from "../../../public/icons/trash.jsx";

const statusColorMap: Record<string, ChipProps["color"]> = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

const Home = () => {
  type User = (typeof users)[0];

  const renderCell = React.useCallback((user: User, columnKey: React.Key) => {
    const cellValue = user[columnKey as keyof User];

    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{ radius: "lg", src: user.avatar }}
            description={user.email}
            name={cellValue}
          >
            {user.email}
          </User>
        );
      case "role":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
            <p className="text-bold text-sm capitalize text-default-400">
              {user.department}
            </p>
          </div>
        );
      case "skillset":
        return (
          <div className="flex flex-col max-w-md">
            <p className="text-bold text-sm capitalize ">{cellValue}</p>
          </div>
        );
      case "leaves":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">
              {user.leavesLeft}{" "}
              <span className="text-default-400">/ {user.leavesTotal}</span>
            </p>
          </div>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Edit user">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <Pencil />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete user">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <Trash />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  let tabs = [
    // {
    //   id: "Dashboard",
    //   label: "Dashboard",
    //   content:
    //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    // },
    {
      id: "employees",
      label: "Employees",
      content: (
        <Table
          aria-label="Example table with custom cells"
          removeWrapper
          selectionMode="single"
        >
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn
                key={column.uid}
                align={column.uid === "actions" ? "center" : "start"}
              >
                {column.name}
              </TableColumn>
            )}
          </TableHeader>

          <TableBody items={users}>
            {(item) => (
              <TableRow key={item.id}>
                {(columnKey) => (
                  <TableCell>{renderCell(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      ),
    },
    {
      id: "quick-reply",
      label: "Quick Reply",
      content: (
        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-2">
            <h1 className="font-bold">HR-Gen2</h1>
            <Chip color="secondary" variant="flat">
              GPT-4
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
