import React,{Component} from 'react'
import {connect} from 'react-redux'
import * as actionCreator from '../../Store/actions'
import Aux from '../../hoc/Aux'
import Spinner from '../../components/UI/Spinner/Spinner'
import './Orders.css'
import Order from '../../components/Order/Order'
import Axios from '../../Axios'
import NotAuthenticated from '../../components/UI/NotAuthenticated/NotAuthenticated'
import Backdrop from '../../components/UI/Backdrop/Backdrop'

class Orders extends Component{
    state = {
        orders: null
    }
    getOrders = ()=>{
        Axios.get('/api/order/get-order', {
            headers: {
                'x-access-token': this.props.token
            }
        })
        .then(response => {
            this.setState({orders: response.data.data})
        })
        .catch(err => {
            if(err.response && err.response.status === 404){
                this.setState({orders: []})
            }
        })
    }
    componentDidUpdate(prevProps, prevState){
        if(prevProps.token !== this.props.token){
            this.getOrders()
        }
    }
    componentDidMount(){
        this.getOrders()
    }

    cancelOrderPage = ()=> {
        this.props.history.push("/")
    }
    render(){
        let toShow = <Spinner />
        if(!this.props.token){
            toShow= <NotAuthenticated cancelPage={this.cancelOrderPage} show/>
        }

        if(this.state.orders && this.state.orders.length>=3 ){
            console.log(this.state.orders)
            toShow = this.state.orders.map(oneOrder=> (
                <Order
                key={oneOrder._id}
                id={oneOrder._id}
                deliveryStatus={oneOrder.status}
                productName={oneOrder.product.name}
                date = {oneOrder.orderDate.toString()}
                />
            ))
        }else if(this.state.orders &&  this.state.orders.length === 0){
            toShow = (
                <p className="noOrder">You dont have an order yet !!!</p>
            )
        }
        return (
            <Aux>
                <Backdrop toggled={!this.props.token}/>
                    <p className="Orders__Title">Orders</p>
                    {toShow}
            </Aux>
        )
    }
}

const propsMappedToState = (state)=> {
    return {
        token : state.userData.token
    }
}

export default connect(propsMappedToState)(Orders)