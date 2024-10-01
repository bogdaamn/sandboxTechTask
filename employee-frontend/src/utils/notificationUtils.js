export const showNotification = (setNotification, setIsError, message, isSuccess = true) => {
    setNotification(message);
    setIsError(!isSuccess);
    setTimeout(() => {
        setNotification(null);
    }, 7000);
};
