"use client";

import { ChangeEvent, FormEvent, useState } from "react";

interface UserFormData {
  username: string;
  user_email: string;
  password: string;
  confirmPassword: string;
}

// Define a type for the error messages
interface FormErrors {
  username?: string;
  user_email?: string;
  password?: string;
  confirmPassword?: string;
  apiError?: string;
}

export default function CreateAccount({
  handleSubmit,
}: {
  handleSubmit: Function;
}) {
  const [formData, setFormData] = useState<UserFormData>({
    username: "",
    user_email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    let formErrors: FormErrors = {};
    if (!formData.username) formErrors.username = "Username is required";
    if (!formData.user_email) formErrors.user_email = "Email is required";
    if (!formData.password) formErrors.password = "Password is required";
    if (formData.password !== formData.confirmPassword)
      formErrors.confirmPassword = "Passwords do not match";
    return formErrors;
  };

  const submitFunction = (e: FormEvent) => {
    e.preventDefault();
    const formErrors = validate();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      const user = new URLSearchParams();
      user.append("user[username]", formData.username);
      user.append("user[user_email]", formData.user_email);
      user.append("user[password]", formData.password);
      user.append("check", "0");
      handleSubmit(user);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={submitFunction}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          {errors.username && <p style={{ color: "red" }}>{errors.username}</p>}
        </div>
        <div>
          <label>Email:</label>
          <input
            type="text"
            name="user_email"
            value={formData.user_email}
            onChange={handleChange}
          />
          {errors.user_email && (
            <p style={{ color: "red" }}>{errors.user_email}</p>
          )}
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
        </div>
        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && (
            <p style={{ color: "red" }}>{errors.confirmPassword}</p>
          )}
        </div>
        {errors.apiError && <p style={{ color: "red" }}>{errors.apiError}</p>}
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
