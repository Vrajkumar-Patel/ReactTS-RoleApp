import { Table } from "antd";

export type UserType = {
  email: string;
  uid: string;
};

export type UserDataType = {
  uid: string;
  name: string;
  email: string;
  role: string;
  age: string;
  tasks?: string[];
};

export type taskType = {
  userId: string;
  taskKey: string;
  task: string;
};

export type AdminTableType = {
  task: string;
  key: React.Key
}

export interface UserState {
  user: UserType | undefined;
  userData: UserDataType | undefined;
  editTask: taskType | undefined;
  isAuth: boolean
}

export interface EditableRowProps {
  index: number;
}

export interface Item {
  task: string
}

export interface EditableTableState {
  dataSource: Item[];
}

export interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  children: React.ReactNode;
  dataIndex: keyof Item;
  record: Item;
  handleSave?: (record: Item) => void;
}

export type EditableTableProps = Parameters<typeof Table>[0];

export type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;

export enum Users {
    Admin = "Admin",
    Manager = "Manager",
    Customer = "Customer"
}