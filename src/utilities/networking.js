// **** All API URL's have been changed to placeholders. ****

export const POST = (url, data) => {
  let headers = {
    "Content-Type": "application/json",
    Authorization: "Token " + localStorage.getItem("token")
  }
  if (url === "api-auth-url") {
    headers = {
      "Content-Type": "application/json"
    };
  }
  return fetch("api-url" + url, {
    method: "POST",
    headers,
    body: JSON.stringify(data)
  })
    .then((r) => r.json())
    .then(data => {
      console.log("Response from POST:", data);
      return data;
    })
    .catch(error => {
      console.error("Error:", error);
      return error;
    });
};

export const GET = (url, data) => {
  return fetch("api-url" + url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Token " + data
    }
  })
    .then(r => r.json())
    .then(data => {
      // console.log("Success GET:", data);
      return data;
    })
    .catch(error => {
      console.error("Error:", error);
      return error;
    });
};

export const DELETE = (url) => {
  return fetch("api-url" + url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Token " + localStorage.getItem("token")
    }
  })
    .then((r) => r.json())
    .then(data => {
      console.log("Response from DELETE:", data);
      return data;
    })
    .catch(error => {
      console.error("Error:", error);
      return error;
    });
};

export const PUT = (url, data) => {
  return fetch("api-url" + url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Token " + localStorage.getItem("token")
    },
    body: JSON.stringify(data)
  })
    .then((r) => r.json())
    .then(data => {
      console.log("Response from PUT:", data);
      return data;
    })
    .catch(error => {
      console.error("Error:", error);
      return error;
    });
};
