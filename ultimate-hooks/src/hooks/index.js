import axios from "axios";
import { useState, useEffect } from "react";

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    const request = axios.get(baseUrl);
    request.then((response) => {
      setResources(response.data);
    });
  }, [baseUrl]);

  const create = (resource) => {
    const request = axios.post(baseUrl, resource);
    request.then((response) => response.data);
    let newResources = [...resources];

    //new ID handling for JSON server, omit for production databases
    let nextID = newResources[newResources.length - 1].id + 1;
    newResources.push({ ...resource, id: nextID });

    setResources(newResources);
  };

  const service = {
    create,
  };

  return [resources, service];
};
