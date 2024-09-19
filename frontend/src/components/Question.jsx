import React, { useState } from "react";
import axios from "axios";

function Question() {
  const [jobDescription, setJobDescription] = useState("");
  const [questions, setQuestions] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setJobDescription(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:4000/generate-questions",
        {
          jobDescription: jobDescription,
        }
      );
      setQuestions(response.data.response);
      setJobDescription("");
    } catch (error) {
      console.error("Error fetching questions:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderQuestions = (text) => {
    const lines = text.split("\n").map((line, index) => {
      // Handle headings
      if (line.startsWith("##")) {
        return (
          <h2 key={index} className="text-xl font-bold mt-4">
            {line.replace("## ", "")}
          </h2>
        );
      }

      // Handle list items
      if (line.startsWith("* ")) {
        return (
          <li key={index} className="ml-4 list-disc">
            {line.replace("* ", "")}
          </li>
        );
      }

      // Handle bold text within a line
      const parts = line.split(/(\*\*.*?\*\*)/g).map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return <strong key={i}>{part.replace(/\*\*/g, "")}</strong>;
        }
        return part;
      });

      return (
        <p key={index} className="mt-2">
          {parts}
        </p>
      );
    });

    return <div>{lines}</div>;
  };

  return (
    <div className="flex text-white h-[85vh] p-6 m-6 text-lg border-2 border-white">
      <div className="w-1/2 pr-4 border-r border-white">
        <h1 className="mb-4">
          Ace your interview with our expertly crafted questions
        </h1>
        <p className="mb-4">
          Just provide us with the job description and relax
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <textarea
            value={jobDescription}
            onChange={handleChange}
            placeholder="Enter job description here"
            className="border border-white rounded-md p-4 text-black bg-white placeholder-gray-400 resize-none h-[48vh] mb-4"
          />
          <button
            type="submit"
            className="bg-white text-black border border-gray-300 rounded-md px-4 py-2 shadow hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300"
            disabled={loading}
          >
            {loading ? "Loading..." : "Submit"}
          </button>
        </form>
      </div>
      <div className="w-1/2 pl-4 overflow-y-auto">
        <h2 className="mb-4">Generated Questions</h2>
        <div className="max-h-full">
          {questions ? (
            renderQuestions(questions)
          ) : (
            <p>No questions generated yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Question;
