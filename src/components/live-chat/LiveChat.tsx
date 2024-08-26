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
import { URL } from "../../utils/axios/axiosInstance";
import { clearImages } from "../../store/actions/resetAction";
import { IoIosCloseCircle } from "react-icons/io";
import EmojiPicker, { EmojiStyle, Theme } from "emoji-picker-react";
import { Empty } from "antd";
import { getToken } from "../../utils/protectRoute/ProtectedRoute";

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
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(true);
  const [allImages, setAllImages] = useState([]);
  const fileInputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const notificationRef = useRef(null);
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const { images, loading, error } = useAppSelector((state) => state.chat);
  const chatMessagesRef = useRef(null);
  const inputRef = useRef(null);
  const lastMessageRef = useRef(null);
  const dispatch = useAppDispatch();
  const user: IUser = useAppSelector((state) => state?.auth?.user);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      dispatch(uploadImage(file));
    }
  };

  useEffect(() => {
    const token = getToken();
    setTimeout(() => {
      dispatch(getUserDetails(token));
    }, 100);
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setCurrentUserId(user.id);
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
      setIsChatOpen(false);
      setIsMinimized(false);
      setUnreadCount(0);
    }
  }, [user]);

  useEffect(() => {
    if (images.length > 0) {
      setAllImages(images);
    }
  }, [images]);

  useEffect(() => {
    const token = getToken();
    if (isLoggedIn) {
      const newSocket = io(`${URL}/chats`, {
        auth:{
          token: token
        }
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
        if (isNotificationEnabled && (!isChatOpen || isMinimized)) {
          notificationRef.current.play();
        }
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
          if (
            !lastReadTimestamp ||
            new Date(newMessage.timestamp) > lastReadTimestamp
          ) {
            setUnreadCount((prevCount) => prevCount + 1);
          }
        }
      });

      newSocket.on("pastMessages", (data) => {
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
    }
  }, [isLoggedIn]);

  useEffect(() => {
    const savedTimestamp = localStorage.getItem(
      `lastReadTimestamp_${currentUserId}`
    );
    if (savedTimestamp) setLastReadTimestamp(new Date(savedTimestamp));
  }, [currentUserId]);

  const sendMessage = () => {
    if (
      (currentMessage &&
        currentMessage.trim() === "" &&
        allImages.length === 0) ||
      !socket
    )
      return;
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
      dispatch(clearImages());
      setTimeout(() => {
        localStorage.removeItem("uploadedImages");
        setAllImages([]);
      }, 100);
    } else {
      console.log("User not found in the user list.");
    }
  };

  useEffect(() => {
    const storedImages = localStorage.getItem("uploadedImages");
    if (storedImages) {
      const imagesArray = JSON.parse(storedImages);
      setAllImages(imagesArray);
    }
  }, [dispatch]);

  useEffect(() => {
    if (messages.length > 0 && isChatOpen) {
      lastMessageRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [messages, isChatOpen]);
  const handleChangeMessage = (event) => {
    setCurrentMessage(event.target.value);
  };
  const handleEmojiClick = (emojiData) => {
    if (inputRef.current) {
      const input = inputRef.current;
      const start = input.selectionStart;
      const end = input.selectionEnd;
      const newValue =
        currentMessage.slice(0, start) +
        emojiData.emoji +
        currentMessage.slice(end);
      setCurrentMessage(newValue);

      setTimeout(() => {
        input.setSelectionRange(
          start + emojiData.emoji.length,
          start + emojiData.emoji.length
        );
        input.focus();
      }, 0);
      setIsEmojiPickerOpen((prev) => !prev);
    }
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
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  const removeImage = (index: number) => {
    setAllImages((prev) => prev.filter((_, i) => i !== index));
    const updatedImages = allImages.filter((_, i) => i !== index);
    localStorage.setItem("uploadedImages", JSON.stringify(updatedImages));
    dispatch(clearImages);
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
                {messages.length > 0 ? (
                  messages.map((msg, index) => {
                    let textImage = [];
                    let messageText = msg.text;
                    const isFirstUnread =
                      isUnread(msg.timestamp) &&
                      (index === 0 ||
                        !isUnread(messages[index - 1]?.timestamp));
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
                            <span style={{ marginBottom: ".5rem" }}>
                              {messageText}
                            </span>
                            {(msg.images?.length > 0 ||
                              textImage.length > 0) && (
                              <div className="images-container">
                                {(msg.images || textImage).map(
                                  (image: string, idx: number) => (
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
                                  )
                                )}
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
                          {index === messages.length - 1 && (
                            <div ref={lastMessageRef} />
                          )}
                        </div>
                      </React.Fragment>
                    );
                  })
                ) : (
                  <div className="no-chats-message">
                    <Empty
                      image={Empty.PRESENTED_IMAGE_SIMPLE}
                      description={"No chats available. Start a conversation🤖"}
                    />
                  </div>
                )}
              </div>
              <div className="chat-inputs">
                {allImages && allImages.length > 0 && (
                  <div className="imagesDiv">
                    {allImages
                      ? allImages.map((msg, index) => (
                          <div key={index} className="imageDisplay">
                            <img src={msg} alt={`Image ${index}`} />
                            <span
                              className="closeIcon"
                              onClick={() => {
                                removeImage(index);
                              }}
                            >
                              <IoIosCloseCircle />
                            </span>
                          </div>
                        ))
                      : null}
                  </div>
                )}
                <div className="chat-input">
                  <input
                    className="input"
                    type="text"
                    value={currentMessage}
                    onChange={handleChangeMessage}
                    placeholder="Type a message..."
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    ref={inputRef}
                    style={{
                      fontFamily:
                        "Apple Color Emoji, Segoe UI Emoji, Noto Color Emoji, sans-serif",
                    }}
                  />
                  <SendTooltip title="emoji" TransitionComponent={Zoom}>
                    <IconButton
                      onClick={() => setIsEmojiPickerOpen((prev) => !prev)}
                    >
                      <span
                        style={{
                          fontSize: "4.5rem",
                          textAlign: "center",
                          color: "#01260b",
                        }}
                      >
                        ☺️
                      </span>
                    </IconButton>
                  </SendTooltip>
                  <div className="emoji-picker-container">
                    <EmojiPicker
                      open={isEmojiPickerOpen}
                      theme={Theme.DARK}
                      emojiStyle={EmojiStyle.GOOGLE}
                      onEmojiClick={handleEmojiClick}
                    />
                  </div>
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
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              <IoIosCloseCircle />
            </span>
            <img src={selectedImage} alt="Selected" className="modal-image" />
          </div>
        </div>
      )}
      <audio ref={notificationRef}>
        <source src={notification} type="audio/mpeg" />
      </audio>
    </div>
  );
};

export default LiveChat;
