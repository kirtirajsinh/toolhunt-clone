import React from "react";
import { plans } from "../../lib/utils";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { supabase } from "@/lib/supabase";

const SubmitTool = () => {
  const { router } = useRouter();
  const { data: sessionData } = useSession();
  console.log(sessionData, "sessionData in submit Tool");
  const [formData, setFormData] = React.useState({
    title: "",
    siteURL: "",
    image: null,
    description: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!formData.title || !formData.siteURL) {
      return;
    }
    const checkout = await fetch("/api/checkout", {
      method: "POST",
      body: JSON.stringify({
        itemPrice: plans[0].priceId,
        productName: plans[0].planType,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await checkout.json();
    console.log(data, "checkout from the submit tool page");
    window.location.assign(data.url);
  };

  const uploadImage = async (e) => {
    let file = e.target.files[0];
    console.log(file, "uploaded file");
    const { data, error } = await supabase.storage
      .from("images")
      .upload(sessionData?.user.id.id + "/" + file.name, file);

    if (data) {
      console.log("Image uploaded successfully", data);
      const { publicURL, error } = supabase.storage
        .from("images")
        .getPublicUrl(sessionData?.user.id.id + "/" + file.name);
    } else {
      console.log("Image upload failed", error);
    }
  };
  return (
    <>
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
    </>
  );
};

export default SubmitTool;
