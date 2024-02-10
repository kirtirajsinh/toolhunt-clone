import React, { useEffect, useRef, useState } from "react";
import { plans } from "../../lib/utils";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { supabase } from "@/lib/supabase";
import { v4 as uuidv4 } from "uuid";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { useDebounce } from "@uidotdev/usehooks";
import LoginButton from "../LoginButton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useTools } from "../hooks/tools";
import { Card } from "../ui/card";
import { z } from "zod";
import { Spinner } from "../ui/Spinner";

const SubmitTool = () => {
  const { router } = useRouter();
  const { data: sessionData } = useSession();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [tagsInputValue, setTagInputValue] = useState("");
  // const categories = useTools((state) => state.categories);
  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState([]);
  const categoryInputRef = useRef("");
  const tagInputRef = useRef("");
  const [showCategories, setShowCategories] = useState(false);
  const [showTags, setShowTags] = useState(false);
  const cardRef = useRef(null);
  const tagsCardRef = useRef(null);
  const debouncedSearchTags = useDebounce(tagsInputValue, 500);
  const debouncedSearchCategories = useDebounce(inputValue, 500);
  const [formData, setFormData] = React.useState({
    title: "",
    source: "",
    imageUrl: null,
    content: "",
    categories: [],
    tags: [],
  });

  const mySchema = z.object({
    title: z.string().min(1).max(255),
    source: z.string().url(),
    imageUrl: z.string().url(),
    content: z.string().min(1).max(10000),
    categories: z.array(z.string().min(1)),
    tags: z.array(z.string().min(1)),
  });

  useEffect(() => {
    const searchTags = async () => {
      let results = [];
      if (debouncedSearchCategories) {
        const data = await fetch("/api/findCategories", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title: debouncedSearchCategories }),
        });
        const response = await data.json();
        results = response;
        console.log(response);
      }

      setCategories(results);
    };

    searchTags();
  }, [debouncedSearchCategories, setCategories]);

  useEffect(() => {
    const searchTags = async () => {
      let results = [];
      if (debouncedSearchTags) {
        const data = await fetch("/api/findTags", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title: debouncedSearchTags }),
        });
        const response = await data.json();
        results = response;
        console.log(response);
      }

      setTags(results);
    };

    searchTags();
  }, [debouncedSearchTags, setTags]);

  const handleKeyDown = (event, variant) => {
    console.log(variant, "variant from the handleKeyDown");
    if (
      event.key === "Enter" &&
      (inputValue.trim() !== "" || tagsInputValue.trim() !== "")
    ) {
      event.preventDefault();
      // setCategories([...categories, inputValue.trim()]);
      console.log("enter pressed", inputValue);
      // add the value of the tags to the formData
      if (variant === "tag") {
        setFormData({
          ...formData,
          tags: [...formData.tags, tagsInputValue.trim()],
        });
        setTagInputValue("");
      } else if (variant === "category") {
        setFormData({
          ...formData,
          categories: [...formData.categories, inputValue.trim()],
        });
        setInputValue("");
      }
    }
  };

  const removeCategory = (indexToRemove) => {
    // setCategories([
    //   ...categories.filter((_, index) => index !== indexToRemove),
    // ]);
    // remove the value of the tags to the formData
    setFormData({
      ...formData,
      categories: [
        ...formData.categories.filter((_, index) => index !== indexToRemove),
      ],
    });
  };

  const removeTag = (indexToRemove) => {
    setFormData({
      ...formData,
      tags: [...formData.tags.filter((_, index) => index !== indexToRemove)],
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!sessionData) {
      setIsModalOpen(true);
      return;
    }

    if (
      !formData.title ||
      !formData.source ||
      !formData.imageUrl ||
      !formData.content ||
      !formData.categories ||
      !formData.tags
    ) {
      return;
    }
    const validationResult = mySchema.safeParse(formData);

    if (!validationResult.success) {
      // Handle validation errors
      console.error(validationResult.error);
      toast({
        variant: "destructive",
        title: "Invalid Input",
        description: validationResult.error.issues
          .map((issue) => issue.message)
          .join(", "),
      });
      return;
    }

    try {
      setLoading(true);
      const checkout = await fetch("/api/addTool", {
        method: "POST",
        body: JSON.stringify({ formData }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await checkout.json();
      console.log(data);
      if (data) {
        toast({
          title: "Tool Submitted SucessFully",
        });
      }
      setLoading(false);
    } catch (e) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
      console.log(e);
      setLoading(false);
    }
    setLoading(false);
  };

  const uploadImage = async (e) => {
    if (!sessionData) {
      setIsModalOpen(true);
      return;
    }
    setLoading(true);
    let file = e.target.files[0];
    console.log(file, "uploaded file");
    const uniqueID = uuidv4();
    const { data: imageUploaded, error } = await supabase.storage
      .from("images")
      .upload(sessionData?.user.id.id + "/" + uniqueID, file);

    if (imageUploaded) {
      // get image URL
      const { data } = supabase.storage
        .from("images")
        .getPublicUrl(`${sessionData?.user.id.id}/${uniqueID}`);

      console.log(data.publicUrl, "image URL");
      setFormData({ ...formData, imageUrl: data.publicUrl });
      setLoading(false);
    } else {
      console.log("Image upload failed", error);
    }
  };
  const handleCategorySelect = (category) => {
    const updatedCategories = [...formData.categories];

    if (updatedCategories.includes(category)) {
      // If category is already selected, remove it
      updatedCategories.splice(updatedCategories.indexOf(category), 1);
    } else {
      // If category is not selected, add it
      updatedCategories.push(category);
    }

    setFormData({
      ...formData,
      categories: updatedCategories,
    });
  };

  const handleTagSelect = (tag) => {
    const updatedTags = [...formData.tags];
    if (updatedTags.includes(tag)) {
      // If tag is already selected, remove it
      updatedTags.splice(updatedTags.indexOf(tag), 1);
    } else {
      // If tag is not selected, add it
      updatedTags.push(tag);
    }
    setFormData({
      ...formData,
      tags: updatedTags,
    });
  };

  // const handleClickOutside = (event) => {
  //   console.log(event, "event from the handleClickOutside");
  //   if (
  //     cardRef.current &&
  //     !categoryInputRef.current.contains(event.target) &&
  //     !cardRef.current.contains(event.target)
  //   ) {
  //     setShowCategories(false);
  //   }
  //   if (
  //     tagsCardRef.current &&
  //     tagInputRef.current.contains(event.target) &&
  //     !tagsCardRef.current.contains(event.target)
  //   ) {
  //     setShowTags(false);
  //   }
  // };
  const handleClickOutside = (event) => {
    if (
      cardRef.current &&
      !cardRef.current.contains(event.target) &&
      !categoryInputRef.current.contains(event.target)
    ) {
      setShowCategories(false);
    }

    if (
      tagsCardRef.current &&
      !tagsCardRef.current.contains(event.target) &&
      !tagInputRef.current.contains(event.target)
    ) {
      setShowTags(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  return (
    <>
      <Toaster />
      <div className="flex flex-col items-center sm:mt-32 mt-20">
        <h1 className="font-bold text-2xl tracking-wider">Submit a Tool</h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col relative space-y-4 mt-4 border w-full max-w-6xl md:p-16 p-4 rounded-md"
        >
          <label>Title: </label>
          <input
            required
            type="text"
            value={formData.title}
            onChange={(event) => {
              setFormData({ ...formData, title: event.target.value });
            }}
            className="p-2 rounded-md  border-[1px] border-[#0eca90] bg-transparent "
          ></input>
          <label>Add Description: </label>
          <textarea
            required
            type="text"
            value={formData.content}
            onChange={(event) => {
              setFormData({ ...formData, content: event.target.value });
            }}
            className="p-2 rounded-md border-[1px] border-[#0eca90] bg-transparent"
          ></textarea>
          <label>Site URL:</label>
          <input
            required
            type="text"
            value={formData.source}
            onChange={(event) => {
              setFormData({ ...formData, source: event.target.value });
            }}
            className="p-2 rounded-md border-[1px] border-[#0eca90] bg-transparent"
          ></input>
          <label className="relative">Add Category</label>
          {formData.categories.length > 0 && (
            <div className="flex flex-wrap gap-2 border border-gray-300 rounded-lg px-3 py-2 mt-4">
              {formData.categories.map((tag, index) => (
                <div
                  key={index}
                  className="bg-gray-200 rounded-lg flex flex-row items-center px-2 py-1 text-black"
                >
                  <span>{tag}</span>
                  <button
                    type="button"
                    onClick={() => removeCategory(index)}
                    className="ml-2 text-red-500 focus:outline-none"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          )}
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, "category")}
            placeholder="Add Categories"
            ref={categoryInputRef}
            onFocus={() => setShowCategories(true)}
            className="p-2 rounded-md border-[1px] border-[#0eca90] bg-transparent relative"
          />
          {showCategories && categories.length > 0 && (
            <Card
              ref={cardRef}
              className="no-scrollbar z-10 flex flex-wrap gap-2 absolute inset-x-6 bottom-32 md:bottom-36    border rounded-lg px-3 py-2  h-32 overflow-scroll bg-secondary-background rounded shadow-md"
            >
              {categories.map((category) => (
                <div key={category.id} className="space-x-2">
                  <input
                    type="checkbox"
                    id={category.id}
                    checked={formData.categories.includes(category.title)}
                    onChange={() => handleCategorySelect(category.title)}
                  />
                  <label htmlFor={category.title}>{category.title}</label>
                </div>
              ))}
            </Card>
          )}
          <label>Add Tags</label>

          {formData.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 border border-gray-300 rounded-lg px-3 py-2 mt-4">
              {formData.tags.map((tag, index) => (
                <div
                  key={index}
                  className="bg-gray-200 rounded-lg flex flex-row items-center px-2 py-1 text-black"
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
            </div>
          )}
          <input
            type="text"
            value={tagsInputValue}
            onChange={(e) => setTagInputValue(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, "tag")}
            placeholder="Add Tags"
            ref={tagInputRef}
            onFocus={() => setShowTags(true)}
            className="p-2 rounded-md border-[1px] border-[#0eca90] bg-transparent relative"
          />
          {showTags && tags.length > 0 && (
            <Card
              ref={tagsCardRef}
              className="no-scrollbar z-10 flex flex-wrap gap-2 absolute inset-x-6 bottom-4 md:bottom-10    border rounded-lg px-3 py-2  h-32 overflow-scroll bg-secondary-background rounded shadow-md"
            >
              {tags.map((tag) => (
                <div key={tag.id} className="space-x-2">
                  <input
                    type="checkbox"
                    id={tag.id}
                    checked={formData.tags.includes(tag.title)}
                    onChange={() => handleTagSelect(tag.title)}
                  />
                  <label htmlFor={tag.title}>{tag.title}</label>
                </div>
              ))}
            </Card>
          )}
          <label>
            Add Image:
            <input
              required
              type="file"
              accept="image/*"
              onChange={(event) => {
                uploadImage(event);
              }}
              className="p-2 rounded-md border-[1px] border-[#0eca90] bg-transparent"
            ></input>
          </label>
          <button
            disabled={loading}
            type="submit"
            className="p-2 px-4 w-fit self-center rounded-md 
              "
            style={{
              background: "var(--primary-button)",
            }}
          >
            {loading ? <Spinner /> : "Submit"}
          </button>
        </form>
      </div>
      <Dialog
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onClose={(event) => event.preventDefault()}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Login</DialogTitle>
            <DialogDescription>Login to Submit your AI Tool</DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <LoginButton />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SubmitTool;
