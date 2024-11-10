import Homepage from "./Pages/1-LandingPage/LandingPage";
import ListingsPage from "./Pages/2-Listings/Listings";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <section>
        <Homepage/>
      </section>
    </div>
  );
}
