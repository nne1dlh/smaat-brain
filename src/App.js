import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/nav'
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Logo from './components/Logo/logo';
import ImageLinkForm from './components/ImageLinkForm/ImgLinkForm';
import Signin from './components/Signin/signin';
import Register from './components/Register/register';
import Rank from './components/Rank/rank';
//cab95ed9cd0f43b3b69e8cd7ca22677f
//https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&h=350
//https://www.uni-regensburg.de/Fakultaeten/phil_Fak_II/Psychologie/Psy_II/beautycheck/english/durchschnittsgesichter/m(01-32)_gr.jpg
import './App.css';



const particlesOpt = {
  particles: {
      number: {
        value: 170,
        density: {
          enable:true,
          value_area: 800
        }
      }
  }
}

const initState = {
  input: '',
      imgUrl: '',
      box:{},
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        fname: '',
        lname:'',
        email: '',
        entries: 0,
        joined: ''
      }
}

class App extends Component {
  constructor() {
    super();
    this.state = initState;
  }
  

  loadUser = (data) => {
    this.setState(
      {user: {
        id: data.id,
        fname: data.fname,
        lname:data.lname,
        email: data.email,
        entries: data.entries,
        joined: data.joined
        }
    })
  }

  // componentDidMount() {
  //   fetch('http://localhost:3001')
  //     .then(resp => resp.json())
  //     .then(data => console.log(data))
  // }

  calcFaceLoc = (data) => {
   const clearface = data.outputs[0].data.regions[0].region_info.bounding_box;
   const image = document.getElementById('inputImg');
   const width = Number(image.width);
   const height = Number(image.height);
   console.log( width, height);
   return {
    leftCol: clearface.left_col * width,
    topRow: clearface.top_row * height,
    rightCol: width - (clearface.right_col * width),
    bottomRow: height - (clearface.bottom_row * height) 
   }
 }

 displayFaceBox = (box) => {
  this.setState({box:box});
  } 


  onInputChange = (e) => {
    console.log(e.target.value);
    this.setState({input: e.target.value});
  }

  onButtonSubmit = () => {
    console.log("click");
    this.setState({imgUrl: this.state.input});
      fetch('https://scary-labyrinth-19872.herokuapp.com/imageurl', {
          method: 'post',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            input: this.state.input
            })
      })
      .then(resp => resp.json())
      .then(resp => {
          // do something with response
          if(resp) {
            fetch('https://scary-labyrinth-19872.herokuapp.com/image', {
              method: 'put',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({
                id: this.state.user.id
              })
            })
            .then(resp => resp.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, {entries: count}))
            })
            .catch(console.log);
          }
          console.log(resp.outputs[0].data.regions[0].region_info.bounding_box);
          this.displayFaceBox(this.calcFaceLoc(resp));
        }).catch(err => console.log(err)); 
      // there was an error
    }

  onRouteChange = (piss) => {
    if (piss === 'signout') {
      this.setState(initState)
    } else if (piss === 'home') {
      this.setState({isSignedIn: true})
    }
      this.setState({route: piss});
  }

  render() {
    const {isSignedIn, imgUrl, route, box} = this.state;
    return (
      <div className="App">
        <Particles className='particles'
              params={particlesOpt}
        />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
        { route === 'home' ?
        <div> 
          <Logo />
          <Rank name={this.state.user.fname}
            entries={this.state.user.entries} />
          <ImageLinkForm 
            onInputChange={this.onInputChange}
            onButtonSubmit={this.onButtonSubmit}

          />
          <FaceRecognition box={box} imageUrl={imgUrl}/>
        </div>: (
          route === 'signin' ?
            <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/> :
            <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        )
        
        
        }
      </div>
    );
  }
}

export default App;

