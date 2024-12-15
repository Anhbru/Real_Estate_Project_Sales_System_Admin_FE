import React from 'react';

const AlertMessageError = (error) => {
    const handleMessage = (error) => {
        let response = error.response.data;
        console.log(response)
        const errors = response.errors || {};
        let errorMessages = [];
        for (const field in errors) {
            if (Array.isArray(errors[field])) {
                errorMessages = errorMessages.concat(errors[field]);
            }
        }

        if (errorMessages.length > 0) {
            alert(errorMessages.join('\n'));
        } else {
            alert("Error, Please try again!");
        }
    }

    return (
        handleMessage(error)
    );
};

export default AlertMessageError;
