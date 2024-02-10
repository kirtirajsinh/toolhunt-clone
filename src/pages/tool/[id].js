import { useTools } from "@/components/hooks/tools";
import ExploreToolCard from "@/components/landingpage/ExploreToolCard";
import HeartIcon from "@/components/ui/HeartIcon";
import ShareButton from "@/components/ui/ShareButton";
import { Button } from "@/components/ui/button";
import { AIData } from "@/lib/AIToolsData";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import LoginButton from "@/components/LoginButton";
import { useSession } from "next-auth/react";
import { DislikePost, LikeTool } from "@/lib/utils";
import Link from "next/link";
import SimilarTools from "@/components/product/SimilarTools";
import { HiOutlineDotsVertical } from "react-icons/hi";

const Tool = ({ tool, alreadyLiked, similarProducts, toolCreator }) => {
  const router = useRouter();
  const { id: toolId } = router.query;
  console.log(tool.postCategories, "tool Data");
  const tools = useTools((state) => state.tools);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: sessionData } = useSession();
  console.log(tools, "tools from the global state");
  console.log(similarProducts, "similarProducts");
  const [isLiked, setIsLiked] = React.useState(alreadyLiked);
  const [optionsVisible, setOptionsVisible] = useState(false);
  const optionsRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const Like = async () => {
    console.log("Liking or disliking tool");
    if (!sessionData) {
      setIsModalOpen(true);
      return;
    }
    setIsLiked(true);
    toast({
      title: "Tool Liked SucessFully",
    });
    const like = await LikeTool(toolId);
    console.log(like, "like from like function");
  };

  const disLike = async () => {
    if (!sessionData) {
      setIsModalOpen(true);
      return;
    }
    setIsLiked(false);
    toast({
      title: "Tool Disliked ",
    });
    const dislike = await DislikePost(toolId);
    console.log(dislike, "dislike from dislike function");
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (optionsRef.current && !optionsRef.current.contains(event.target)) {
        setOptionsVisible(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [optionsRef]);

  const handleDelete = async () => {
    console.log("deleting tool");
    if (!sessionData) {
      setIsModalOpen(true);
      return;
    }
    try {
      setLoading(true);
      const deleteTool = await fetch("/api/deleteTool", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ toolId, authorId: tool.authorId }),
      });
      const response = await deleteTool.json();
      console.log(response, "response from delete tool");
      router.push("/profile");
      toast({
        title: "Tool Deleted SuccessFully",
      });
      setLoading(false);
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster />
      <div className="flex flex-col mt-12 mb-4 max-w-5xl mx-auto w-full px-6 lg:px-0  min-h-screen">
        <div className="flex flex-row md:flex-row md:items-center justify-between">
          <div className="flex flex-row  items-center space-x-12">
            <p className="md:text-5xl text-2xl font-bold">{tool?.title}</p>
            <Button
              onClick={() => window.open(`${tool.source}`, "_blank")}
              className="font-semibold flex gap-2 items-center rounded-full hover:shadow-md px-6 md:px-8 py-2 bg-gradient-to-r from-[#0eca90] to-[#11c2b6]  bg-clip-text text-transparent border-[1px] border-[#0eca90] hover:bg-transparent hover:text-[#0eca90]"
            >
              Visit Site{" "}
            </Button>
            <button onClick={isLiked ? disLike : Like}>
              <HeartIcon isLiked={isLiked} />
            </button>
          </div>
          <div className="flex flex-row items-center space-x-2">
            <ShareButton
              title={tool?.title}
              url={
                // share the current url
                `https://toolhunt.ai/tool/${tool?.id}`
              }
            />
            {toolCreator && (
              <button onClick={() => setOptionsVisible(true)}>
                <HiOutlineDotsVertical className="h-20 w-6" />
              </button>
            )}
            {optionsVisible && (
              <div
                className="absolute mt-28  w-32 bg-secondary-background rounded-lg border border-border  shadow-lg z-10 "
                onClick={(e) => e.stopPropagation()}
                ref={optionsRef}
              >
                <div className="py-1">
                  <button
                    disabled={loading}
                    onClick={handleDelete}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-primary-foreground"
                  >
                    {loading ? "Deleting.." : "Delete Tool"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        <p className="text-secondary-text mt-3">
          Unlock Productivity with 5260+ AI tools & growing{" "}
        </p>
        <div className="flex flex-col  md:flex-row md:space-x-32  mt-8 ">
          <Image
            src={tool.imageUrl}
            width={200}
            height={200}
            className="h-80 w-96 object-cover rounded"
            alt={tool.title}
          />
          <div className="flex flex-col   mt-3">
            <p className="md:text-2xl text-xl">What is {tool?.title}?</p>
            <p className="text-sm text-secondary-text leading-6 mt-3 ">
              {tool?.content}
            </p>
            <hr className="border-secondary-border my-6" />
            <div className="flex gap-1 items-center mb-6">
              <Image
                src="/icons/bullet-point.svg"
                width={12}
                height={12}
                alt=""
                className="w-2 h-2"
              />
              <span className="font-light text-sm">
                Added on {tool?.createdAt}
              </span>
            </div>

            <div className="flex  md:flex-row flex-wrap mt-3">
              {tool.postCategories?.map((category, key) => {
                return (
                  <Link
                    href={`/category/${category.title}`}
                    key={key}
                    className="  bg-secondary-background hover:bg-secondary-foreground rounded-full px-3 py-1 text-xs font-semibold rounded border  mr-2 mb-2"
                  >
                    {category.title}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
        <SimilarTools tools={similarProducts} />
      </div>
      <Dialog
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onClose={(event) => event.preventDefault()}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Login</DialogTitle>
            <DialogDescription>Login to Like the Tool</DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <LoginButton />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Tool;

export async function getServerSideProps(context) {
  const toolId = context.query.id;
  const session = await getServerSession(context.req, context.res, authOptions);
  console.log(toolId, "toolId from getServerProps");

  if (!toolId) {
    return {
      props: {
        error: "Tool id is required",
      },
    };
  }

  const getTool = async () => {
    try {
      const tool = await prisma.post.findUnique({
        where: {
          id: toolId,
        },
        include: {
          postCategories: true,
          postTags: true,
        },
      });
      return tool;
    } catch (e) {
      console.error(e);
      return {};
    }
  };

  const existingLike = async () => {
    try {
      if (!session) return null;
      const url =
        process.env.NODE_ENV === "production"
          ? "https://toolhunt-tau.vercel.app"
          : "http://localhost:3000";
      const response = await fetch(`${url}/api/existinglike`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          toolId: toolId,
          userId: session.user.id.id,
        }),
      });
      const data = await response.json();
      console.log(data, "exising Like data");
      return data;
    } catch (error) {
      console.error(error);
    }
  };
  const similarTools = async () => {
    try {
      const tools = await prisma.post.findMany({
        where: {
          postTags: {
            some: {
              id: {
                in: tool.postTags.map((category) => category.id),
              },
            },
          },
          id: {
            not: tool.id,
          },
        },
        orderBy: [
          {
            promotedUntil: "asc",
          },
          {
            likes: {
              _count: "desc",
            },
          },
          // promoted in the future will be added here
        ],
        include: {
          postTags: true, // Include tags in the result if needed
          postCategories: true, // Include categories in the result if needed
          likes: session
            ? {
                where: {
                  userId: session?.user?.id?.id, // Filter likes to only include those by the current user
                },
                select: {
                  id: true, // Select only the fields you need, for example, the ID
                },
              }
            : false,
        },
        take: 10,
      });
      return tools;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const tool = await getTool();
  const isLiked = await existingLike();
  const similarProducts = await similarTools();
  console.log(similarProducts, "similar products");
  const toolCreator = tool?.authorId === session?.user?.id?.id ? true : false;
  console.log(toolCreator, "toolCreator");
  return {
    props: {
      tool: JSON.parse(JSON.stringify(tool)),
      alreadyLiked: isLiked ? true : false,
      similarProducts: JSON.parse(JSON.stringify(similarProducts)),
      toolCreator: toolCreator,
    },
  };
}
