import "./App.css";

function App() {
  return (
    <>
      <section id="weather_today">
        <div>
          <h1>Today</h1>
          <p>Partly cloudly</p>
        </div>
        <button
          id="button_refresh"
          type="button"
          onClick={() => console.log("Refreshing weather data...")}>
          Refresh
        </button>
      </section>

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
}

export default App;
