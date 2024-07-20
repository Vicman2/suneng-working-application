import React, {Component} from 'react'
import openSocket from 'socket.io-client'
import Axios from '../../../Axios'
import './Contact.css'
import Aux from '../../../hoc/Aux'
import Spinner from '../../../components/UI/Spinner/Spinner'
import { connect } from 'react-redux'
import SingleDetail from '../../../components/SingleDetail/SingleDetail'

class Contact extends Component{
    state = {
        wantedContacts: 5,
        contactFetched :null,
        pageNumber: 0,
        totalPages: null,
        totalContacts:0 
    }
    getContact = (pageNumber)=>{
        Axios.get(`/api/user/get-contact?pageNumber=${pageNumber}&numberOfContacts=${this.state.wantedContacts}`, {
            headers: {
                'x-access-token': this.props.token
            }
        })
        .then(response => {
            console.log(response.data.data)
            let assumedFloat = response.data.data.noOfContact/this.state.wantedContacts
            let totalPages = (assumedFloat % 1) === 0 ? assumedFloat : Math.floor(assumedFloat)  + 1
            this.setState((prev, props)=>{
                return {contactFetched: response.data.data.contactDetails, 
                totalContacts: response.data.data.noOfContact,
                pageNumber: prev.pageNumber === 0 ? prev.pageNumber+1: prev.pageNumber,
                totalPages: totalPages
                }
            })
        })
    }
    addContactDetails = (contact)=> {
        const updatedDetails = [...this.state.contactFetched]
        updatedDetails.unshift(contact);
        this.setState((prevState) => {
            return {
                contactFetched : updatedDetails, 
                totalContacts: prevState.totalContacts +1
            }
        })
    }
    componentDidMount(){ 
        this.getContact(1)
        const socket = openSocket('http://localhost:2020');
        socket.on('contacts', data => {
            if(data.action == 'sent'){
                this.addContactDetails(data.contact)
            }
        })
    }
    previousContacts = () => {
        let prevPage = this.state.pageNumber - 1 >= 1 ? this.state.pageNumber -1: 1
        if(prevPage < this.state.totalPages && prevPage>=1){
            this.getContact(prevPage)
            this.setState((prev, props) => {
                return {pageNumber : prev.pageNumber -1}
            })
        }
    }
    nextContacts = () => {
        let nextPage = this.state.pageNumber + 1 <= this.state.totalPages ? this.state.pageNumber +1: this.state.pageNumber
        if(nextPage > this.state.pageNumber && nextPage<= this.state.totalPages){
            this.getContact(nextPage)
            this.setState((prev, props) => {
                return {pageNumber : prev.pageNumber +1}
            })
        }
    }
    render(){
        let prev, next
        if(this.state.pageNumber>=2){
            prev = <p className="Arrow" onClick={this.previousContacts}>Previous</p>
        }else{
            prev = null
        }
        if(this.state.pageNumber< this.state.totalPages){
            next = <p className="Arrow" onClick={this.nextContacts}>Next</p>
        }else{
            next = null
        }
        let toShow = <Spinner />
        if(this.state.contactFetched && this.state.totalContacts > 0){
            toShow = this.state.contactFetched.map(contact => (
                <SingleDetail 
                name={contact.name}
                email={contact.email}
                phone={contact.phone}
                subject={contact.subject}
                />
            ))
        }
        return(
            <Aux>
                <div className="Contacts_Details">
                    <div className="Contact_Title_Div">
                        <p className="Contact__Title">CONTACTS</p>
                    </div>
                    <section className="Operations">
                        <div className="Pagination_Contact">
                            {prev}
                            <p> {this.state.pageNumber} of  {this.state.totalPages} </p>
                            {next}
                        </div>
                    </section>
                    <section className="actions">
                        <p className="detailerName">Name</p>
                        <p className="detailerEmail">Email</p>
                        <p className="detailerPhone">Phone</p>
                        <p className="detailerSubject"> Subject</p>
                    </section>
                    {toShow}
                </div>
            </Aux>
        )
    }
}
const propsMappedToState = (state)=> {
    return{
        token : state.userData.token
    }
}

export default connect(propsMappedToState) (Contact)