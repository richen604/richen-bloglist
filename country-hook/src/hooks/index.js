import { useState, useEffect } from "react";
import axios from "axios";

export const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

export const useCountry = (name) => {
  const [country, setCountry] = useState(null);

  useEffect(() => {
    if (!name) return;
    axios
      .get(`https://restcountries.eu/rest/v2/name/${name}?fullText=true`)
      .then((result) => {
        if (result.status === 200) {
          setCountry({ data: result.data[0], found: true });
        }
      })
      .catch((err) => {
        if (err.response.status === 404) {
          setCountry({ found: false });
          return;
        }
        console.log(err);
      });
  }, [name]);

  return country;
};
