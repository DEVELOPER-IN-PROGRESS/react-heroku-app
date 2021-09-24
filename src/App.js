import './App.css';
import React from 'react' ;
import { Route ,Switch ,Redirect } from 'react-router';
import { connect } from 'react-redux'; 
import { createStructuredSelector } from 'reselect';

import HomePage from './pages/homepage/homepage.component' ;
import ShopPage from './pages/shop/shop.component.jsx';
import './pages/homepage/homepage.styles.scss';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckoutPage from './pages/checkout/checkout.component';
import {auth , createUserProfileDocument} from './firebase/firebase.utils' ;
import { setCurrentUser } from './redux/user/user.actions' ; 
import { selectCurrentUser} from './redux/user/user.selectors' ; 
class App extends React.Component {
  

  unsubscribeFromAuth = null ; 

 componentDidMount(){
   const {setCurrentUser} = this.props ; 
  this.unsubscribeFromAuth =  auth.onAuthStateChanged(async userAuth =>{
   //this.setState ({ currentUser:user}) ;  

  // createUserProfileDocument(user) ;
  // console.log(user);
  if(userAuth){
 const userRef = await createUserProfileDocument(userAuth); 
  
userRef.onSnapshot( snapShot => {
    setCurrentUser ({
      id: snapShot.id , 
      ...snapShot.data()
  }) ;
 // console.log(this.state) ;
}) ; 
   }


   setCurrentUser({ userAuth })  ; 
   });
 }

 componentWillUnmount(){
    this.unsubscribeFromAuth(); 
 }

  render(){
    return (
      <div>
        <Header />
        <Switch>
        <Route  exact path='/' component={HomePage} />
        <Route   path='/shop' component={ShopPage} />
        <Route exact  path='/checkout' component={CheckoutPage} />        
        <Route exact   path='/signin' render={ () => this.props.currentUser ? (<Redirect to='/' />): (<SignInAndSignUpPage />) } />
        </Switch>
      </div>
    );
  } 
  
}

const mapStateToProps  = createStructuredSelector({
  currentUser: selectCurrentUser
}) ; 

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps )(App) ;