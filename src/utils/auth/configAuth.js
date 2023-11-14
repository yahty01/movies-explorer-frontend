export const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  } else {
    const contentType = res.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return res.json().then((data) => Promise.reject(data.message));
    } else {
      return res.text().then((text) => Promise.reject(text));
    }
  }
};

export const options = {
  headers: {
    "Content-Type": "application/json",
  },
  credentials: "include",
};
