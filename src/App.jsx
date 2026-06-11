import { DayTripsSection } from './components/DayTripsSection.jsx';
import { FoodSection } from './components/FoodSection.jsx';
import { ItinerarySection } from './components/ItinerarySection.jsx';
import { Navbar } from './components/Navbar.jsx';
import { Overview } from './components/Overview.jsx';
import { PracticalInfo } from './components/PracticalInfo.jsx';
import { RestaurantSection } from './components/RestaurantSection.jsx';
import { TransportSection } from './components/TransportSection.jsx';
import { WeddingDaySection } from './components/WeddingDaySection.jsx';
import { useLocalStorage } from './hooks/useLocalStorage.js';
import { buildInitialItinerary } from './lib/itinerary.js';

const storageKeys = {
  favourites: 'crema:v1:favourites',
  foodChecklist: 'crema:v1:foodChecklist',
  bookingStatuses: 'crema:v1:bookingStatuses',
  itinerary: 'crema:v1:itinerary',
};

export default function App() {
  const [favourites, setFavourites] = useLocalStorage(storageKeys.favourites, []);
  const [triedFood, setTriedFood] = useLocalStorage(storageKeys.foodChecklist, []);
  const [bookingStatuses, setBookingStatuses] = useLocalStorage(storageKeys.bookingStatuses, {});
  const [itinerary, setItinerary] = useLocalStorage(storageKeys.itinerary, buildInitialItinerary());

  return (
    <div className="app-shell">
      <Navbar />
      <main>
        <Overview />
        <ItinerarySection itinerary={itinerary} setItinerary={setItinerary} />
        <FoodSection triedFood={triedFood} setTriedFood={setTriedFood} />
        <RestaurantSection
          favourites={favourites}
          setFavourites={setFavourites}
          bookingStatuses={bookingStatuses}
          setBookingStatuses={setBookingStatuses}
        />
        <DayTripsSection favourites={favourites} setFavourites={setFavourites} />
        <TransportSection />
        <WeddingDaySection />
        <PracticalInfo />
      </main>
    </div>
  );
}
