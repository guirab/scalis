import Accounts from "./components/accounts";
import NewAccForm from "./components/newAccForm";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-5xl">Banking App</h1>
      <div className="w-full flex justify-between">
        <NewAccForm />
        <Accounts />
      </div>
    </main>
  );
}
