import Link from "next/link";
import { TrendingTools } from "../../lib/AIToolsData";
import { useTools } from "../hooks/tools";
import { Button } from "../ui/button";
import TrendingHeader from "./TrendingHeader";

const Trending = () => {
  const TrendingTools = useTools((state) => state.trendingTools);
  console.log(TrendingTools, "trending tools from the global state");
  return (
    <section className="flex flex-col mt-16 max-w-5xl mx-auto w-full px-6 lg:px-0 mb-24">
      <TrendingHeader />
      <div className="grid grid-cols-1 md:grid-cols-2 justify-center gap-x-6 gap-y-4">
        {TrendingTools?.map((tools, key) => {
          const date = new Date(tools.createdAt);
          const formattedDate = date.toLocaleDateString("en-US", {
            day: "numeric",
            year: "numeric",
            month: "long",
          });
          return (
            <div
              className="flex flex-row justify-between items-center bg-secondary-background rounded-lg px-2"
              id={key}
              key={key}
            >
              <div className="flex flex-row  truncate justify-between gap-2 px-2 py-3 md:p-4">
                <p className="text-secondary-text">{formattedDate}</p>
                <span>|</span>
                <p className="">{tools.title}</p>
              </div>
              <Link
                href={`/tool/${tools.id}`}
                className="px-8 py-3  rounded-lg  text-base bg-gradient-to-r from-[#0eca90] to-[#11c2b6] bg-clip-text text-transparent border-[1px] border-[#0eca90] hover:bg-transparent hover:text-[#0eca90]"
              >
                Open Side
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Trending;
