"use client";

import { EventLog } from "@/components/EventLog";
import { FinalOutput } from "@/components/FinalOutput";
import InputSection from "@/components/InputSection";
import { useCrewOutput } from "@/hooks/useCrewOutput";

export default function Home() {
  // Hooks
  const crewOutput = useCrewOutput();

  return (
    <div className="bg-white min-h-screen text-black">
      <div className="flex flex-col">
        {/* Input sections in one row */}
        <div className="flex w-full">
          <div className="w-1/2 p-4">
            <InputSection
              title="Technologies"
              placeholder="Example: Generative AI"
              data={crewOutput.technologies}
              setData={crewOutput.setTechnologies}
            />
          </div>
          <div className="w-1/2 p-4">
            <InputSection
              title="Business Areas"
              placeholder="Example: Customer Service"
              data={crewOutput.businessareas}
              setData={crewOutput.setBusinessareas}
            />
          </div>
        </div>

        {/* Output section and event log in a single column below */}
        <div className="flex flex-col w-full p-4">
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={() => crewOutput.startOutput()}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded text-sm"
              disabled={crewOutput.running}
            >
              {crewOutput.running ? "Running..." : "Start"}
            </button>
          </div>
          <FinalOutput businessareaInfoList={crewOutput.businessareaInfoList} />
          <div className="my-8"> {/* Added margin for spacing */}
            <EventLog events={crewOutput.events} />
          </div>
        </div>
      </div>
    </div>
  );
}
