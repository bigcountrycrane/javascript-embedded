import { initializeFlatfile } from "@flatfile/javascript";

const server_url = "http://localhost:8080";

//open existing space in modal
window.openExistingFlatfileSpace = () => {
  fetch(server_url + "/space") // Make a request to the server endpoint
    .then((response) => response.json())
    .then((space) => {
      const flatfileOptions = {
        space: {
          id: space && space.data && space.data.id,
          accessToken: space && space.data && space.data.accessToken,
        },
        displayAsModal: false,
      };
      initializeFlatfile(flatfileOptions);
    })
    .catch((error) => {
      console.error("Error retrieving space in client:", error);
    });
};

//create a new space in modal
window.initializeNewFlatfileSpace = (publishableKey, environmentId) => {
  const flatfileOptions = {
    publishableKey,
    displayAsModal: false,
    // Additional parameters...
  };

  initializeFlatfile(flatfileOptions);
};
