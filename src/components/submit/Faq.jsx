import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Faq = ({ faqs }) => {
  return (
    <>
      <div className="flex flex-col w-full items-center sm:mt-60 mt-20 mb-20">
        <h1 className="font-bold text-2xl tracking-wider">FAQ</h1>
        <Accordion type="single" collapsible className="max-w-6xl w-full">
          {faqs.map((faq) => (
            <AccordionItem value={faq.item} key={faq.item}>
              <AccordionTrigger className="text-lg">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </>
  );
};

export default Faq;
