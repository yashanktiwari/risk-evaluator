"use client";
import dynamic from "next/dynamic";
import { useState } from "react";
const ReactQuill = dynamic(
  () => {
    return Promise.all([
      import("react-quill"),
      import("react-quill/dist/quill.snow.css"),
    ]).then(([module]) => module);
  },
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  }
);
import axios from "axios";
import AdminHeader from "@components/AdminHeader";

const AddNewArticle = () => {
  const [content, setContent] = useState("");

  const [title, setTitle] = useState("");
  const [tag, setTag] = useState("");

  var toolbarOptions = [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],

    // [{ header: 1 }, { header: 2 }], // custom button values
    // [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction

    // [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    // [{ 'font': [] }],
    [{ align: [] }],

    // ['image'],

    ["clean"], // remove formatting button
  ];

  const module = {
    toolbar: toolbarOptions,
  };

  const handleAddNewArticle = async () => {
    try {
      const res = await axios.post("/api/addnewarticle", { title, content });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <AdminHeader />
      <div className="w-full flex justify-center py-4">
        <span className="text-2xl font-semibold">Add New Article</span>
      </div>

      <div className="mx-10">
        <div className="border border-gray-400 rounded-md p-2 w-full bg-gray-100 my-2">
          <label htmlFor="title" className="mr-3">Title : </label>
          <input
            type="text"
            name="title"
            id="title"
            className="w-[55rem] bg-gray-100"
            placeholder="Enter your title..."
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>

        <div className="border border-gray-400 rounded-md p-2 w-full bg-gray-100 my-2">
          <label htmlFor="title" className="mr-3">Tag : </label>
          <input
            type="text"
            name="title"
            id="title"
            className="w-[55rem] bg-gray-100"
            placeholder="Enter your title..."
            value={tag}
            onChange={(e) => {
              setTag(e.target.value);
            }}
          />
        </div>

        <div className="mt-5">
          {ReactQuill && (
            <ReactQuill
            style={{
              overflow: 'auto',
            }}
              modules={module}
              theme="snow"
              value={content}
              onChange={setContent}
            />
          )}
        </div>
      </div>
      <div className="mx-10 mt-5 flex justify-end">
        <button type="submit" className="border border-gray-400 p-2 px-5 bg-emerald-800 rounded-md text-white" onClick={handleAddNewArticle}>
          Add new article
        </button>
      </div>

      {/* {cont/ent} */}
    </>
  );
};

export default AddNewArticle;
