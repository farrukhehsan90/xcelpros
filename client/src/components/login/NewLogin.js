import React, { Component } from "react";
import {
  Dialog,
  DialogContent,
  Typography,
  Button,
  OutlinedInput,
  withStyles
} from "@material-ui/core";
import backgroundLogin from "../../assets/login-main.jpeg";
import {
  Facebook,
  SentimentSatisfied,
  SentimentVeryDissatisfied
} from "@material-ui/icons";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { register, login } from "../../actions/userActions";

class NewLogin extends Component {
  state = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    showJoiningDetails: false
  };

  componentDidMount() {}

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onLogin = () => {
    const {
      showJoiningDetails,
      firstName,
      lastName,
      email,
      password
    } = this.state;
    const { history } = this.props;

    if (showJoiningDetails) {
      return this.props.register(
        { firstName, lastName, email, password },
        history
      );
    }

    return this.props.login(email, password, history);
  };

  render() {
    const {
      email,
      password,
      showJoiningDetails,
      firstName,
      lastName
    } = this.state;
    const { classes } = this.props;
    const { user } = this.props.users;
    const { errors } = user;

    return (
      <Dialog fullScreen open={true}>
        <DialogContent style={{ display: "flex", padding: 0, margin: 0 }}>
          <div style={styles.mainImageContainer}>&nbsp;</div>
          <div style={styles.formMainContainer}>
            <div style={styles.formSubContainer}>
              <Typography
                style={{
                  fontSize: "2.1vw",
                  fontWeight: "800",
                  whiteSpace: "nowrap"
                }}
              >
                {showJoiningDetails
                  ? "Join our community!"
                  : "Login to our community!"}
              </Typography>
              <Typography style={{ fontSize: "1vw", whiteSpace: "nowrap" }}>
                {showJoiningDetails
                  ? "Already have an account"
                  : "Don't have an account?"}
                <span
                  style={{ fontWeight: "900", cursor: "pointer" }}
                  onClick={() =>
                    this.setState({ showJoiningDetails: !showJoiningDetails })
                  }
                >
                  {showJoiningDetails ? "Login" : "Sign Up"}
                </span>
              </Typography>
              <Button variant="contained" style={styles.facebookButton}>
                <Facebook style={{ paddingRight: "2%", fontSize: "2vw" }} />
                <Typography
                  style={{ textTransform: "none", fontSize: "1.1vw" }}
                >
                  {showJoiningDetails
                    ? "Login via facebook"
                    : "Join via facebook"}
                </Typography>
              </Button>
              {showJoiningDetails ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%"
                  }}
                >
                  <div style={styles.firstNameMain}>
                    <div style={styles.firstNameSub}>
                      <Typography style={{ fontSize: "1.2vw" }}>
                        First Name
                      </Typography>
                      {errors ? (
                        errors.firstName ? (
                          <SentimentVeryDissatisfied
                            style={{ fontSize: "1.5vw", color: "red" }}
                          />
                        ) : (
                          <SentimentSatisfied
                            style={{ fontSize: "1.5vw", color: "green" }}
                          />
                        )
                      ) : null}
                    </div>
                    <OutlinedInput
                      value={firstName}
                      name="firstName"
                      onChange={this.onChange}
                      classes={{
                        input: classes.textField
                      }}
                      variant="outlined"
                      style={{ width: "100%", padding: "0" }}
                    />
                  </div>
                  <div style={styles.lastNameMain}>
                    <div style={styles.lastNameSub}>
                      <Typography style={{ fontSize: "1.2vw" }}>
                        Last Name
                      </Typography>
                      {errors ? (
                        errors.lastName ? (
                          <SentimentVeryDissatisfied
                            style={{ fontSize: "1.5vw", color: "red" }}
                          />
                        ) : (
                          <SentimentSatisfied
                            style={{ fontSize: "1.5vw", color: "green" }}
                          />
                        )
                      ) : null}
                    </div>
                    <OutlinedInput
                      value={lastName}
                      name="lastName"
                      onChange={this.onChange}
                      classes={{
                        input: classes.textField
                      }}
                      variant="outlined"
                      style={{ width: "100%", padding: "0" }}
                    />
                  </div>
                </div>
              ) : null}
              <div style={styles.emailFieldMainContainer}>
                <div style={styles.emailFieldSubContainer}>
                  <Typography style={{ fontSize: "1.2vw" }}>
                    Email Address
                  </Typography>
                  {errors ? (
                    errors.email ? (
                      <Typography
                        style={{
                          fontSize: "1.2vw",
                          color: "red",
                          whiteSpace: "nowrap"
                        }}
                      >{`(${errors.email})`}</Typography>
                    ) : null
                  ) : null}
                  {errors ? (
                    errors.email ? (
                      <SentimentVeryDissatisfied
                        style={{ fontSize: "1.5vw", color: "red" }}
                      />
                    ) : (
                      <SentimentSatisfied
                        style={{ fontSize: "1.5vw", color: "green" }}
                      />
                    )
                  ) : null}
                </div>
                <OutlinedInput
                  value={email}
                  name="email"
                  onChange={this.onChange}
                  classes={{
                    input: classes.textField
                  }}
                  variant="outlined"
                  style={{ width: "100%", padding: "0" }}
                />
              </div>

              <div style={styles.passwordFieldMainContainer}>
                <div style={styles.passwordFieldContainer}>
                  <Typography style={{ fontSize: "1.2vw" }}>
                    Password
                  </Typography>
                  {errors ? (
                    errors.password ? (
                      <Typography
                        style={{
                          fontSize: "1.2vw",
                          color: "red",
                          whiteSpace: "nowrap"
                        }}
                      >{`(${errors.password})`}</Typography>
                    ) : null
                  ) : null}
                  {errors ? (
                    errors.password ? (
                      <SentimentVeryDissatisfied
                        style={{ fontSize: "1.5vw", color: "red" }}
                      />
                    ) : (
                      <SentimentSatisfied
                        style={{ fontSize: "1.5vw", color: "green" }}
                      />
                    )
                  ) : null}
                </div>
                <OutlinedInput
                  value={password}
                  name="password"
                  type="password"
                  onChange={this.onChange}
                  classes={{
                    input: classes.textField
                  }}
                  variant="outlined"
                  style={{ width: "100%", padding: "0" }}
                />
              </div>
              <Button
                onClick={this.onLogin}
                variant="contained"
                style={styles.loginButton}
              >
                <Typography
                  style={{ textTransform: "none", fontSize: "1.1vw" }}
                >
                  {showJoiningDetails
                    ? "Join our community!"
                    : "Login to our community!"}
                </Typography>
              </Button>
              <Typography style={{ fontSize: "1vw" }}>
                By joining, you agree to the{" "}
                <span style={{ fontWeight: "800" }}>Terms</span> and{" "}
                <span style={{ fontWeight: "800" }}>Privacy Policy</span>
              </Typography>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }
}

const styles = {
  textField: {
    padding: "3%"
  },
  loginButton: {
    height: "9%",
    boxShadow: "0 0",
    color: "#fff",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alingItems: "center",
    backgroundColor: "#0fe87c"
  },
  passwordFieldContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%"
  },
  passwordFieldMainContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%"
  },
  mainImageContainer: {
    backgroundImage: `url(${backgroundLogin})`,
    backgroundSize: "100% 100%",
    backgroundRepeat: "no-repeat",
    width: "50%"
  },
  formMainContainer: {
    display: "flex",
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  formSubContainer: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "65%",
    height: "85%",
    flexDirection: "column"
  },
  facebookButton: {
    height: "9%",
    boxShadow: "0 0",
    color: "#fff",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alingItems: "center",
    backgroundColor: "#3b5998"
  },
  emailFieldMainContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%"
  },
  emailFieldSubContainer: {
    fontSize: "1.5vw",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%"
  },
  firstNameMain: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "48%"
  },
  firstNameSub: {
    fontSize: "1.5vw",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%"
  },
  lastNameMain: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "48%"
  },
  lastNameSub: {
    fontSize: "1.5vw",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%"
  }
};

const mapStateToProps = state => ({
  users: state.users
});

export default connect(mapStateToProps, { login, register })(
  withStyles(styles)(withRouter(NewLogin))
);
