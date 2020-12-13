import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ImageIcon from "@material-ui/icons/Image";
import {
  Typography,
  Grid,
  Paper,
  Button,
  Divider,
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  CircularProgress,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import CloseIcon from "@material-ui/icons/Close";
import ImportContactsIcon from "@material-ui/icons/ImportContacts";
import { useAuthentication } from "../../context/auth";
import {
  getUserByUid,
  hiddenFlashcardById,
  deleteCreatedById,
} from "../../services/users";
import { deleteFlashcardById } from "../../services/flashcards";
import "./Term.scss";





const Term = () => {
  const tabNow = new URLSearchParams(window.location.search).get("tab");
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  const [tab, setTab] = useState(tabNow ? ~~tabNow : 2);
  const { currentUser } = useAuthentication();
  const changeBackgroundColor = (tabNumber) => {
    return tabNumber === tab ? "#ffcd1f" : "#fff";
  };

  const getData = async () => {
    try {
      const data = await getUserByUid(currentUser.uid);
      setUser(data);
    } catch (error) {
      console(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const hiddenFlashcard = async (id) => {
    setLoading(true);
    await hiddenFlashcardById(user, id);
    await getData();
  };

  const deleteFlashcard = async (id) => {
    setLoading(true);
    await deleteFlashcardById(id);
    await deleteCreatedById(user, id);
    await getData();
  };

  return (
    <div>
      {loading ? (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
          }}
        >
          <CircularProgress />
        </div>
      ) : (
        <Grid>
          <div className="DashboardPage-header">
            <div className="DashboardHeader" role="contentinfo" tabIndex={-1}>
              <div className="UIContainer">
                <div className="ProfileHeader">
                  <div className="ProfileHeader-user">
                    <div className="ProfileHeader-avatarContainer">
                      <span
                        className="UserAvatar"
                        style={{ height: "116px", width: "116px" }}
                      >
                        <div className="Image">
                          <img
                            className="Image-image"
                            height={116}
                            referrerPolicy="no-referrer"
                            src={currentUser.photoURL}
                            width={116}
                          />
                        </div>
                      </span>
                    </div>
                    <div className="ProfileHeader-mainContent">
                      <div className="ProfileHeader-headline">
                        <p className="ProfileHeader-username">
                          <h3 className="UIHeading UIHeading--two">
                            {currentUser.displayName}
                          </h3>
                        </p>
                        <p className="ProfileHeader-userInfo">
                          <span className="ProfileHeader-userFullName">
                            {currentUser.email}
                          </span>
                          <span className="ProfileHeader-onlineIndicator">
                            <span className="UIOnlineIndicator" />
                          </span>
                        </p>
                      </div>
                      <div className="ProfileHeader-tabs">
                        <div className="UIToggle">
                          <span
                            className="UIToggle-option"
                            style={{
                              backgroundColor: changeBackgroundColor(1),
                            }}
                            onClick={() => setTab(1)}
                          >
                            <span className="UIToggle-optionLabel">
                              Hoạt động gần đây
                            </span>
                          </span>
                          <span
                            className="UIToggle-option"
                            style={{
                              backgroundColor: changeBackgroundColor(2),
                            }}
                            onClick={() => setTab(2)}
                          >
                            <span className="UIToggle-optionLabel">Đã tạo</span>
                          </span>
                          <span className="UIToggle-option">
                            <span
                              className="UIToggle-optionLabel"
                              style={{
                                backgroundColor: changeBackgroundColor(3),
                              }}
                              onClick={() => setTab(3)}
                            >
                              Đã học
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>{getTab()}</div>
        </Grid>
      )}
    </div>
  );
};

export default Term;
