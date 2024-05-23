"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export type EventType = {
  data: string;
  timestamp: string;
};

export type NamedUrl = {
  name: string;
  url: string;
};

export type BusinessareaInfo = {
  technology: string;
  businessarea: string;
  blog_articles_urls: string[];
  youtube_interview_urls: NamedUrl[];
};

export const useCrewOutput = () => {
  // State
  const [running, setRunning] = useState<boolean>(false);
  const [technologies, setTechnologies] = useState<string[]>([]);
  const [businessareas, setBusinessareas] = useState<string[]>([]);
  const [events, setEvents] = useState<EventType[]>([]);
  const [businessareaInfoList, setBusinessareaInfoList] = useState<BusinessareaInfo[]>([]);
  const [currentInputId, setCurrentInputId] = useState<string>("");

  // useEffects
  useEffect(() => {
    let intervalId: number;
    console.log("currentInputId", currentInputId);

    const fetchOutputStatus = async () => {
      try {
        console.log("calling fetchOutputStatus");
        const response = await axios.get<{
          status: string;
          result: { businessareas: BusinessareaInfo[] };
          events: EventType[];
        }>(`http://localhost:3001/api/multiagent/${currentInputId}`);
        const { status, events: fetchedEvents, result } = response.data;

        console.log("status update", response.data);

        setEvents(fetchedEvents);
        if (result) {
          console.log("setting output result", result);
          console.log("setting output businessareas", result.businessareas);
          setBusinessareaInfoList(result.businessareas || []);
        }

        if (status === "COMPLETE" || status === "ERROR") {
          if (intervalId) {
            clearInterval(intervalId);
          }
          setRunning(false);
          toast.success(`Output ${status.toLowerCase()}.`);
        }
      } catch (error) {
        if (intervalId) {
          clearInterval(intervalId);
        }
        setRunning(false);
        toast.error("Failed to get output status.");
        console.error(error);
      }
    };

    if (currentInputId !== "") {
      intervalId = setInterval(fetchOutputStatus, 1000) as unknown as number;
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [currentInputId]);

  const startOutput = async () => {
    // Clear previous output data
    setEvents([]);
    setBusinessareaInfoList([]);
    setRunning(true);

    try {
      const response = await axios.post<{ input_id: string }>(
        "http://localhost:3001/api/multiagent",
        {
          technologies,
          businessareas,
        }
      );

      toast.success("Output started");

      console.log("inputId", response.data.input_id);
      setCurrentInputId(response.data.input_id);
    } catch (error) {
      toast.error("Failed to start output");
      console.error(error);
      setCurrentInputId("");
    }
  };

  return {
    running,
    events,
    setEvents,
    businessareaInfoList,
    setBusinessareaInfoList,
    currentInputId,
    setCurrentInputId,
    technologies,
    setTechnologies,
    businessareas,
    setBusinessareas,
    startOutput,
  };
};