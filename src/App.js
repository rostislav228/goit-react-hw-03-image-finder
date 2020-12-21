import React, { Component } from "react";
import Searchbar from "./components/Searchbar/Searchbar";
import ImadeGallery from "./components/ImageGallery/ImageGallery";
import Button from "./components/Button/Button";
import Loader from "./components/Loader/Loader";
import s from "./App.module.css";

class App extends Component {
  state = {
    name: "",
    query: [],
    page: 1,
    message: "",
    status: "idle",
  };

  incrementPage() {
    this.setState(() => ({ page: this.state.page + 1 }));
  }

  resetPage() {
    this.setState({ page: 1 });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.query !== prevState.query && this.state.page !== 1) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    }
  }

  nameChange = async (name) => {
    await this.setState({ name, query: [], status: "pending" });
    this.resetPage();

    this.searchName().then(() => {
      if (this.state.message) {
        this.setState({ status: "rejected" });
        return;
      }
      this.setState({ status: "resolved" });
    });
  };

  addRequest = async () => {
    await this.setState({ status: "pending" });
    await this.incrementPage();

    this.searchName().then(() => {
      this.setState({ status: "resolved" });
    });
  };

  searchName() {
    this.setState({ message: "" });
    return fetch(
      `https://pixabay.com/api/?q=${this.state.name}&page=${this.state.page}&key=19045968-692e1124089d7d7c1e82b7642&image_type=photo&orientation=horizontal&per_page=12`
    )
      .then((r) => r.json())
      .then((data) => {
        if (data.hits.length === 0 && this.state.page === 1) {
          this.setState({ message: "Упс... Такого у нас нет" });
          return;
        }

        if (
          data.hits.length >= 0 &&
          data.hits.length < 12 &&
          this.state.page > 1
        ) {
          this.setState({
            message: "Вы посмотрели слишком много, всё закончилось",
          });
        }

        this.setState(() => ({
          query: [...this.state.query, ...data.hits],
        }));
      });
  }

  render() {
    const { status, message } = this.state;

    if (status === "idle") {
      return (
        <div className={s.App}>
          <Searchbar onSubmit={this.nameChange}></Searchbar>
        </div>
      );
    }

    if (status === "pending") {
      return (
        <div className={s.App}>
          <Searchbar onSubmit={this.nameChange}></Searchbar>
          <ImadeGallery query={this.state.query}></ImadeGallery>
          <Loader></Loader>
        </div>
      );
    }

    if (status === "resolved") {
      return (
        <div className={s.App}>
          <Searchbar onSubmit={this.nameChange}></Searchbar>
          <ImadeGallery query={this.state.query}></ImadeGallery>
          {message ? message : <Button increment={this.addRequest}></Button>}
        </div>
      );
    }

    if (status === "rejected") {
      return (
        <div className={s.App}>
          <Searchbar onSubmit={this.nameChange}></Searchbar>
          <div>{message}</div>
        </div>
      );
    }

    return (
      <div className={s.App}>
        <Searchbar onSubmit={this.nameChange}></Searchbar>
        Упс... Что-то пошло не по плану
      </div>
    );
  }
}

export default App;
