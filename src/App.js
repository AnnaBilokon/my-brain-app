import React, { Component } from 'react';
import Navigation from './components/navigation/Navigation'; 
import Logo from './components/logo/Logo'; 
import ImageLinkForm from './components/imageLinkForm/ImageLinkForm'; 
import Rank from './components/rank/Rank'; 
import SignIn from './components/signIn/SignIn'; 
import Register from './components/register/Register'; 
import FaceRecognition from './components/faceRecognition/FaceRecognition'; 
// import Clarifai from 'clarifai';


import './App.css';

// const app = new Clarifai.App({
// 	apiKey: '8412c7a421524078aa664696a08925eb'
//    });
   

class App extends Component {
	constructor(){
		super();
		this.state = {
			input: '',
			imageUrl: '',
			box: {},
			isSignedIn: false,
			route: 'signin',
			user: {
				id: '',
				name: '',
				password: '',
				email: '',
				entries: 0,
				joined: '' 
			}
		}
	}

	loadUser = (data) => {
		this.setState({user: {
			id: data.id,
			name: data.name,
			password: data.password,
			email: data.email,
			entries:data.entries,
			joined: data.joined 
	}})
	}

	// calculateFaceLocation = (data) => {
	// 	const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
	// 	const image = document.getElementById('inputimage');
	// 	const width = Number(image.width);
	// 	const height = Number(image.height);
	// 	return {
	// 	  leftCol: clarifaiFace.left_col * width,
	// 	  topRow: clarifaiFace.top_row * height,
	// 	  rightCol: width - (clarifaiFace.right_col * width),
	// 	  bottomRow: height - (clarifaiFace.bottom_row * height)
	// 	}
	//   }

	//   displayFaceBox = (box) => {
	// 	this.setState({box: box});
	//   }

	  
	onInputChange = (event) => {
		this.setState({input: event.target.value});
	}

// 	onButtonSubmit = () => {
// 		this.setState({imageUrl: this.state.input});
// 		app.models.predict(
// 			Clarifai.FACE_DETECT_MODEL,
//         this.state.input)
//       .then(response => {
//         console.log('hi', response)
//         if (response) {
//           fetch('http://localhost:3000/image', {
//             method: 'put',
//             headers: {'Content-Type': 'application/json'},
//             body: JSON.stringify({
//               id: this.state.user.id
//             })
//           })
//             .then(response => response.json())
//             .then(count => {
//               this.setState(Object.assign(this.state.user, { entries: count}))
//             })

//         }
//         this.displayFaceBox(this.calculateFaceLocation(response))
//       })
//       .catch(err => console.log(err));
//   }
onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({isSignedIn: false})
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

	render () {
		const { isSignedIn, imageUrl, route } = this.state;
  return (
    <div className="App">
  <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
  { route === 'home' ?
  <div>
  <Logo/>
   <Rank/>
 <ImageLinkForm onInputChange ={this.onInputChange}/>
  <FaceRecognition imageUrl={imageUrl}/>
  </div>
  : (
	route === 'signin' 
	? <SignIn onRouteChange={this.onRouteChange}/>
	: <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
  )
  }
  </div>
  );
}
}

export default App;
