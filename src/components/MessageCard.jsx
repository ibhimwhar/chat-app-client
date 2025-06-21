const MessageCard = ({ msg }) => {
    const currentUserId = JSON.parse(atob(localStorage.getItem("token").split('.')[1])).id;
    const isSender = msg.from._id === currentUserId;

    return (
        <div
            className={`p-2 rounded mb-2 max-w-[75%] ${isSender ? "ml-auto bg-green-100 text-right" : "bg-gray-100"
                }`}
        >
            <div className="text-xs text-gray-500 font-medium mb-1">
                {isSender ? "You" : msg.from.username}
            </div>
            <p className="text-gray-800">{msg.text}</p>
        </div>
    );
};

export default MessageCard;
