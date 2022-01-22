import { useEffect, useState } from "react/cjs/react.development";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [price, setPrice] = useState(0);
  const [excharge, setExcharge] = useState(0);
  const [selectedCoin, setSelected] = useState("");

  const onChange = (event) => {
    setPrice(event.target.value);
  };

  const onSelected = (event) => {
    setSelected(event.target.value);
  };

  useEffect(() => {
    if (price === 0 || !selectedCoin) {
      return false;
    }
    const chooseCoin = coins.find((item) => item.id === selectedCoin);
    setExcharge(Math.floor(price / chooseCoin.quotes.USD.price));
  }, [price, selectedCoin]);

  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h1>The Coins! {loading ? null : `(${coins.length})`}</h1>
      <input onChange={onChange} type="number" placeholder="얼마나 넣을건데?" />
      <hr />
      {loading ? (
        <strong>Loaging...</strong>
      ) : (
        <select onChange={onSelected}>
          <option value="null">select a coin what you want to buy</option>
          {coins.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name} ({item.symbol}: {item.quotes.USD.price})
            </option>
          ))}
        </select>
      )}
      <hr />
      {selectedCoin && price > 0 ? <p>You can buy {excharge} coins</p> : null}
    </div>
  );
}

export default App;
