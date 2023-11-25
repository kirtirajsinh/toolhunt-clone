import Advantage from "@/components/submit/Advantage";
import Faq from "@/components/submit/Faq";
import PricingCard from "@/components/submit/PricingCard";
import PromoteTool from "@/components/submit/PromoteTool";
import SubmitTool from "@/components/submit/SubmitTool";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const Promote = () => {
  const router = useRouter();
  return (
    <>
      <div className="flex flex-col md:mx-36 mx-auto px-6">
        <h1 className="font-bold text-2xl tracking-wider">
          Promote-Get Featured
        </h1>
        <p className="mt-5">
          We are committed to be the best AI Tools Directory. You can get the
          most direct website traffic and user clicks with get featured for your
          website tool.
        </p>

        <Advantage />
        <div className="flex sm:flex-row items-center flex-col justify-center gap-6  mt-20 sm:mt-32">
          <Link href="/submit">
            <PricingCard
              title="Fast Track"
              price="$49"
              features={[
                "NO Queue, Listed within 48 Hours",
                "HighLighted on Home Page for 24 Hours",
                "Estimated Clicks: 500-2000+",
                "Listing and Traffic Forever",
              ]}
              className={
                // if the route is at /submit then add border
                ` ${
                  router.asPath === "/submit"
                    ? " border border-tertiary-button"
                    : ""
                }`
              }
            />
          </Link>

          <PricingCard
            title="Promote"
            price="$199"
            features={[
              "Contains All of Fast Track",
              "Top spots in Home and Category pages for 7 Days",
              "Estimated Clicks: 2000-20000+",
              "Estimated Cost per Click - $0.005 - $0.1",
            ]}
            className={
              // if the route is at /submit then add border
              `${
                router.asPath === "/promote"
                  ? " border border-tertiary-button"
                  : ""
              }`
            }
          />
        </div>
        <PromoteTool />
        <Faq
          faqs={[
            {
              item: "item-1",
              question: "How long does it take to get listed?",
              answer:
                "Most tools get listed within 1-2 weeks. However, with Fast Track submission it gets listed within 48 hours with promotion.",
            },
            {
              item: "item-2",

              question: "Is my tool eligible for listing?",
              answer:
                "As long as your tool provides an AI capability or feature, it is eligible for listing. However, we do not list services, products or tools that provide illegal, dangerous or harmful capabilities.",
            },
            {
              item: "item-3",

              question: "How do users find my tool?",
              answer:
                "Users can find your tool by browsing our listings by category or searching. We also promote new and featured listings on our homepage and social media to bring more users and traffic to your listing page.",
            },
          ]}
        />
      </div>
    </>
  );
};

export default Promote;
