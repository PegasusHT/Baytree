import * as React from 'react';
import "../../css/loginpage/LoginPage.css"
import "../../css/loginpage/password.css"
import "../../css/loginpage/username.css"
import "../../css/loginpage/styleguide.css"
import baytreeLeafBackground from "../../resources/Static/Images/baytree-leaves.png"
import loginWindowBorder from "../../resources/Static/Images/login-page-border.png"
import baytreeLogo from "../../resources/Static/Images/baytree-logo.png"
import usernameTextBox from "../../resources/Static/Images/username-textbox.png"
import passwordTextBox from "../../resources/Static/Images/password-textbox.png"
import usernameText from "../../resources/Static/Images/username-text.png"
import passwordText from "../../resources/Static/Images/password-text.png"
import loginButtonBorder from "../../resources/Static/Images/login-button-boundary.png"
import loginButtonText from "../../resources/Static/Images/login-button-text.png"
import iForgotMyPasswordRedirection from "../../resources/Static/Images/i-forgot-my-password.png"
import mentorshipProgrammeText from "../../resources/Static/Images/mentorship-programme-text.png"
import whatTypeOfUsersText from "../../resources/Static/Images/what-type-of-user-text.png"
import userTypeSelected from "../../resources/Static/Images/user-type-selected.png"
import userTypeUnselected from "../../resources/Static/Images/user-type-not-selected.png"
import adminText from "../../resources/Static/Images/admin-text.png"
import mentorText from "../../resources/Static/Images/mentor-text.png"
import loginPageText from "../../resources/Static/Images/login-page-text.png"
import {Link} from "react-router-dom"

interface LoginState {
    username: string,
    password: string
}

export class LoginForm extends React.Component<{}, LoginState> {
    constructor(props: any) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.resetForm = this.resetForm.bind(this);
    }

    handleSubmit(event: any) {
        this.setState({
            username: this.state.username,
            password: this.state.password
        }, this.processLogin)
        this.resetForm(event)
        event.preventDefault()
    }

    processLogin() {
        // TODO: Send Post Request to backend to retrieve a security token
    }

    handleUsernameChange(event: any) {
        this.setState({username: event.target.value});
    }

    handlePasswordChange(event: any) {
        this.setState({password: event.target.value});
    }

    resetForm(event: any) {
        this.setState({
            username: "",
            password: ""
        })
    }

    render() {
        return (
            <div className="container-center-horizontal">
                <div className="loginpage">
                    <div className="baytree-leaf-background" style={{ backgroundImage: `url(${baytreeLeafBackground})` }}>
                        <img className="login-window" src={loginWindowBorder} alt={""}/>
                        <img className="baytree-logo" src={baytreeLogo} alt={""}/>
                        <img className="username-textbox" src={usernameTextBox} alt={""}/>
                        <img className="username-text" src={usernameText} alt={""}/>
                        <img className="password-text" src={passwordText} alt={""}/>
                        <img className="password-textbox" src={passwordTextBox} alt={""}/>
                        <div className="login-button" onClick={this.handleSubmit}>
                            <Link to={"/dashboard"}>
                            <div className="overlap-login-button">
                                <img className="login-button-border" src={loginButtonBorder} alt={""}/>
                                <img className="login-text" src={loginButtonText} alt={""}/>
                            </div>
                            </Link>
                        </div>
                        <img className="i-forgot-my-password-redirection" src={iForgotMyPasswordRedirection} alt={""}/>
                        <img className="mentorship-programme-text" src={mentorshipProgrammeText} alt={""}/>
                        <img className="what-type-of-user-text" src={whatTypeOfUsersText} alt={""}/>
                        <img className="account-type-selected" src={userTypeSelected} alt={""}/>
                        <img className="account-type-unselected" src={userTypeUnselected} alt={""}/>
                        <img className="admin-text" src={adminText} alt={""}/>
                        <img className="mentor-text" src={mentorText} alt={""}/>
                        <img className="login-page-text" src={loginPageText} alt={""}/>
                        <input
                            className="username helvetica-extra-light-mountain-mist"
                            name="userNameBox"
                            value={this.state.username}
                            onChange = {this.handleUsernameChange}
                            placeholder="Username"
                            type="text"
                        />
                        <input
                            className="password helvetica-extra-light-mountain-mist"
                            name="passwordBox"
                            value={this.state.password}
                            onChange = {this.handlePasswordChange}
                            placeholder="Password"
                            type="password"
                        />
                    </div>
                </div>
            </div>

        );
    }
}

