interface Error {
  info: {
    message: string;
    statusCode: number;
  };
  status: number;
}

export const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    const error: Error = {
      info: await res.json(),
      status: res.status
    };
    throw error;
  }
  return res.json();
};
