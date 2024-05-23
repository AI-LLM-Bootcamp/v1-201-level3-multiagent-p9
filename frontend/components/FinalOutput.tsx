import React from "react";
import { BusinessareaInfo } from "@/hooks/useCrewOutput";

interface FinalOutputProps {
  businessareaInfoList: BusinessareaInfo[];
}

export const FinalOutput: React.FC<FinalOutputProps> = ({
  businessareaInfoList,
}) => {
  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-lg font-semibold my-2">Links to Blog Articles and Youtube Videos</h2>
      <div className="flex-grow overflow-auto border-2 border-gray-300 p-2">
        {businessareaInfoList.length === 0 ? (
          <p>No output yet.</p>
        ) : (
          businessareaInfoList.map((businessarea, index) => (
            <div key={index} className="mb-4">
              <div className="ml-4">
                <p>
                  <strong>Technology:</strong>{" "}
                  {capitalizeFirstLetter(businessarea.technology)}
                </p>
                <p>
                  <strong>Business Area:</strong>{" "}
                  {capitalizeFirstLetter(businessarea.businessarea)}
                </p>
                <div>
                  <strong>Blog Articles URLs:</strong>
                  <ul>
                    {businessarea.blog_articles_urls.length > 0 ? (
                      businessarea.blog_articles_urls.map((url, urlIndex) => (
                        <li key={urlIndex}>
                          <a
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-green-500 underline"
                          >
                            {url}
                          </a>
                        </li>
                      ))
                    ) : (
                      <p>None</p>
                    )}
                  </ul>
                </div>
                <div>
                  <strong>YouTube Videos:</strong>
                  <ul>
                    {businessarea.youtube_videos_urls.map(
                      (video, videoIndex) => (
                        <li key={videoIndex}>
                          <a
                            href={video.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-green-500 underline"
                          >
                            {video.name}
                          </a>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};