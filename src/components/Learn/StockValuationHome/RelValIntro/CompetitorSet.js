import React, { useState, useEffect } from "react";
import { Autocomplete, Button, Box, Space } from "@mantine/core";
import { useRouter } from "next/navigation";

export function CompetitorSet() {
  const [competitor1, setCompetitor1] = useState("");
  const [competitor2, setCompetitor2] = useState("");
  const [suggestions1, setSuggestions1] = useState([]);
  const [suggestions2, setSuggestions2] = useState([]);
  const [selectedCompetitor1, setSelectedCompetitor1] = useState("");
  const [selectedCompetitor2, setSelectedCompetitor2] = useState("");
  const router = useRouter();

  const fetchSuggestions = async (inputValue, setSuggestions) => {
    if (inputValue.length > 1) {
      try {
        const response = await fetch(
          `https://financialmodelingprep.com/api/v3/search-ticker?query=${inputValue}&limit=10&apikey=${process.env.NEXT_PUBLIC_FIN_MOD_API_KEY}`,
        );
        if (response.ok) {
          const data = await response.json();
          const formattedData = data.map((item) => ({
            value: `${item.name} (${item.symbol})`,
            symbol: item.symbol,
          }));
          setSuggestions(formattedData);
        } else {
          console.error("Error fetching data");
        }
      } catch (error) {
        console.error("Error occurred during API request:", error);
      }
    } else {
      setSuggestions([]);
    }
  };

  useEffect(() => {
    fetchSuggestions(competitor1, setSuggestions1);
  }, [competitor1]);

  useEffect(() => {
    fetchSuggestions(competitor2, setSuggestions2);
  }, [competitor2]);

  const handleSave = () => {
    localStorage.setItem("competitor1", selectedCompetitor1);
    localStorage.setItem("competitor2", selectedCompetitor2);
    router.push("/learn/stockValuation/enterpriseValueMultiples");
  };

  return (
    <Box>
      <Autocomplete
        placeholder="Competitor 1"
        data={suggestions1}
        value={competitor1}
        onChange={(value) => {
          setCompetitor1(value);
          const selected = suggestions1.find(
            (suggestion) => suggestion.value === value,
          );
          if (selected) setSelectedCompetitor1(selected.symbol);
        }}
      />
      <Space h="md" />
      <Autocomplete
        placeholder="Competitor 2"
        data={suggestions2}
        value={competitor2}
        onChange={(value) => {
          setCompetitor2(value);
          const selected = suggestions2.find(
            (suggestion) => suggestion.value === value,
          );
          if (selected) setSelectedCompetitor2(selected.symbol);
        }}
      />
      <Space h="md" />
      <Button onClick={handleSave}>Save Competitors and Continue</Button>
    </Box>
  );
}
