const POST = async (req: Request) => {
  const { name } = await req.json();
  const fetcher = await fetch("https://jsonplaceholder.typicode.com/todos/1");

  return Response.json({
    success: true,
    message: "Test API Berhasil",
    data: { name, fetcher },
  });
};
export { POST };
