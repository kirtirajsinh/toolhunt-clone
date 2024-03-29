import React, { useState } from "react";
import { plans } from "../../lib/utils";
import { useRouter } from "next/router";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import LoginButton from "../LoginButton";
import { useSession } from "next-auth/react";
import { Card } from "../ui/card";
import { Spinner } from "../ui/Spinner";
import { z } from "zod";
import { Toaster } from "../ui/toaster";
import { useToast } from "../ui/use-toast";

const PromoteTool = () => {
  const { router } = useRouter();
  const [siteLink, setSiteLink] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: sessionData } = useSession();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const mySchema = z.string().url();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!sessionData) {
      setIsModalOpen(true);
      return;
    }
    if (!siteLink) {
      return;
    }
    const validationResult = mySchema.safeParse(siteLink);
    if (!validationResult.success) {
      // Handle validation errors
      console.error(validationResult.error);
      toast({
        variant: "destructive",
        title: "Invalid Site Link,Add Link to tools in ToolHunt",
        description: validationResult.error.issues
          .map((issue) => issue.message)
          .join(", "),
      });
      return;
    }

    const url = new URL(siteLink);
    const pathname = url.pathname;

    const parts = siteLink.split("/");
    const lastSegment = parts[parts?.length - 2];
    console.log(lastSegment, "lastSegment from the submit tool page");
    const toolId = parts[parts?.length - 1];
    if (lastSegment !== "tool" || !toolId) {
      toast({
        variant: "destructive",
        title: "Invalid Site Link,Add Link to tools in ToolHunt",
        description: "Please add a valid link to the tool",
      });
      return;
    }
    console.log(toolId, "toolId from the submit tool page");

    try {
      setLoading(true);
      const checkout = await fetch("/api/promote", {
        method: "POST",
        body: JSON.stringify({
          itemPrice: plans[1].priceId,
          productName: plans[1].planType,
          toolId: toolId,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!checkout.ok) {
        // Check if the status code is 401
        if (checkout.status === 401) {
          // Show the toast message
          toast({
            variant: "destructive",
            title: "Tool Not Found",
            description: "The tool with the provided ID was not found.",
          });
        } else {
          // Handle other status codes or errors
          throw new Error("An error occurred while promoting the tool.");
        }
      } else {
        const data = await checkout.json();
        console.log(data, "checkout from the submit tool page");
        window.location.href = data.url ?? "/profile";
      }

      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
      toast({
        variant: "destructive",
        title: "Invalid Site Link,NO Tool Found",
        description: "Please add a valid link to the tool",
      });
    }
  };

  return (
    <>
      <Toaster />
      <div className="flex flex-col items-center sm:mt-32 mt-20 max-w-5xl">
        <h1 className="font-bold text-2xl tracking-wider">Promote a Tool</h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col space-y-4 mt-4 border w-full max-w-6xl md:p-16 p-4 rounded-md relative"
        >
          <label>Link to tools in ToolHunt : </label>
          <input
            required
            type="text"
            onChange={(event) => {
              setSiteLink(event.target.value);
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
            disabled={loading}
          >
            {loading ? <Spinner /> : "Promote"}
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
