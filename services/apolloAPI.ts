export const getUsers = async () => {
  // if (!token) {
  //   return console.log("Not logged in...");
  // }

  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_ROUTE}/user/list`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        //   Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!resp.ok) {
    return console.log("Error...");
  }

  const data = await resp.json();

  return data;
};

export const getPosts = async () => {
  // if (!token) {
  //   return console.log("Not logged in...");
  // }

  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_ROUTE}/post/list`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        //   Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!resp.ok) {
    return console.log("Error...");
  }

  const data = await resp.json();

  return data;
};
