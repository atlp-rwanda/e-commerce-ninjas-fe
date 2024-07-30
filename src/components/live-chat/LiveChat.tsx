/* eslint-disable */
import React, { useEffect, useState, useRef } from "react";
import InputEmoji from "react-input-emoji";
import { RiImageAddLine, RiSendPlaneFill } from "react-icons/ri";
import {
  AiOutlineClose,
  AiOutlineMinus,
  AiOutlineMuted,
  AiOutlineSound,
} from "react-icons/ai";
import Zoom from "@mui/material/Zoom";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import io from "socket.io-client";
import { URL } from "../../utils/axios/axiosInstance";
import { getUserDetails } from "../../store/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { IUser } from "../../utils/types/store";
import { IoLogoWechat } from "react-icons/io5";
import notification from "../../../public/assets/notification.mp3";
import { uploadImage } from "../../store/features/chat/chatSlice";
import { Box, CircularProgress } from "@mui/material";
import { GrZoomIn } from "react-icons/gr";
import { VscCollapseAll } from "react-icons/vsc";
import { toast } from "react-toastify";

const LiveChat = () => {
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [users, setUsers] = useState([]);
  const [socket, setSocket] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [lastReadTimestamp, setLastReadTimestamp] = useState(null);
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(false);
  const [allImages, setAllImages] = useState([]);
  const notificationRef = useRef(new Audio(notification));
  const fileInputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { images, loading, error } = useAppSelector((state) => state.chat);
  const chatMessagesRef = useRef(null);
  const dispatch = useAppDispatch();
  const user: IUser | null = useAppSelector((state) => state?.auth?.user);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      dispatch(uploadImage(file));
    }
  };

  useEffect(() => {
    dispatch(getUserDetails(localStorage.getItem("token")));
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setCurrentUserId(user.id);
      setIsLoggedIn(true);
    }
  }, [user]);

  useEffect(() => {
    if (images.length > 0) {
      setAllImages(images);
    }
    if (allImages.length > 0) {
      localStorage.setItem("uploadedImages", JSON.stringify(allImages));
    }
  }, [images, allImages]);

  useEffect(() => {
    const newSocket = io(`${URL}/chats`, {
      auth: {
        token: localStorage.getItem("token"),
      },
    });

    setSocket(newSocket);

    newSocket.on("connect", () => {
      newSocket.emit("requestPastMessages");
    });

    newSocket.on("userJoined", (data) => {
      setUsers((prevUsers) => [...prevUsers, data.user]);
    });

    newSocket.on("userLeft", (data) => {
      setUsers((prevUsers) =>
        prevUsers.filter((user) => user.id !== data.user.id)
      );
    });

    newSocket.on("chatMessage", (data) => {
      const newMessage = {
        id: Date.now(),
        userId: data.user.id,
        text: data.message.message,
        username: data.user.firstName || data.user.role,
        timestamp: new Date(data.message.createdAt).toISOString(),
        profileImage: data.user.profilePicture,
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      if (data.user.id !== currentUserId) {
        if (isNotificationEnabled && (!isChatOpen || isMinimized)) {
          notificationRef.current.play();
        }
        if (
          !lastReadTimestamp ||
          new Date(newMessage.timestamp) > lastReadTimestamp
        ) {
          setUnreadCount((prevCount) => prevCount + 1);
        }
      }
    });

    newSocket.on("pastMessages", (data) => {
      console.log("Received past messages:", data);
      const oldMessages = data.map((msg) => ({
        id: msg.id || Date.now(),
        userId: msg.userId,
        username: msg.user.firstName || msg.user.role,
        text: msg.message,
        timestamp: new Date(msg.createdAt).toISOString(),
        profileImage: msg.user.profilePicture,
      }));
      setMessages(oldMessages);
    });

    newSocket.on("connect_error", (error) => {
      if (error.message === "Authentication error") {
        console.log("Authentication error detected. Closing chat.");
        setIsLoggedIn(false);
      }
      console.log("connection error", error);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    const savedTimestamp = localStorage.getItem(
      `lastReadTimestamp_${currentUserId}`
    );
    if (savedTimestamp) setLastReadTimestamp(new Date(savedTimestamp));
  }, [currentUserId]);

  useEffect(() => {
    const storedImages = localStorage.getItem("uploadedImages");
    if (storedImages) {
      const imagesArray = JSON.parse(storedImages);
      setAllImages(imagesArray);
    }
  }, [dispatch]);

  const sendMessage = () => {
    console.log(currentMessage);
    if ((currentMessage && currentMessage.trim() === "") || !socket) return;
    const currentUser = users.find((user) => user.id === currentUserId);

    if (currentUser) {
      let combinedMessage = currentMessage;
      if (allImages.length > 0) {
        const imagesString = allImages.join(", ");
        combinedMessage = `${imagesString} + ${currentMessage}`;
      }
      const newMessage = {
        id: Date.now(),
        userId: currentUser.id,
        username: currentUser.firstName || currentUser.role,
        text: combinedMessage,
        timestamp: new Date().toISOString(),
        profileImage: currentUser.profilePicture,
      };
      socket.emit("chatMessage", combinedMessage);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setCurrentMessage("");
      setAllImages([]);
      localStorage.removeItem("uploadedImages");
    } else {
      console.log("User not found in the user list.");
    }
  };

  const handleChangeMessage = (message: string) => {
    setCurrentMessage(message);
  };
  const isUnread = (messageTimestamp: any) => {
    return (
      !lastReadTimestamp ||
      new Date(messageTimestamp) > new Date(lastReadTimestamp)
    );
  };

  const handleScroll = () => {
    const chatContainer = chatMessagesRef.current;
    if (chatContainer) {
      const isBottom =
        chatContainer.scrollHeight - chatContainer.scrollTop <=
        chatContainer.clientHeight + 1;

      if (isBottom && messages.length > 0 && currentUserId) {
        try {
          const lastMessage = messages[messages.length - 1];
          if (!lastMessage) {
            throw new Error("Last message is undefined.");
          }

          const currentTimestamp = lastMessage.timestamp;

          if (!currentTimestamp) {
            console.error("Last message object:", lastMessage);
            throw new Error("Timestamp is missing or invalid.");
          }

          const lastMessageDate = new Date(currentTimestamp);

          if (isNaN(lastMessageDate.getTime())) {
            console.error(
              "Invalid date conversion. Timestamp:",
              currentTimestamp
            );
            throw new Error("Invalid date conversion.");
          }

          setLastReadTimestamp(lastMessageDate);
          localStorage.setItem(
            `lastReadTimestamp_${currentUserId}`,
            lastMessageDate.toISOString()
          );
          setUnreadCount(0);
        } catch (error) {
          console.error("Error in handleScroll:", error);
        }
      }
    }
  };

  useEffect(() => {
    if (messages.length > 0) {
      const newUnreadCount = messages.filter(
        (msg) =>
          msg.userId !== currentUserId &&
          (!lastReadTimestamp || new Date(msg.timestamp) > lastReadTimestamp)
      ).length;
      setUnreadCount(newUnreadCount);
    }
  }, [messages, lastReadTimestamp, currentUserId]);

  useEffect(() => {
    const chatContainer = chatMessagesRef.current;
    if (isChatOpen && chatContainer) {
      chatContainer.addEventListener("scroll", handleScroll);
    } else if (chatContainer) {
      chatContainer.removeEventListener("scroll", handleScroll);
    }
    return () => {
      if (chatContainer) {
        chatContainer.removeEventListener("scroll", handleScroll);
      }
    };
  }, [isChatOpen, messages]);

  useEffect(() => {
    const chatContainer = chatMessagesRef.current;
    if (isChatOpen && chatContainer) {
      chatContainer.addEventListener("scroll", handleScroll);
    } else if (chatContainer) {
      chatContainer.removeEventListener("scroll", handleScroll);
    }
    return () => {
      if (chatContainer) {
        chatContainer.removeEventListener("scroll", handleScroll);
      }
    };
  }, [isChatOpen, messages]);

  const SendTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      color: theme.palette.common.white,
      fontSize: "14px",
      padding: "5px 10px",
      borderRadius: "5px",
      maxWidth: 200,
      marginLeft: "5px",
      "&:hover": {
        backgroundColor: theme.palette.primary.dark,
      },
    },
  }));

  const toggleChat = () => {
    if (isLoggedIn) {
      setIsChatOpen(!isChatOpen);
    } else {
      toast.info("Please login first");
    }
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const toggleNotificationSound = () => {
    setIsNotificationEnabled((prev) => !prev);
    if (notificationRef.current) {
      const playPromise = notificationRef.current.play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log("Audio played successfully.");
          })
          .catch((error) => {
            console.log("Audio play failed:", error);
          });
      }
    }
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <div>
      {!isChatOpen ? (
        <div className="floating-chat-icon" onClick={toggleChat}>
          <span className="unreadCount">{unreadCount}</span>
          <SendTooltip title="Live Chat" TransitionComponent={Zoom}>
            <IconButton>
              <IoLogoWechat className="chat-icon" />
            </IconButton>
          </SendTooltip>
        </div>
      ) : (
        <div className={`live-chat ${isMinimized ? "minimized" : ""}`}>
          <div className="chat-header">
            <p>Live Chat | E-commerce Ninjas</p>
            <div className="chat-controls">
              {isMinimized ? (
                <SendTooltip title="Maximize" TransitionComponent={Zoom}>
                  <IconButton onClick={toggleMinimize}>
                    <VscCollapseAll color="#fff" />
                  </IconButton>
                </SendTooltip>
              ) : (
                <SendTooltip title="Minimize" TransitionComponent={Zoom}>
                  <IconButton onClick={toggleMinimize}>
                    <AiOutlineMinus color="#fff" />
                  </IconButton>
                </SendTooltip>
              )}

              <SendTooltip title="Close" TransitionComponent={Zoom}>
                <IconButton onClick={toggleChat}>
                  <AiOutlineClose color="#fff" />
                </IconButton>
              </SendTooltip>
              <SendTooltip
                title={
                  isNotificationEnabled
                    ? "Disable Notification Sound"
                    : "Enable Notification Sound"
                }
                TransitionComponent={Zoom}
                placement="left"
              >
                <IconButton onClick={toggleNotificationSound}>
                  {isNotificationEnabled ? (
                    <AiOutlineSound color="#fff" />
                  ) : (
                    <AiOutlineMuted color="#fff" />
                  )}
                </IconButton>
              </SendTooltip>
            </div>
          </div>
          {!isMinimized && (
            <>
              <div className="chat-messages" ref={chatMessagesRef}>
                {messages.map((msg, index) => {
                  let textImage = [];
                  let messageText = msg.text;
                  const isFirstUnread =
                    isUnread(msg.timestamp) &&
                    (index === 0 || !isUnread(messages[index - 1]?.timestamp));
                  if (messageText?.includes(" + ")) {
                    const [imagesPart, ...messageParts] =
                      messageText.split(" + ");
                    textImage = imagesPart
                      .split(", ")
                      .filter((url) => url.startsWith("http"));
                    messageText = messageParts.join(" + ");
                  }

                  return (
                    <React.Fragment key={msg.id}>
                      {isFirstUnread && (
                        <div className="unread-badge-container">
                          <span className="unread-badge">New</span>
                        </div>
                      )}
                      <div
                        className={`chat-message ${isUnread(msg.timestamp) ? "unread" : ""} ${
                          msg.userId === currentUserId
                            ? "chat-message-right"
                            : "chat-message-left"
                        }`}
                      >
                        <div className="profile-image">
                          <img
                            src={msg.profileImage}
                            alt="User profile"
                            className="user-profile-img"
                          />
                        </div>
                        <div className="message-content">
                          <span className="username">
                            {msg.username?.toLowerCase()}
                          </span>
                          <span>{messageText}</span>
                          {(msg.images?.length > 0 || textImage.length > 0) && (
                            <div className="images-container">
                              {(msg.images || textImage).map((image, idx) => (
                                <div key={idx} className="imageDisplay">
                                  <img
                                    src={image}
                                    alt={`Image ${idx}`}
                                    onClick={() => handleImageClick(image)}
                                  />
                                  <GrZoomIn
                                    className="zoomIn"
                                    onClick={() => handleImageClick(image)}
                                  />
                                </div>
                              ))}
                            </div>
                          )}
                          <span className="timestamp">
                            {new Date(msg.timestamp)
                              .toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: true,
                              })
                              .toUpperCase()}
                          </span>
                        </div>
                      </div>
                    </React.Fragment>
                  );
                })}
              </div>
              <div className="chat-inputs">
                {allImages
                  ? allImages.map((msg, index) => (
                      <div key={index} className="imageDisplay">
                        <img src={msg} alt={`Image ${index}`} />
                      </div>
                    ))
                  : null}
                <div className="chat-input">
                  <InputEmoji
                    value={currentMessage}
                    onChange={handleChangeMessage}
                    placeholder="Type a message..."
                    onEnter={sendMessage}
                    cleanOnEnter
                    shouldReturn={false}
                    shouldConvertEmojiToImage={false}
                    borderColor="#ff6d18"
                  />
                  <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleImageUpload}
                  />
                  <SendTooltip title="Send Image">
                    {loading ? (
                      <Box sx={{ display: "flex" }}>
                        <CircularProgress />
                      </Box>
                    ) : (
                      <IconButton onClick={() => fileInputRef.current.click()}>
                        <RiImageAddLine
                          className="send-btn"
                          style={{ fontSize: "3.5rem" }}
                        />
                      </IconButton>
                    )}
                  </SendTooltip>
                  <SendTooltip TransitionComponent={Zoom} title="Send">
                    <IconButton onClick={sendMessage}>
                      <RiSendPlaneFill className="send-btn" />
                    </IconButton>
                  </SendTooltip>
                </div>
              </div>
            </>
          )}
        </div>
      )}
      <audio ref={notificationRef} src={notification} preload="auto" />
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <img src={selectedImage} alt="Selected" className="modal-image" />
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveChat;
