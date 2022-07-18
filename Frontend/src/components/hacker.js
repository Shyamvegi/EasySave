import { Component } from "react";

export default class App2 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      countries: [],
      searchText: "",
      loading: false,
    };
  }

  onTextChange(value) {
    this.setState({
      searchText: value,
    });
    // setTimeout(() => {
    //     this.searchCountries()
    // }, 3000);
  }

  searchCountries() {
    this.setState({
      loading: true,
    });
    let url = `https://restcountries.com/v3.1/name/${this.state.searchText}`;
    fetch(url)
      .then((res) => res.json())
      .then((countries) => {
        if (countries.status === 404) throw Error("no countries found");
        this.setState({
          countries: countries,
          loading: false,
        });
      })
      .catch((err) => {
        this.setState({
          countries: [],
          loading: false,
        });
      });
  }

  _handleKeyDown = (e) => {
    if (e.key === "Enter") {
      this.searchCountries();
    }
  };

  render() {
    return (
      <div
        style={{
          padding: "20px",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div style={{ flex: 1 }}>
          <input
            value={this.state.searchText}
            onChange={(e) => {
              this.onTextChange(e.target.value);
            }}
            onKeyDown={this._handleKeyDown}
          />
          <button onClick={this.searchCountries.bind(this)}>Search</button>
        </div>
        {this.state.loading ? <h3>loading....</h3> : null}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
          }}
        >
          {this.state.countries.map((country) => {
            return (
              <div
                style={{
                  border: "1px solid grey",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  margin: 10,
                }}
              >
                <img src={country.flags.png} alt="country" />
                <h3>{country.name.common}</h3>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}