let cardApp = document.getElementById('cardapp');


const CardList = (props) => (
  <div className="array-conatianer">
    <ul className="array">
      {props.profile.map(profile => <Card key={profile.id} {...profile} />)}
    </ul>
  </div>
);

class Card extends React.Component {
  render() {
    return (
      <li>
        <div className="github-profile">
          <div className="card-image-container">
            <img src={this.props.avatar_url} className="card-image" />
          </div>
          <div className="card-info">
            <h1 className="name">Name: {this.props.name}</h1>
            <h6 className="company">Company: {this.props.company}</h6>
          </div>
          <div className="card-extra-info">
              <h3>"Extra Info"</h3>
               <p className="extra-info">ID: {this.props.id}</p>
               <p className="extra-info">Location: {this.props.location}</p>
               <p className="extra-info">Followers: {this.props.followers}</p>
               <p className="extra-info">Following: {this.props.following}</p>
          </div>
        </div>
      </li>
    )
  }
}

class Form extends React.Component {
  state = { userName: '' }
  handleSubmit = async (event) => {
    event.preventDefault();
    const resp = await
      axios.get('https://api.github.com/users/' + this.state.userName);
    this.props.onSubmit(resp.data);
    this.setState({ userName: '' })
    console.log(resp);

  };

  render() {
    return (
      <div className="form-container">
        <form className="form-input" onSubmit={this.handleSubmit}>
          <input type="text" className="input" Placeholder="Enter name.."
            value={this.state.userName}
            onChange={event => this.setState({ userName: event.target.value })}
            required></input>
          <button type="submit">Add Card</button>
        </form>
      </div>

    )
  }
 
}



class App extends React.Component {
  state = {
    profiles: [],
  };
  addNewProfile = (profileData) => {
    this.setState(prevState => ({
      profiles: [...prevState.profiles, profileData],
    }))
  };


  render() {
    return (
      <div className="Container">
        <div className="header-container">
          <h1 className="header">{this.props.title}</h1>
        </div>
        <Form onSubmit={this.addNewProfile} />
        <CardList profile={this.state.profiles} />
      </div>
    )
  }
}


/*
function App(props) {
  return <div className="header">{props.title}</div>;
}
*/


ReactDOM.render(
  <App title="The GitHub Card App" />,
  cardApp,
);

