import React, { useState } from "react";
import { plans } from "../../lib/utils";
import { useRouter } from "next/router";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import LoginButton from "../LoginButton";
import { useSession } from "next-auth/react";

const PromoteTool = () => {
  const { router } = useRouter();
  const [formData, setFormData] = React.useState({
    name: "",
    siteURL: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: sessionData } = useSession();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!sessionData) {
      setIsModalOpen(true);
      return;
    }
    if (!formData.name || !formData.siteURL) {
      return;
    }
    const checkout = await fetch("/api/checkout", {
      method: "POST",
      body: JSON.stringify({
        itemPrice: plans[1].priceId,
        productName: plans[1].planType,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await checkout.json();
    console.log(data, "checkout from the submit tool page");
    window.location.assign(data.url);
  };
  return (
    <>
      <div className="flex flex-col items-center sm:mt-32 mt-20">
        <h1 className="font-bold text-2xl tracking-wider">Promote a Tool</h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col space-y-4 mt-4 border w-full max-w-6xl md:p-16 p-4 rounded-md"
        >
          <label>Name:</label>
          <input
            required
            type="text"
            value={formData.name}
            onChange={(event) => {
              setFormData({ ...formData, name: event.target.value });
            }}
            className="p-2 rounded-md border-[1px] border-[#0eca90] bg-transparent"
          ></input>
          <label>Site URL:</label>
          <input
            required
            type="text"
            onChange={(event) => {
              setFormData({ ...formData, siteURL: event.target.value });
            }}
            className="p-2 rounded-md border-[1px] border-[#0eca90] bg-transparent "
          ></input>
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
      <Dialog
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onClose={(event) => event.preventDefault()}
      >
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Login</DialogTitle>
            <DialogDescription>Login to Promote your AI Tool</DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <LoginButton />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PromoteTool;
