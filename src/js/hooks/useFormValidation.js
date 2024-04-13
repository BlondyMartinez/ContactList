import { useState, useEffect } from 'react';

const useFormValidation = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        validateEmail();
    }, [email]);

    useEffect(() => {
        validate();
    }, [email, isEmailValid]);

    function validate() {
        setIsValid(
        address.trim() !== "" ||
        isEmailValid ||
        phone.trim() !== ""
        );
    }

    const validateEmail = () => {
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setIsEmailValid(pattern.test(email));
    };

    return {
        name,
        setName,
        email,
        setEmail,
        phone,
        setPhone,
        address,
        setAddress,
        isEmailValid,
        isValid
    };
};

export default useFormValidation;