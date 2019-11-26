import React from "react";
import { Card, CardContent, Typography, CardActions } from "@material-ui/core";
import { MailOutline, Phone, MoreVert, StarBorder } from "@material-ui/icons";
import { connect } from "react-redux";
import {
  CircularProgressbarWithChildren,
  buildStyles
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import otherUser from "../../assets/user-profile.jpg";

const UserCards = ({
  users,
  userCount,
  userName,
  userPhone,
  userEmail,
  userAvatar
}) => {

  return (
    <Card style={styles.cardMain}>
      <CardContent style={styles.cardContentMain}>
        <div style={styles.avatarContainer}>
          <MoreVert style={styles.moreVert} />
          <div style={styles.avatarSubContainer}>
            <CircularProgressbarWithChildren
              backgroundPadding={0}
              background
              strokeWidth={4}
              styles={buildStyles({})}
              value={userCount ? userCount : 60}
              maxValue={60}
            >
              <img
                alt="avatar"
                style={styles.avatar}
                src={userAvatar ? userAvatar : otherUser}
              />
            </CircularProgressbarWithChildren>
          </div>
          <StarBorder style={{ color: "orange" }} />
        </div>
        <div style={{ textAlign: "center", margin: "auto" }}>
          <Typography>{userName ? userName : "Adriana Pazos"}</Typography>
          <Typography style={{ fontSize: "1vw" }}>Administrator</Typography>
        </div>
      </CardContent>
      <CardActions
        style={{ display: "flex", flexDirection: "column", padding: "10%" }}
      >
        <div style={styles.cardActionsEmail}>
          <MailOutline style={{ fontSize: "1.5vw", color: "grey" }} />
          <Typography style={{ fontSize: "1vw" }}>
            {userEmail ? userEmail : "adriana.pazos@gmail.com"}
          </Typography>
        </div>
        <div style={styles.cardActionPhone}>
          <Phone style={{ fontSize: "1.5vw", color: "grey" }} />
          <Typography style={{ fontSize: "1.3vw" }}>
            {userPhone ? userPhone : "+1 987 654 3210"}
          </Typography>
        </div>
      </CardActions>
    </Card>
  );
};

const styles = {
  cardMain: { margin: "1% 1.5%", width: "35%", borderRadius: "3%" },
  cardContentMain: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "column"
  },
  avatarContainer: {
    paddingBottom: "8%",
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "flex-start"
  },
  moreVert: { color: "grey" },
  avatarSubContainer: { width: "35%" },
  avatar: { width: "93%", height: "auto", borderRadius: "100px" },
  cardActionsEmail: {
    paddingBottom: "3%",
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center"
  },
  cardActionPhone: {
    margin: 0,
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  }
};

const mapStateToProps = state => ({
  users: state.users
});

export default connect(mapStateToProps, {})(UserCards);
