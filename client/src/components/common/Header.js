import React from "react";
import clsx from "clsx";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import Timer from "./Timer";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { logout } from "../../actions/userActions";

const Header = ({
  history,
  appBar,
  appBarShift,
  open,
  drawerSpacing,
  users: { avatar }
}) => {
  return (
    <AppBar
      position="fixed"
      className={clsx(appBar, {
        [appBarShift]: open
      })}
    >
      <Toolbar>
        <div style={styles.headerMain}>
          <Typography
            style={{
              paddingLeft: drawerSpacing,
              color: "#000",
              textTransform: "uppercase",
              fontWeight: "600",
              fontSize: "3vw"
            }}
          >
            Dashboard
          </Typography>
          <div style={styles.headerContainer}>
            <div style={styles.avatarContainer}>
              <Timer />
              <img
                alt="avatar"
                src={avatar}
                title="Logout"
                onClick={() => {
                  logout();
                  return history.push("/login");
                }}
                style={styles.avatarImage}
              />
            </div>
          </div>
        </div>
      </Toolbar>
    </AppBar>
  );
};

const styles = {
  headerMain: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  avatarImage: {
    paddingLeft: "2%",
    width: "17%",
    cursor: "pointer",
    borderRadius: "100px"
  },
  avatarContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end"
  },
  headerContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  }
};

const mapStateToProps = state => ({
  users: state.users
});

export default connect(mapStateToProps, { logout })(withRouter(Header));
