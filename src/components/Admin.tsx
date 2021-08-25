// import { Button, FormInstance, Input, Table } from "antd";
// import { Form } from "antd";
// import React, { useContext, useEffect, useRef, useState } from "react";
// import { Redirect } from "react-router-dom";
// import {
//   AdminTableType,
//   ColumnTypes,
//   EditableCellProps,
//   EditableRowProps,
//   EditableTableProps,
//   EditableTableState,
//   UserDataType,
// } from "../types";
// // import EditableRow from "./EditableRow";
// // import EditableCell from "./EditableCell";

// // const EditableContext = React.createContext();
// // interface Props {
// //   EditableTableProps: EditableTableProps;
// //   EditableTableState: EditableTableState;
// // }

// // -----------------------------EditableRow------------------------------------

// export const EditableContext = React.createContext<FormInstance<any> | null>(null);

// const EditableRow:React.FC<EditableRowProps> = ({index, ...props}) => {
//     const [form] = Form.useForm();
//   return (
//     <Form form={form} component={false}>
//       <EditableContext.Provider value={form}>
//         <tr {...props} />
//       </EditableContext.Provider>
//     </Form>
//   );
// }

// // ------------------------------EditableCell---------------------------------------

// const EditableCell: React.FC<EditableCellProps> = ({
//     title,
//     editable,
//     children,
//     dataIndex,
//     record,
//     handleSave,
//     ...restProps
//   }) => {
//     const [editing, setEditing] = useState(false);
//     const inputRef = useRef<Input>(null);
//     const form = useContext(EditableContext)!;
  
//     useEffect(() => {
//       if (editing) {
//         inputRef.current!.focus();
//       }
//     }, [editing]);
  
//     const toggleEdit = () => {
//       setEditing(!editing);
//       form.setFieldsValue({ [dataIndex]: record[dataIndex] });
//     };
  
//     const save = async () => {
//       try {
//         const values = await form.validateFields();
  
//         toggleEdit();
//         handleSave({ ...record, ...values });
//       } catch (errInfo) {
//         console.log("Save failed:", errInfo);
//       }
//     };
  
//     let childNode = children;
  
//     if (editable) {
//       childNode = editing ? (
//         <Form.Item
//           style={{ margin: 0 }}
//           name={dataIndex}
//           rules={[
//             {
//               required: true,
//               message: `${title} is required.`,
//             },
//           ]}
//         >
//           <Input ref={inputRef} onPressEnter={save} onBlur={save} />
//         </Form.Item>
//       ) : (
//         <div
//           className="editable-cell-value-wrap"
//           style={{ paddingRight: 24 }}
//           onClick={toggleEdit}
//         >
//           {children}
//         </div>
//       );
//     }
  
//     return <td {...restProps}>{childNode}</td>;
//   };

// // --------------------------------Admin------------------------------

// const Admin: React.FC = () => {
//     const [taskTableData, setTaskTableData] = useState<AdminTableType[] | undefined>([]);
//     const [count, setCount] = useState<number>(0);

//   const handleAddTask = () => {
//     const newData: AdminTableType = {
//         task: "Enter Your Task Here",
//         key: count
//     };
//       setTaskTableData([...taskTableData!, newData]);
//       setCount(count + 1)
//   };

//   const components = {
//     body: {
//       row: EditableRow,
//       cell: EditableCell,
//     },
//   };

//   const totalColumns = [
//     {
//       title: "Task",
//       dataIndex: "task",
//       key: "task",
//       width: "50%",
//       editable: true,
//     },
//     {
//       title: "Delete",
//       key: "delete",
//       render: (record: { key: React.Key }) => (
//         <Button
//           type="primary"
//           style={{ background: "red", border: "none" }}
//           onClick={() => handleDelete(record.key)}
//         >
//           Delete
//         </Button>
//       ),
//     },
//   ];

//   const columns = totalColumns.map((col) => {
//     if (!col.editable) {
//       return col;
//     }
//     return {
//       ...col,
//       onCell: (record: { task: string }) => ({
//         record,
//         editable: col.editable,
//         dataIndex: col.dataIndex,
//         title: col.title,
//         handleSave: { handleSave },
//       }),
//     };
//   });

//     const handleDelete = (key: React.Key) => {
//         const dataSource = [...taskTableData!];
//         setTaskTableData(dataSource.filter((item) => item.key !== key ))
//     };
    
//     const handleSave = (row: AdminTableType) => {
//         const newData = [...taskTableData!]
//         const index = newData.findIndex(item => row.key === item.key)
//         const item = newData[index]
//         newData.splice(index, 1, {
//             ...item,
//             ...row
//         })
//         setTaskTableData(newData)
//     }

//   const user: UserDataType = JSON.parse(localStorage.getItem("user")!);
//   if (!user) {
//     return <Redirect to="/" />;
//   }

//   return (
//     <div className="admin">
//       <Button type="primary" onClick={handleAddTask}>
//         Add Task
//       </Button>
//       <Table
//         dataSource={taskTableData}
//         bordered
//         columns={columns}
//         components={components}
//       />
//     </div>
//   );
// };

// export default Admin;
import React from 'react'

const Admin = () => {
    return (
        <div>
            
        </div>
    )
}

export default Admin
