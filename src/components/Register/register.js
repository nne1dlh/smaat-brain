import React from 'react';

class Register extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			fname:'', 
			lname:''
		}
	}

	onfNameChange = (event) => {
		this.setState({fname: event.target.value});
	}
	onlNameChange = (event) => {
		this.setState({lname: event.target.value});
	}

	onEmailChange = (e) => {
		this.setState({email: e.target.value})
	}
	onPasswordChange = (event) => {
		this.setState({password: event.target.value})
	}

	onSubmitSignIn = () => {
		fetch('https://scary-labyrinth-19872.herokuapp.com/register', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				email: this.state.email,
				passwd: this.state.password,
				fname: this.state.fname,
				lname: this.state.lname
			})
		})
			.then(resp => resp.json())
			.then(usr => {
				if(usr.id) {
					this.props.loadUser(usr)
					this.props.onRouteChange('home');
				}
			})

		console.log(this.state);
	}

	render() {
		
		return (
			<article className='br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-1 mw6 shadow-5 center'>
				<main className="pa4 black-80">
				  <div className="measure">
				    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
				      <legend className="f1 fw6 ph0 mh0">Register</legend>
				      <div className="mt3">
				        <label className="db fw6 lh-copy f6" htmlFor="name"> First Name</label>
				        <input 
				        	className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
				        	type="text" 
				        	name="fname"  
				        	id="fnamer"
				        	onChange={this.onfNameChange} />
				      </div>
				      <div className="mt3">
				        <label className="db fw6 lh-copy f6" htmlFor="name">Last Name</label>
				        <input 
				        	className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
				        	type="text" 
				        	name="lname"  
				        	id="lnamer"
				        	onChange={this.onlNameChange} />
				      </div>
				      <div className="mt3">
				        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
				        <input 
				        	className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
				        	type="email" 
				        	name="email-address"  
				        	id="email-address"
				        	onChange={this.onEmailChange}
				        	 />
				        	
				      </div>
				      <div className="mv3">
				        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
				        <input 	
				        	className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
				        	type="password" 
				        	name="password"  
				        	id="password"
				        	onChange={this.onPasswordChange}
				        	 />
				        	
				      </div>
				      
				    </fieldset>
				    <div className="">
				      <input 
				      onClick={this.onSubmitSignIn}
				      className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
				      type="submit" value="RegisterMe" />
				    </div>
				  </div>
				</main>
			</article>
		);
	}
}

export default Register;