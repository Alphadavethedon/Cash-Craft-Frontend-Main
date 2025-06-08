// Add this validation function
const validateForm = () => {
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }
    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return false;
    }
    if (!/^(07\d{8}|[+]2547\d{8})$/.test(phoneNumber)) {
      setError("Invalid phone format. Use 07XXXXXXXX or +2547XXXXXXXX");
      return false;
    }
    return true;
  };
  
  // Modify your submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
  
    try {
      const response = await axios.post('http://localhost:3000/api/register', {
        firstName,
        lastName,
        email,
        phoneNumber,
        password
      });
      console.log('Registration success:', response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };