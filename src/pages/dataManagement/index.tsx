import React, { useState, useEffect } from "react";
import { Space, Table, Tag } from "antd";
import type { TableProps } from "antd";
// import { Link, Outlet } from "umi";
import styles from "./index.less";

interface DataType {
  key: string;
  title: string;
  author:string,
  time: string,
  tags: string[];
}

const columns: TableProps<DataType>["columns"] = [
  {
    title: "标题",
    dataIndex: "title",
    key: "title",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "作者",
    dataIndex: "author",
    key: "author",
  },
  {
    title: "时间",
    dataIndex: "time",
    key: "time",
  },
  {
    title: "标签",
    key: "tags",
    dataIndex: "tags",
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? "geekblue" : "green";
          if (tag === "hot") {
            color = "volcano";
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        {/* <a>Invite {record.title}</a> */}
        <a>删除</a>
      </Space>
    ),
  },
];

const data: DataType[] = [
  {
    key: '1',
    title: '2022年数据总结',
    author:'admin',
    time: '2022/12/31 20:22:00',
    tags: ["hot"],
  },
  {
    key: '1',
    title: '2023年数据总结',
    author:'admin',
    time: '2023/12/31 20:23:00',
    tags: ["hot"],
  },
  {
    key: '1',
    title: '2024年数据总结',
    author:'admin',
    time: '2024/12/31 20:24:00',
    tags: ["new"],
  },
];

const DataManagement: React.FC = () => (
  <div className={styles["dataManagement"]}>
    <h1>数据管理</h1>
    <Table<DataType> columns={columns} dataSource={data} />
  </div>
);

export default DataManagement;
