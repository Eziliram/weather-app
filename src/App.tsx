import "./App.css";
import Overview from "./pages/Overview";

const App = () => {
  return (
    <>
      <Overview />

      <section id="weather_log">
        <div id="weather_forecast">
          <h2>3-Day Forecast</h2>
          <ul>
            <li>Day 1</li>
            <li>Day 2</li>
            <li>Day 3</li>
          </ul>
        </div>
        <div id="weather_history">
          <h2>3-Day History</h2>
          <ul>
            <li>Day 1</li>
            <li>Day 2</li>
            <li>Day 3</li>
          </ul>
        </div>
      </section>

      <section id="spacer"></section>
    </>
  );
};

export default App;
