import React, {Component} from 'react';
import {connect} from 'react-redux'
import Structure from './containers/Structure/Structure'
import Products from './containers/Products/Products'
import Navbar from './components/Navbar/Navbar';
import Backdrop from './components/UI/Backdrop/Backdrop'
import NavBarMin from './components/UI/NavBarMin/NavBarMin'
import Login from './containers/Authentication/Login/Login'
import SignIn from './containers/Authentication/SignIn/SignIn'
import Footer from './components/Footer/Footer'
import axios from './Axios'
import {Route, Switch} from 'react-router-dom'
import './App.css';
import Orders from './containers/Orders/Orders';
import * as actionCreator from './Store/actions'
import Aux from './hoc/Aux';
import Services from './components/Services/Services';
import Team from './components/Team/Team';
import Contact from './containers/Contact/Contact';
import Admin from './containers/Admin/Admin';
import Profile from './components/Profile/Profile';

class App extends Component{
  state={
    toggled: false,
    clickedLogin: false,
    clickedSignin:false,
    showProfile:false
}
componentDidMount(){
    window.addEventListener('scroll', this.handleNavbar);
    let authe = JSON.parse(localStorage.getItem('sunengUserData'))
    if(authe){
      this.props.onLogin(authe)
    }
    axios.get('api/product/allProducts')
    .then(response => {
        this.props.getMyProducts(response.data.data.data)
    })
    .catch(error => {
        console.log(error)
    })
}
// handleNavbar = (e)=>{
//     if(window.scrollY < 100){
//         this.setState({isTop: true})
//     }else{
//         this.setState({isTop:false})
//     }
// }
navigationToggler = () => {
    const toggledState = this.state.toggled
    this.setState({toggled: !toggledState})
}
clickedLoginHandler = ()=>{
  this.setState((prev,props) => {
    return {clickedLogin: !prev.clickedLogin}
  })
}
goToFullProductHandler = ()=>{
    this.props.history.push('/products')
}
clickedSigninHandler =()=> {
    this.setState((prev,props) => {
      return {clickedSignin: !prev.clickedSignin}
    })
}
showProfileHandler = ()=> {
  this.setState({showProfile: true})
}
cancelProfileHandler = ()=> {
  this.setState({showProfile: false})
}
logoutHandler = () => {
  this.props.onLogOut();
  localStorage.removeItem("sunengUserData");
  this.setState({clickedLogin: false, showProfile: false, clickedSignin: false})
}
  render(){
    return (
      <Aux>
        <div className="Page_Container">
          <section className="Structure">
            <NavBarMin 
            toggled={this.state.toggled}
            toggler={this.navigationToggler}
            />
            <Backdrop toggled={this.state.toggled} clicked={this.navigationToggler}/>
            <Login 
            showUp={this.state.clickedLogin}
            clicked={this.clickedLoginHandler}/>
            <SignIn 
            showUp ={this.state.clickedSignin}
            clicked= {this.clickedSigninHandler}/>
            <Profile 
            isToggled={this.state.showProfile}
            removeProfile={this.cancelProfileHandler}
            logout={this.logoutHandler}/>
            <section className="NavBar_Top">
              <Navbar
              toToggle={this.navigationToggler}
              isTop={this.state.isTop}
              loginClicked={this.clickedLoginHandler}
              signinClicked={this.clickedSigninHandler}
              showProfile={this.showProfileHandler}/>
            </section>
          </section>
          <Switch>
            <Route path="/products" component={Products}/>
            <Route path="/orders" component={Orders} />
            <Route path="/services" component={Services} />
            <Route path="/aboutUs" component={Team}/>
            <Route path="/contact" component={Contact}/>
            <Route path="/admin" component={Admin} />
            <Route path="/" exact component={Structure} />
          </Switch>
          <Footer />
        </div>
    </Aux>
    )
  }
}
const propsMappedToState = (state)=> {
  return{
      isLoggedIn: state.isLoggedIn,
      userData: state.userData
  }
}
const mapDispachedtoComponent = dispatch => {
  return {
      getMyProducts : (payload) => dispatch(actionCreator.companyProduct(payload)),
      onLogin: (payload) => dispatch(actionCreator.login(payload)), 
      onLogOut: ()=> dispatch(actionCreator.logOut())
  }
}
export default connect(propsMappedToState, mapDispachedtoComponent)(App)