import React from "react";

const columns = [
  { name: "ID", uid: "id" },
  { name: "NAME", uid: "name" },
  { name: "ROLE", uid: "role" },
  { name: "SKILLSET", uid: "skillset" },
  { name: "LEAVES", uid: "leaves" },
  { name: "ACTIONS", uid: "actions" },
];

const users = [
  {
    id: 1,
    name: "Owen Lee",
    role: "Software Engineer",
    department: "Engineering",
    skillset: "React.js, Node.js, MongoDB",
    leavesTotal: 15,
    leavesLeft: 5,
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    email: "owenlee22@gmail.com",
  },
  {
    id: 2,
    name: "Kai",
    role: "Software Engineer",
    department: "Product Development",
    skillset: "React.js, Node.js, MongoDB, Koa.js, Express.js, Next.js",
    leavesTotal: 20,
    leavesLeft: 5,
    avatar: "https://i.pravatar.cc/150?u=a048581f4e29026701d",
    email: "lazykai@gmail.com",
  },
  {
    id: 3,
    name: "Sand",
    role: "UI/UX Designer",
    department: "Product Development",
    skillset:
      "Figma, Adobe XD, Photoshop, Illustrator, Zeplin, Invision, Sketch, Marvel, Principle, Flinto, Origami, Protopie, After Effects, Premiere",
    leavesTotal: 20,
    leavesLeft: 5,
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    email: "sand@gmail.com",
  },
];

export { columns, users };
