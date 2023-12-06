import React, { useState } from "react";
import { plans } from "../../lib/utils";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { supabase } from "@/lib/supabase";
import { v4 as uuidv4 } from "uuid";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";

import LoginButton from "../LoginButton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

const SubmitTool = () => {
  const { router } = useRouter();
  const { data: sessionData } = useSession();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = React.useState({
    title: "",
    siteURL: "",
    image: null,
    description: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!sessionData) {
      setIsModalOpen(true);
      return;
    }

    if (
      !formData.title ||
      !formData.siteURL ||
      !formData.image ||
      !formData.description
    ) {
      return;
    }
    try {
      setLoading(true);
      const checkout = await fetch("/api/checkout", {
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
      setFormData({ ...formData, image: data.publicUrl });
    } else {
      console.log("Image upload failed", error);
    }
  };
  return (
    <>
      <Toaster />
      <div className="flex flex-col items-center sm:mt-32 mt-20">
        <h1 className="font-bold text-2xl tracking-wider">Submit a Tool</h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col space-y-4 mt-4 border w-full max-w-6xl md:p-16 p-4 rounded-md"
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
            value={formData.description}
            onChange={(event) => {
              setFormData({ ...formData, description: event.target.value });
            }}
            className="p-2 rounded-md border-[1px] border-[#0eca90] bg-transparent"
          ></textarea>
          <label>Site URL:</label>
          <input
            required
            type="text"
            value={formData.siteURL}
            onChange={(event) => {
              setFormData({ ...formData, siteURL: event.target.value });
            }}
            className="p-2 rounded-md border-[1px] border-[#0eca90] bg-transparent"
          ></input>
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
            Submit
          </button>
        </form>
      </div>
      <Dialog
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onClose={(event) => event.preventDefault()}
      >
        <DialogTrigger>Open</DialogTrigger>
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
