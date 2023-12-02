import { useState } from "react";
import { WordData } from "../types/types";

export const useWordDataApi = () => {
  const [wordData, setWordDataState] = useState<WordData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setErrorState] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Fetches word data from the dictionary API and sets the word data, loading, and error states
  const fetchWordData = async (word: string) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      );
      const data = await response.json();
      setWordDataState(data[0]);
      setErrorState("");
      setSearchTerm(word);
    } catch (error) {
      console.error("Error fetching word data:", error);
      setWordDataState(null);
      setErrorState("Error fetching word data. Please try again.");
      setSearchTerm(word);
    } finally {
      setLoading(false);
    }
  };

  const setError = (errorMessage: string) => {
    setErrorState(errorMessage);
  };

  const setWordData = (data: WordData | null) => {
    setWordDataState(data);
  };

  return {
    wordData,
    loading,
    error,
    searchTerm,
    fetchWordData,
    setError,
    setWordData,
  };
};
