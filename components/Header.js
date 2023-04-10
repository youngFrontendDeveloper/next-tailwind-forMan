import Navigation from "@/components/Navigation";

export default function Header() {

  return (
    <header
      className="shadow"
      // className="h-16 shadow"
    >
      <div className="container h-full mx-auto">
        <Navigation />
      </div>
    </header>
  );
}
