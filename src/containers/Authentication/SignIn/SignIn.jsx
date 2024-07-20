import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionCreator from "../../../Store/actions";
import Axios from "../../../Axios";
import Aux from "../../../hoc/Aux";
import InputWithIcon from "../../../components/UI/InputWithIcon/InputWithIcon";
import Backdrop from "../../../components/UI/Backdrop/Backdrop";
import Spinner from "../../../components/UI/Spinner/Spinner";
import "./SignIn.css";

class SignIn extends Component {
  state = {
    isFormValid: false,
    isSubmited: false,
    loading: false,
    serverError: false,
    invalidFormErrorMessage:
      "Please, fill the forms accurately before you submit",
    formInputs: {
      name: {
        elemType: "input",
        config: {
          type: "text",
          placeholder: "Your name",
        },
        value: "",
        validation: function () {
          return (
            this.value.trim() !== "" &&
            this.value.length >= 3 &&
            this.value.length <= 30
          );
        },
        isValid: false,
        errorMessage: "Name must be up to 3 letters",
        touched: false,
        iconName: "person",
      },
      email: {
        elemType: "input",
        config: {
          type: "text",
          placeholder: "Email",
        },
        value: "",
        validation: function () {
          const emailRegex =
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return emailRegex.test(this.value);
        },
        isValid: false,
        errorMessage: "Please input a valid email address",
        touched: false,
        iconName: "mail",
      },
      password: {
        elemType: "input",
        config: {
          type: "password",
          placeholder: "Password",
        },
        value: "",
        validation: function () {
          return (
            this.value.trim() !== "" &&
            this.value.length >= 5 &&
            this.value.length <= 30
          );
        },
        isValid: false,
        errorMessage: "Add a strong passkey whose length is not less than 5",
        touched: false,
        iconName: "key",
      },
    },
    verifyPassword: {
      elemType: "input",
      config: {
        type: "password",
        placeholder: "Verify password",
      },
      value: "",
      isValid: false,
      errorMessage: "Passwords do not match",
      touched: false,
      iconName: "key",
    },
  };

  formElementChangeHandler = (event, elemName) => {
    const updatedFormInputs = {
      ...this.state.formInputs,
      [elemName]: {
        ...this.state.formInputs[elemName],
        value: event.target.value,
        isValid: this.state.formInputs[elemName].validation(),
        touched: true,
      },
    };

    this.setState({ formInputs: updatedFormInputs }, this.checkValidity);
  };

  verifyPasswordHandler = (event) => {
    const password = this.state.formInputs.password.value;
    const verifyPassword = {
      ...this.state.verifyPassword,
      value: event.target.value,
      touched: true,
      isValid: password === event.target.value,
    };

    this.setState({ verifyPassword }, this.checkValidity);
  };

  checkValidity = () => {
    const isFormValid =
      Object.values(this.state.formInputs).every((input) => input.isValid) &&
      this.state.verifyPassword.isValid;

    this.setState({ isFormValid });
  };

  clearFields = () => {
    const resetFormInputs = Object.fromEntries(
      Object.entries(this.state.formInputs).map(([key, input]) => [
        key,
        { ...input, value: "", isValid: false, touched: false },
      ])
    );

    this.setState({
      formInputs: resetFormInputs,
      verifyPassword: {
        ...this.state.verifyPassword,
        value: "",
        isValid: false,
        touched: false,
      },
    });
  };

  formSubmitHandler = async (event) => {
    event.preventDefault();
    this.setState({ isSubmited: true });

    if (this.state.isFormValid) {
      const data = Object.keys(this.state.formInputs).reduce((acc, key) => {
        acc[key] = this.state.formInputs[key].value;
        return acc;
      }, {});

      this.setState({ loading: true });

      try {
        const response = await Axios.post("/api/user/signup", data);
        this.setState({ loading: false, serverError: false });
        this.props.onLogin(response.data.details);
        this.clearFields();
        localStorage.setItem(
          "sunengUserData",
          JSON.stringify(response.data.details)
        );
        this.props.clicked(); // Assuming `clicked` closes the form
      } catch (error) {
        this.setState({ loading: false });
        const errorMessage = error.response
          ? error.response.data.message
          : "There was a server error, try later";
        this.setState({
          invalidFormErrorMessage: errorMessage,
          isFormValid: false,
        });
      }
    }
  };

  render() {
    const formElements = Object.entries(this.state.formInputs).map(
      ([elementName, config]) => ({
        id: elementName,
        config,
      })
    );

    const isClicked = this.props.showUp;
    const classes = ["SignInWrapper", isClicked ? "showSignIn" : "hidden"];
    const subMitErrorClass = [
      "ErrorMessage",
      (this.state.isSubmited && !this.state.isFormValid) ||
      this.state.serverError
        ? "Show__Error"
        : "Hide__Error",
    ];

    let submitButton = (
      <button disabled={!this.state.isFormValid}>Submit</button>
    );
    if (this.state.loading) {
      submitButton = <Spinner />;
    }

    return (
      <Aux>
        <Backdrop toggled={isClicked} clicked={this.props.clicked} />
        <div className={classes.join(" ")}>
          <div className="SignIn">
            <div className="CancelButton" onClick={this.props.clicked}>
              <button>Cancel</button>
            </div>
            <h1>Create an account</h1>
            <p className={subMitErrorClass.join(" ")}>
              {this.state.invalidFormErrorMessage}
            </p>
            <form onSubmit={this.formSubmitHandler}>
              {formElements.map(({ id, config }) => (
                <InputWithIcon
                  key={id}
                  elemType={config.elemType}
                  config={config.config}
                  value={config.value}
                  iconName={config.iconName}
                  errorMessage={config.errorMessage}
                  changed={(event) => this.formElementChangeHandler(event, id)}
                  valid={config.isValid}
                  touched={config.touched}
                />
              ))}
              <InputWithIcon
                elemType={this.state.verifyPassword.elemType}
                config={this.state.verifyPassword.config}
                value={this.state.verifyPassword.value}
                iconName={this.state.verifyPassword.iconName}
                errorMessage={this.state.verifyPassword.errorMessage}
                changed={this.verifyPasswordHandler}
                valid={this.state.verifyPassword.isValid}
                touched={this.state.verifyPassword.touched}
              />
              <div className="Submit__Wrapper">{submitButton}</div>
            </form>
          </div>
        </div>
      </Aux>
    );
  }
}

const mapStateToProps = (state) => ({
  loggedIn: state.isLoggedIn,
});

const mapDispatchToProps = (dispatch) => ({
  onLogin: (payload) => dispatch(actionCreator.login(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
