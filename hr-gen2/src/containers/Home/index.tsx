"use client";

import { columns } from "@/utils/egdata";
import {
  Button,
  Card,
  CardBody,
  Chip,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Popover,
  PopoverContent,
  PopoverTrigger,
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
import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import * as yup from "yup";
import { Pencil } from "../../../public/icons/pencil.jsx";
import { Trash } from "../../../public/icons/trash.jsx";
import { Reload } from "../../../public/icons/reload.jsx";

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

const addEmployee = async (
  employeeInfo: AddEmployeeValues,
  fetchEmployees: () => void
) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}users/add`,
      {
        name: employeeInfo.name,
        email: employeeInfo.email,
        department: employeeInfo.department,
        role: employeeInfo.role,
        skillset: employeeInfo.skillset,
        leavesTotal: employeeInfo.leavesTotal,
        avatar: employeeInfo.avatar,
      }
    );

    if (res.status === 200) {
      toast.success("Employee added!");
      fetchEmployees();
    }
  } catch (e) {
    toast.error("An error has occured!");
    console.log(e);
  }
};

const updateEmployee = async (
  employeeInfo: EditEmployeeValues,
  fetchEmployees: () => void
) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}users/update`,
      {
        id: employeeInfo.id,
        name: employeeInfo.name,
        email: employeeInfo.email,
        department: employeeInfo.department,
        role: employeeInfo.role,
        skillset: employeeInfo.skillset,
        leavesLeft: employeeInfo.leavesLeft,
        leavesTotal: employeeInfo.leavesTotal,
        avatar: employeeInfo.avatar,
      }
    );

    if (res.status === 200) {
      toast.success("Employee updated!");
      fetchEmployees();
    }
  } catch (e) {
    toast.error("An error has occured!");
    console.log(e);
  }
};
interface UserType {
  id: string;
  name: string;
  email: string;
  avatar: string;
  department: string;
  role: string;
  skillset: string;
  leavesLeft: string;
  leavesTotal: string;
}

interface AddEmployeeValues {
  name: string;
  email: string;
  department: string;
  role: string;
  skillset: string;
  leavesTotal: string;
  avatar: string;
}

interface EditEmployeeValues {
  id: string;
  name: string;
  email: string;
  department: string;
  role: string;
  skillset: string;
  leavesLeft: string;
  leavesTotal: string;
  avatar: string;
}

interface AddEmployeeModalProps {
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  fetchEmployees?: () => void;
}

const AddEmployeeModal: React.FC<AddEmployeeModalProps> = ({
  isOpen,
  onOpenChange,
  fetchEmployees,
}) => {
  const validationSchema = yup.object({
    name: yup.string().required("Name is required"),
    email: yup
      .string()
      .email("Enter a valid email")
      .required("Email is required"),
    department: yup.string().required("Department is required"),
    role: yup.string().required("Role is required"),
    skillset: yup.string().required("Skillsets are required"),
    leavesTotal: yup.string().required("Total leaves are required"),
  });

  const addEmployeesFormik = useFormik({
    initialValues: {
      name: "",
      email: "",
      department: "",
      role: "",
      skillset: "",
      leavesTotal: "",
      avatar: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      addEmployee(values, () => fetchEmployees?.());
      onClose();
    },
  });

  const onClose = () => {
    addEmployeesFormik.resetForm();
    onOpenChange?.(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
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
            <form
              onSubmit={addEmployeesFormik.handleSubmit}
              id="add-employee-form"
            >
              <ModalBody>
                <Input
                  autoFocus
                  label="Name"
                  variant="bordered"
                  name="name"
                  id="name"
                  value={addEmployeesFormik.values.name}
                  onChange={addEmployeesFormik.handleChange}
                  onBlur={addEmployeesFormik.handleBlur}
                  isInvalid={
                    addEmployeesFormik.touched.name &&
                    Boolean(addEmployeesFormik.errors.name)
                  }
                  errorMessage={
                    addEmployeesFormik.touched.name &&
                    addEmployeesFormik.errors.name
                  }
                  isRequired
                ></Input>
                <Input
                  label="Email"
                  variant="bordered"
                  name="email"
                  type="email"
                  id="email"
                  value={addEmployeesFormik.values.email}
                  onChange={addEmployeesFormik.handleChange}
                  onBlur={addEmployeesFormik.handleBlur}
                  isInvalid={
                    addEmployeesFormik.touched.email &&
                    Boolean(addEmployeesFormik.errors.email)
                  }
                  errorMessage={
                    addEmployeesFormik.touched.email &&
                    addEmployeesFormik.errors.email
                  }
                  isRequired
                />
                <Input
                  label="Department"
                  variant="bordered"
                  name="department"
                  id="department"
                  value={addEmployeesFormik.values.department}
                  onChange={addEmployeesFormik.handleChange}
                  onBlur={addEmployeesFormik.handleBlur}
                  isInvalid={
                    addEmployeesFormik.touched.department &&
                    Boolean(addEmployeesFormik.errors.department)
                  }
                  errorMessage={
                    addEmployeesFormik.touched.department &&
                    addEmployeesFormik.errors.department
                  }
                  isRequired
                />
                <Input
                  label="Role"
                  variant="bordered"
                  name="role"
                  id="role"
                  value={addEmployeesFormik.values.role}
                  onChange={addEmployeesFormik.handleChange}
                  onBlur={addEmployeesFormik.handleBlur}
                  isInvalid={
                    addEmployeesFormik.touched.role &&
                    Boolean(addEmployeesFormik.errors.role)
                  }
                  errorMessage={
                    addEmployeesFormik.touched.role &&
                    addEmployeesFormik.errors.role
                  }
                  isRequired
                />
                <Input
                  label="Skillsets"
                  variant="bordered"
                  name="skillset"
                  id="skillset"
                  value={addEmployeesFormik.values.skillset}
                  onChange={addEmployeesFormik.handleChange}
                  onBlur={addEmployeesFormik.handleBlur}
                  isInvalid={
                    addEmployeesFormik.touched.skillset &&
                    Boolean(addEmployeesFormik.errors.skillset)
                  }
                  errorMessage={
                    addEmployeesFormik.touched.skillset &&
                    addEmployeesFormik.errors.skillset
                  }
                  isRequired
                />
                <Input
                  label="Total leaves"
                  variant="bordered"
                  name="leavesTotal"
                  id="leavesTotal"
                  value={addEmployeesFormik.values.leavesTotal}
                  onChange={addEmployeesFormik.handleChange}
                  onBlur={addEmployeesFormik.handleBlur}
                  isInvalid={
                    addEmployeesFormik.touched.leavesTotal &&
                    Boolean(addEmployeesFormik.errors.leavesTotal)
                  }
                  errorMessage={
                    addEmployeesFormik.touched.leavesTotal &&
                    addEmployeesFormik.errors.leavesTotal
                  }
                  isRequired
                />
                <Input
                  label="Avatar Link"
                  variant="bordered"
                  name="avatar"
                  id="avatar"
                  value={addEmployeesFormik.values.avatar}
                  onChange={addEmployeesFormik.handleChange}
                  onBlur={addEmployeesFormik.handleBlur}
                  isInvalid={
                    addEmployeesFormik.touched.avatar &&
                    Boolean(addEmployeesFormik.errors.avatar)
                  }
                  errorMessage={
                    addEmployeesFormik.touched.avatar &&
                    addEmployeesFormik.errors.avatar
                  }
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="flat"
                  onPress={() => {
                    onClose();
                  }}
                >
                  Close
                </Button>
                <Button color="secondary" variant="shadow" type="submit">
                  Add
                </Button>
              </ModalFooter>
            </form>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

interface EditEmployeeModalProps {
  isOpen?: boolean;
  employeeId: string;
  employeeInfo: UserType[];
  onOpenChange?: (open: boolean) => void;
  fetchEmployees?: () => void;
}

const EditEmployeeModal: React.FC<EditEmployeeModalProps> = ({
  isOpen,
  employeeId,
  employeeInfo,
  onOpenChange,
  fetchEmployees,
}) => {
  // get employee id from list of employees
  let employee = employeeInfo.find((emp) => emp.id === employeeId);

  const validationSchema = yup.object({
    name: yup.string().required("Name is required"),
    email: yup
      .string()
      .email("Enter a valid email")
      .required("Email is required"),
    department: yup.string().required("Department is required"),
    role: yup.string().required("Role is required"),
    skillset: yup.string().required("Skillsets are required"),
    leavesLeft: yup.string().required("Leaves remaining is required"),
    leavesTotal: yup.string().required("Total leaves are required"),
  });

  const editEmployeesFormik = useFormik({
    initialValues: {
      name: "",
      email: "",
      department: "",
      role: "",
      skillset: "",
      leavesLeft: "",
      leavesTotal: "",
      avatar: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      updateEmployee({ ...values, id: employeeId }, () => fetchEmployees?.());
      onClose();
    },
  });

  React.useEffect(() => {
    if (!employee) return;
    editEmployeesFormik.setValues({
      name: employee.name,
      email: employee.email,
      department: employee.department,
      role: employee.role,
      skillset: employee.skillset,
      leavesLeft: employee.leavesLeft,
      leavesTotal: employee.leavesTotal,
      avatar: employee?.avatar,
    });
  }, [employeeId, onOpenChange]);

  const onClose = () => {
    editEmployeesFormik.resetForm();
    onOpenChange?.(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onOpenChange={onOpenChange}
      placement="top-center"
      backdrop="blur"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Edit employee: {employee!.name}
            </ModalHeader>
            <form
              onSubmit={editEmployeesFormik.handleSubmit}
              id="add-employee-form"
            >
              <ModalBody>
                <Input
                  autoFocus
                  label="Name"
                  variant="bordered"
                  name="name"
                  id="name"
                  value={editEmployeesFormik.values.name}
                  onChange={editEmployeesFormik.handleChange}
                  onBlur={editEmployeesFormik.handleBlur}
                  isInvalid={
                    editEmployeesFormik.touched.name &&
                    Boolean(editEmployeesFormik.errors.name)
                  }
                  errorMessage={
                    editEmployeesFormik.touched.name &&
                    editEmployeesFormik.errors.name
                  }
                  isRequired
                ></Input>
                <Input
                  label="Email"
                  variant="bordered"
                  name="email"
                  type="email"
                  id="email"
                  value={editEmployeesFormik.values.email}
                  onChange={editEmployeesFormik.handleChange}
                  onBlur={editEmployeesFormik.handleBlur}
                  isInvalid={
                    editEmployeesFormik.touched.email &&
                    Boolean(editEmployeesFormik.errors.email)
                  }
                  errorMessage={
                    editEmployeesFormik.touched.email &&
                    editEmployeesFormik.errors.email
                  }
                  isRequired
                />
                <Input
                  label="Department"
                  variant="bordered"
                  name="department"
                  id="department"
                  value={editEmployeesFormik.values.department}
                  onChange={editEmployeesFormik.handleChange}
                  onBlur={editEmployeesFormik.handleBlur}
                  isInvalid={
                    editEmployeesFormik.touched.department &&
                    Boolean(editEmployeesFormik.errors.department)
                  }
                  errorMessage={
                    editEmployeesFormik.touched.department &&
                    editEmployeesFormik.errors.department
                  }
                  isRequired
                />
                <Input
                  label="Role"
                  variant="bordered"
                  name="role"
                  id="role"
                  value={editEmployeesFormik.values.role}
                  onChange={editEmployeesFormik.handleChange}
                  onBlur={editEmployeesFormik.handleBlur}
                  isInvalid={
                    editEmployeesFormik.touched.role &&
                    Boolean(editEmployeesFormik.errors.role)
                  }
                  errorMessage={
                    editEmployeesFormik.touched.role &&
                    editEmployeesFormik.errors.role
                  }
                  isRequired
                />
                <Input
                  label="Skillsets"
                  variant="bordered"
                  name="skillset"
                  id="skillset"
                  value={editEmployeesFormik.values.skillset}
                  onChange={editEmployeesFormik.handleChange}
                  onBlur={editEmployeesFormik.handleBlur}
                  isInvalid={
                    editEmployeesFormik.touched.skillset &&
                    Boolean(editEmployeesFormik.errors.skillset)
                  }
                  errorMessage={
                    editEmployeesFormik.touched.skillset &&
                    editEmployeesFormik.errors.skillset
                  }
                  isRequired
                />
                <Input
                  label="Leaves remaining"
                  variant="bordered"
                  name="leavesLeft"
                  id="leavesLeft"
                  value={editEmployeesFormik.values.leavesLeft}
                  onChange={editEmployeesFormik.handleChange}
                  onBlur={editEmployeesFormik.handleBlur}
                  isInvalid={
                    editEmployeesFormik.touched.leavesLeft &&
                    Boolean(editEmployeesFormik.errors.leavesLeft)
                  }
                  errorMessage={
                    editEmployeesFormik.touched.leavesLeft &&
                    editEmployeesFormik.errors.leavesLeft
                  }
                  isRequired
                />
                <Input
                  label="Total leaves"
                  variant="bordered"
                  name="leavesTotal"
                  id="leavesTotal"
                  value={editEmployeesFormik.values.leavesTotal}
                  onChange={editEmployeesFormik.handleChange}
                  onBlur={editEmployeesFormik.handleBlur}
                  isInvalid={
                    editEmployeesFormik.touched.leavesTotal &&
                    Boolean(editEmployeesFormik.errors.leavesTotal)
                  }
                  errorMessage={
                    editEmployeesFormik.touched.leavesTotal &&
                    editEmployeesFormik.errors.leavesTotal
                  }
                  isRequired
                />
                <Input
                  label="Avatar Link"
                  variant="bordered"
                  name="avatar"
                  id="avatar"
                  value={editEmployeesFormik.values.avatar}
                  onChange={editEmployeesFormik.handleChange}
                  onBlur={editEmployeesFormik.handleBlur}
                  isInvalid={
                    editEmployeesFormik.touched.avatar &&
                    Boolean(editEmployeesFormik.errors.avatar)
                  }
                  errorMessage={
                    editEmployeesFormik.touched.avatar &&
                    editEmployeesFormik.errors.avatar
                  }
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="flat"
                  onPress={() => {
                    onClose();
                  }}
                >
                  Discard
                </Button>
                <Button color="success" variant="flat" type="submit">
                  Save
                </Button>
              </ModalFooter>
            </form>
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
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [employeeEditId, setEmployeeEditId] = useState<string>("");

  const addEmployeeModalController = useDisclosure();
  const editEmployeeModalController = useDisclosure();

  const handleInputFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputPrompt(e.target.value);
  };

  const handleGenerateBtn = async () => {
    setIsPromptGenerating(true);
    try {
      const data = await askGPT(inputPrompt);
      if (data.data) {
        setIsPromptGenerating(false);
        setOutputPrompt(data.data.response);
        toast.success("Generated!");
      }
    } catch (e: any) {
      if (e.response.status === 400) {
        toast.error("An error has occured! Try again later.");
        setIsPromptGenerating(false);
      }
    }
  };

  const deleteEmployee = async (
    employeeId: string,
    fetchEmployees: () => void
  ) => {
    setIsDeleting(true);
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}users/delete`,
        {
          id: employeeId,
        }
      );

      if (res.status === 200) {
        toast.success("Employee deleted!");
        fetchEmployees();
      }
      setIsDeleting(false);
    } catch (e) {
      toast.error("An error has occured!");
      console.log(e);
    }
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

  const handleToggleEditEmployeeModal = (employeeId: string) => {
    if (employeeId != null) {
      setEmployeeEditId(employeeId);
      editEmployeeModalController.onOpen();
    }
  };

  const handleListReload = async () => {
    try {
      const data = await getEmployees();
      if (data) {
        toast.success("Employee list refreshed!");
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
                <span
                  className="text-lg text-default-400 cursor-pointer active:opacity-50"
                  onClick={() => {
                    handleToggleEditEmployeeModal(employees.id);
                  }}
                >
                  <Pencil />
                </span>
              </Tooltip>
              <Popover placement="bottom-end">
                <PopoverTrigger>
                  <span className="text-lg text-danger cursor-pointer active:opacity-50">
                    <Trash />
                  </span>
                </PopoverTrigger>
                <PopoverContent>
                  {(titleProps) => (
                    <div className="px-1 py-4 flex flex-row space-x-5">
                      <div className="flex flex-col">
                        <h3 className="text-small font-bold" {...titleProps}>
                          Are you sure you'd want to delete?
                        </h3>
                        <div className="text-tiny">
                          There's no undoing this!
                        </div>
                      </div>
                      <Button
                        color="danger"
                        variant="ghost"
                        isLoading={isDeleting}
                        onClick={() => {
                          deleteEmployee(employees.id, fetchEmployees);
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  )}
                </PopoverContent>
              </Popover>
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
            <div className="flex items-center">
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
              <div>
                <div
                  className="bg-gray-200 p-2 rounded-md hover:bg-gray-300 group hover:cursor-pointer"
                  onClick={handleListReload}
                >
                  <Reload className="stroke-gray-500 group-hover:stroke-gray-900" />
                </div>
              </div>
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
            fetchEmployees={fetchEmployees}
          />

          <EditEmployeeModal
            isOpen={editEmployeeModalController.isOpen}
            onOpenChange={editEmployeeModalController.onOpenChange}
            fetchEmployees={fetchEmployees}
            employeeId={employeeEditId}
            employeeInfo={employees}
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
