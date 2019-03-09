import React, { Component} from'react';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import './ContactData.css';

import { connect } from 'react-redux';
import axios from '../../../axios-orders';
import * as actions from '../../../store/actions/index';
import checkValidation from '../../../shared/validation';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';

class ContactData extends Component {

    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            number: {
                elementType: 'input',
                elementConfig: {
                    type: 'number',
                    placeholder: 'Your Number'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 10,
                    maxLength: 10
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Address'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            postalCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Postal Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6,
                    maxLength: 6
                },
                valid: false,
                touched: false
            },
            paymentType: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'creditOrDebitCard', displayValue: 'Credit/Debit Card' },
                        { value: 'netBanking', displayValue: 'Net Banking' },
                        { value: 'cod', displayValue: 'Cash on Delivery' },
                    ],
                },
                value: 'cod',
                validation: {
                    required: false
                },
                valid: true,
                touched: false
            }
        },

        loading: false,
        formIsValid: false
    }

    orderHandler = (event) => {
        
        event.preventDefault();
        
        const formData = {};
        
        for(let key in this.state.orderForm) {
            formData[key] = this.state.orderForm[key].value;
        }

        // console.log(formData);
        
        this.setState({loading: true});

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            orderData: formData,
            userId: this.props.userId
        };

       this.props.onOrderBurger(order, this.props.token);
        
    }

    inputChangedHandler = (event, inputElement) => {
        
        const updatedForm = {
            ...this.state.orderForm
        };

        const updatedFormElement = {
            ...updatedForm[inputElement]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.touched = true;
        updatedFormElement.valid = checkValidation(updatedFormElement.value, updatedFormElement.validation);
        updatedForm[inputElement] = {
            ...updatedFormElement
        };

        let formIsValid = true;
        for(let inputItem in updatedForm) {
            formIsValid = updatedForm[inputItem].valid && formIsValid;
        }
        this.setState({
            orderForm: updatedForm,
            formIsValid: formIsValid   
        });
    }


    render() {

        const formElementsArray = [];

        for(let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]

            });
        }

        let form = (
                <form onSubmit={this.orderHandler}>
                    {formElementsArray.map(formElement => (
                        <Input 
                            key={formElement.id}
                            elementType={formElement.config.elementType} 
                            elementConfig={formElement.config.elementConfig} 
                            value={formElement.config.value}
                            invalid={!formElement.config.valid}
                            touched={formElement.config.touched}
                            changed={(event) => this.inputChangedHandler(event, formElement.id)}/>
                    ))}
                    <Button btnType='Success' disabled={!this.state.formIsValid}>Order</Button>
                </form>
        );

        if(this.props.loading) {
            form = <Spinner />;
        }

        return (
            <div className='ContactData'>
                <h4>Enter your contact data</h4>
                {form}
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));