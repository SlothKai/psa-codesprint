"use client";

import {
  Button,
  Card,
  CardBody,
  Checkbox,
  Chip,
  ChipProps,
  Input,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
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
  useDisclosure,
} from "@nextui-org/react";
import toast from "react-hot-toast";
import { columns } from "@/utils/egdata";
import React, { useEffect, useState } from "react";
import { Pencil } from "../../../public/icons/pencil.jsx";
import { Trash } from "../../../public/icons/trash.jsx";
import axios from "axios";
import { Field, Form, Formik, FormikHelpers } from "formik";
require("dotenv").config();

const askGPT = async (message: string) => {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}prompt`,
    {
      message: message,
    }
    // { withCredentials: true }
  );

  return res;
};

const getEmployees = async () => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}users`);

  return res;
};

interface AddEmployeeValues {
  lastName: string;
  email: string;
}
interface AddEmployeeModalProps {
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const AddEmployeeModal: React.FC<AddEmployeeModalProps> = ({
  isOpen,
  onOpenChange,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="top-center"
      backdrop="blur"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Add new employee
            </ModalHeader>
            <Formik
              initialValues={{
                lastName: "",
                email: "asdasdas",
              }}
              onSubmit={(
                values: AddEmployeeValues,
                { setSubmitting }: FormikHelpers<AddEmployeeValues>
              ) => {
                setTimeout(() => {
                  alert(JSON.stringify(values, null, 2));
                  setSubmitting(false);
                }, 500);
              }}
            >
              <Form>
                <ModalBody>
                  <Input autoFocus label="Name" variant="bordered" />
                  <Input
                    label="Email"
                    variant="bordered"
                    name="email"
                    type="email"
                  />
                  <Input label="Department" variant="bordered" />
                  <Input label="Role" variant="bordered" />
                  <Input label="Skillsets" variant="bordered" />
                  <Input label="Total leaves" variant="bordered" />
                  <Input label="Avatar Link" variant="bordered" />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="flat" onPress={onClose}>
                    Close
                  </Button>
                  <Button color="secondary" variant="shadow" onPress={onClose}>
                    Add
                  </Button>
                </ModalFooter>
              </Form>
            </Formik>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

const Home = () => {
  const [isPromptGenerating, setIsPromptGenerating] = useState<boolean>(false);
  const [inputPrompt, setInputPrompt] = useState<string>("");
  const [outputPrompt, setOutputPrompt] = useState<string>("");
  const [employees, setEmployees] = useState<UserType[]>([]);

  const addEmployeeModalController = useDisclosure();

  interface UserType {
    id: number;
    name: string;
    email: string;
    avatar: string;
    department: string;
    role: string;
    skillset: string;
    leavesLeft: number;
    leavesTotal: number;
  }

  const handleInputFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputPrompt(e.target.value);
  };

  const handleGenerateBtn = async () => {
    setIsPromptGenerating(true);
    try {
      const data = await askGPT(inputPrompt);

      if (data) {
        setIsPromptGenerating(false);
        setOutputPrompt(data.data.response);
        toast.success("Generated!");
      }
    } catch {}
  };

  const fetchEmployees = async () => {
    try {
      const data = await getEmployees();

      if (data) {
        setEmployees(data.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const renderCell = React.useCallback(
    (employees: UserType, columnKey: React.Key) => {
      const cellValue = employees[columnKey as keyof UserType];

      switch (columnKey) {
        case "id":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">{employees.id}</p>
            </div>
          );
        case "name":
          return (
            <User
              avatarProps={{ radius: "lg", src: employees.avatar }}
              description={employees.email}
              name={cellValue}
            >
              {employees.email}
            </User>
          );
        case "role":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">{cellValue}</p>
              <p className="text-bold text-sm capitalize text-default-400">
                {employees.department}
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
                {employees.leavesLeft}{" "}
                <span className="text-default-400">
                  / {employees.leavesTotal}
                </span>
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
    },
    []
  );

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
        <>
          <div className="flex flex-col space-y-5">
            <div className="mr-auto">
              <Button
                color="secondary"
                variant="flat"
                className="w-fit"
                onClick={addEmployeeModalController.onOpen}
              >
                Add Employee
              </Button>
            </div>
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

              <TableBody items={employees}>
                {(item) => (
                  <TableRow key={item.id}>
                    {(columnKey) => (
                      <TableCell>{renderCell(item, columnKey)}</TableCell>
                    )}
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <AddEmployeeModal
            isOpen={addEmployeeModalController.isOpen}
            onOpenChange={addEmployeeModalController.onOpenChange}
          />
        </>
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
            onChange={handleInputFieldChange}
          />
          <Textarea
            placeholder=""
            width="100%"
            maxRows={999}
            label="Output"
            readOnly={true}
            value={outputPrompt}
          />
          <Button
            color="secondary"
            variant="shadow"
            onClick={() => {
              handleGenerateBtn();
            }}
            isLoading={isPromptGenerating}
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
