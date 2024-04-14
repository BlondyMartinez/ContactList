import { useState, useEffect } from 'react';

const useFormValidation = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [isEmailValid, setIsEmailValid] = useState(true);
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

    function resetFields() {
        setName("");
        setAddress("");
        setEmail("");
        setPhone("");
        setWasValidated(false);
        setIsEmailValid(false);
        setIsValid(false);
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
        isValid,
        resetFields,
        wasValidated,
    };
};

export default useFormValidation;