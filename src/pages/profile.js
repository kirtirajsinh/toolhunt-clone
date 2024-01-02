import History from "@/components/profile/History";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import React, { useState } from "react";

const Profile = ({ profile }) => {
  return (
    <div className="flex flex-col mt-12 max-w-5xl mx-auto w-full px-6 space-y-6 mb-6 lg:px-0  min-h-screen">
      <History profile={profile} />
    </div>
  );
};

export default Profile;

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  const getProfile = async () => {
    const profile = await prisma.User.findUnique({
      where: {
        id: session.user.id.id,
      },
      include: {
        Post: {
          include: {
            postTags: true,
            postCategories: true,
            likes: {
              where: {
                userId: session.user.id.id, // Filter likes to only include those by the current user
              },
              select: {
                id: true, // Select only the fields you need, for example, the ID
              },
            },
          },
          take: 10,
        },
        likedPosts: {
          include: {
            post: {
              include: {
                postTags: true,
                postCategories: true,
                likes: {
                  where: {
                    userId: session.user.id.id, // Filter likes to only include those by the current user
                  },
                  select: {
                    id: true, // Select only the fields you need, for example, the ID
                  },
                },
              },
            },
          },
        },
      },
    });
    return profile;
  };

  const profile = await getProfile();
  console.log(profile, "profile from serverside");
  return {
    props: {
      profile: JSON.parse(JSON.stringify(profile)),
    },
  };
}
