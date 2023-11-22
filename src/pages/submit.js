import { useSession } from "next-auth/react";
import React, { useState } from "react";

const Submit = () => {
  const { data: sessionData } = useSession();
  const [inputValue, setInputValue] = useState("");
  const [postDetail, setPostDetail] = useState({
    title: "",
    content: "",
    rating: "",
    source: "",
    authorId: `${sessionData?.user?.id}`,
    OrgLogo: null,
    tags: [],
  });

  const handleChange = (event) => {
    const { name, value, files } = event.target;

    // Handle tags separately
    if (name === "image") {
      // Handle file input
      console.log("File selected", files[0]);
      setPostDetail({
        ...postDetail,
        image: files[0], // Assuming you only want to upload one file
      });
    } else if (name === "tags") {
      // Add your custom logic here if needed
      // For now, just set the value to the tags array
      setPostDetail({
        ...postDetail,
        tags: value.split(",").map((tag) => tag.trim()), // Assuming tags are comma-separated
      });
    } else {
      setPostDetail({
        ...postDetail,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(postDetail, "Post Detail ");
    console.log(postDetail.image, "Session Data");

    try {
      const response = await fetch("/api/postjob", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postDetail),
      });
      if (response) {
        toast.success("Post created successfully!");
        console.log(response, "Response");
      }
    } catch (error) {
      toast.error("Something went wrong, please try again!");
      console.error(error);
    }
    // close the Modal
    setIsPostModalOpen(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && inputValue.trim() !== "") {
      event.preventDefault();
      setPostDetail({
        ...postDetail,
        tags: [...postDetail.tags, inputValue.trim()],
      });
      setInputValue("");
    }
  };

  const removeTag = (indexToRemove) => {
    setPostDetail({
      ...postDetail,
      tags: postDetail.tags.filter((_, index) => index !== indexToRemove),
    });
  };

  return (
    <div className="">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col space-y-4 p-4 text-white"
      >
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={postDetail.title}
          onChange={handleChange}
          required
        />

        <textarea
          name="content"
          type="textarea"
          placeholder="Description"
          value={postDetail.content}
          onChange={handleChange}
          required
        />
        <input
          name="compensation"
          type="text"
          placeholder="Compensation"
          value={postDetail.rating}
          onChange={handleChange}
        />
        <input
          name="location"
          type="text"
          placeholder="Location"
          value={postDetail.location}
          onChange={handleChange}
        />
        <input
          name="source"
          type="text"
          placeholder="Source"
          value={postDetail.source}
          onChange={handleChange}
        />
        <input
          name="OrgLogo"
          type="file"
          accept="image/*"
          placeholder="image"
          onChange={handleChange}
        />

        <div className="flex flex-wrap gap-2 border border-gray-300 rounded-lg px-3 py-2 mt-4">
          {postDetail?.tags.map((tag, index) => (
            <div
              key={index}
              className=" rounded-lg flex items-center px-2 py-1 text-black"
            >
              <span>{tag}</span>
              <button
                type="button"
                onClick={() => removeTag(index)}
                className="ml-2 text-red-500 focus:outline-none"
              >
                &times;
              </button>
            </div>
          ))}
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter your tags"
            className="w-full bg-transparent outline-none "
            name="tags" // Add this line to specify the name of the input field
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Submit;
