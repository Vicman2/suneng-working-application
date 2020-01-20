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
    componentDidMount(){
        Axios.get('/api/order/get-order', {
            headers: {
                'x-access-token': this.props.token
            }
        })
        .then(response => {
            console.log(response)
            this.setState({orders: response.data.data})
        })
        .catch(err => {
            console.log(err)
        })
    }

    cancelOrderPage = ()=> {
        this.props.history.push("/")
    }
    render(){
        console.log(this.props)
        let toShow = <Spinner />
        if(!this.props.token){
            toShow= <NotAuthenticated cancelPage={this.cancelOrderPage} show/>
        }

        if(this.state.orders){
            toShow = this.state.orders.map(oneOrder=> (
                <Order
                key={oneOrder._id}
                id={oneOrder._id}
                deliveryStatus={oneOrder.status}
                productName={oneOrder.product.name}
                date = {oneOrder.orderDate.toString()}
                />
            ))
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