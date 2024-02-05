import Accounts from "./components/accounts";
import NewAccForm from "./components/newAccForm";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-12 sm:p-24 justify-center sm:justify-start">
      <h1 className="text-5xl">Banking App</h1>
      <div className="w-full flex justify-between flex-col sm:flex-row gap-y-4">
        <NewAccForm />
        <Accounts />
      </div>
    </main>
  );
}
