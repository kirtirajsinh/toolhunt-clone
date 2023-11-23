import React from "react";
import { Card } from "../ui/card";
import { TrendingTools } from "../../lib/AIToolsData";
import { Button } from "../ui/button";
import TrendingHeader from "./TrendingHeader";

const Trending = () => {
  return (
    <section className="flex flex-col mt-16 max-w-5xl mx-auto w-full px-8 lg:px-0 mb-24">
      <TrendingHeader />
      <div className="grid grid-cols-1 md:grid-cols-2 justify-center gap-x-6 gap-y-4">
        {TrendingTools.map((tools, key) => {
          return (
            <div
              className="flex flex-row justify-between items-center bg-secondary-background rounded-lg px-2"
              id={key}
              key={key}
            >
              <div className="flex flex-row justify-between space-x-4 p-4">
                <p>{tools.date}</p>
                <span>|</span>
                <h1>{tools.name}</h1>
              </div>
              <Button className="font-medium px-8 py-3 rounded-lg font-sans text-base bg-gradient-to-r from-[#0eca90] to-[#11c2b6]  bg-clip-text text-transparent border-[1px] border-[#0eca90] hover:bg-transparent hover:text-[#0eca90]">
                Open Side
              </Button>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Trending;
