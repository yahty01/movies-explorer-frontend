export const checkResponse = async (res) => {
  if (res.ok) {
    return res.json();
  }
  
  const contentType = res.headers.get("content-type");
  const errorText = contentType && contentType.includes("application/json")
    ? (await res.json()).message
    : await res.text();

  throw new Error(errorText);
};

export const options = {
  headers: {
    "Content-Type": "application/json",
  },
  credentials: "include",
};
