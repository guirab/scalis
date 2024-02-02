async function getData({ params: { id } }: { params: { id: string } }) {
  const response = await fetch(`http:localhost:3000/api/account/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return response.json();
}

export default async function UserAccount({
  params: { id },
}: {
  params: { id: string };
}) {
  const data = await getData({ params: { id } });
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-5xl">{data[0].username}`s Account</h1>
      <div className="w-full flex-col flex gap-y-4 mt-4">
        <h2>Checking Balance: {data[0].checking}</h2>
        <h2>Savings Balance: {data[0].savings}</h2>
      </div>
    </main>
  );
}
