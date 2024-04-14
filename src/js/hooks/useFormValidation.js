import { useState, useEffect, useContext } from 'react';
import { isValidPhoneNumber } from 'libphonenumber-js'
import { Context } from "../store/appContext";

const useFormValidation = () => {
    const { store } = useContext(Context);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [phone, setPhone] = useState("");
    const [isPhoneValid, setIsPhoneValid] = useState(true);
    const [address, setAddress] = useState("");
    const [isValid, setIsValid] = useState(false);
    const [wasValidated, setWasValidated] = useState(false);

    
    useEffect(() => {
        const initializeValidation = () => {
            const forms = document.querySelectorAll('.needs-validation');

            Array.prototype.slice.call(forms).forEach(function (form) {
                form.addEventListener('submit', function (event) {
                    if (!form.checkValidity()) {
                        event.preventDefault();
                        event.stopPropagation();
                    }

                    form.classList.add('was-validated');
                    setWasValidated(true);
                }, false);
            });
        };

        initializeValidation();
    }, []);

    useEffect(() => {
        validateEmail();
    }, [email]);

    useEffect(() => {
        validatePhoneNumber();
    }, [phone]);

    useEffect(() => {
        validate();
    }, [email, isEmailValid, phone, isPhoneValid]);

    function validate() {
        setIsValid(
           (address.trim() !== "" || isEmailValid || isPhoneValid) && 
           (phone === "" || isPhoneValid) &&
           (email === "" || isEmailValid) 
        );
    }

    const validateEmail = () => {
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setIsEmailValid(pattern.test(email));
    };

    const validatePhoneNumber = () => {
        setIsPhoneValid(isValidPhoneNumber(phone, store.selectedAlphaCode));
    };

    function resetFields() {
        setName("");
        setAddress("");
        setEmail("");
        setPhone("");
        setWasValidated(false);
        setIsEmailValid(false);
        setIsPhoneValid(false);
        setIsValid(false);

        store.selectedAlphaCode = "";
        store.selectedCode = "";

        const forms = document.querySelectorAll('.needs-validation');

        Array.prototype.slice.call(forms).forEach(function (form) {
            form.classList.remove('was-validated');
        }, false);
    }

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
        isPhoneValid,
        isValid,
        resetFields,
        wasValidated,
    };
};

export default useFormValidation;