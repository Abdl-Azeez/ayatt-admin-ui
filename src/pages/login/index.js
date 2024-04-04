import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Checkbox, Link, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

const Login = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');


    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleLogin = () => {
        // Basic validation
        if (!email) {
            setEmailError('Email is required');
            return;
        }

        if (!isValidEmail(email)) {
            setEmailError('Invalid email format');
            return;
        }

        setEmailError('');

        if (!password) {
            setPasswordError('Password is required');
            return;
        }

        // Clear any previous password error
        setPasswordError('');

        // Perform login logic
        // Example: Call API endpoint to authenticate user
        console.log('Perform login with:', { email, password });
    };

    const isValidEmail = (email) => {
        // Basic email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    return (
        <Box className="flex h-screen items-center justify-center" style={{ backgroundColor: colors.primary[500] }}>
            <Box width="100%" maxWidth="md" borderRadius={4} bgcolor={colors.primary[400]} color={colors.grey[100]} p={4}>
                <div className='text-center'>
                    <Header title="LOGIN" subtitle="Welcome back! Please log in to continue." />
                </div>
                <Box className="flex justify-center mb-8">
                    <Box className="mb-2 flex h-20 w-20 items-center justify-center rounded-full border-4 border-white" style={{ backgroundColor: colors.blueAccent[700] }}>
                        <AccountCircleOutlinedIcon className="h-20 w-20 text-white" />
                    </Box>
                </Box>
                <form className="mb-4" noValidate
                    autoComplete="off">

                    <TextField
                        fullWidth
                        variant="outlined"
                        InputProps={{
                            style: {
                                borderRadius: 4,
                                backgroundColor: colors.blueAccent[700],
                                color: colors.grey[100],
                                marginBottom: 40,
                            },
                            placeholder: 'Email ID',
                            startAdornment: <MailOutlineOutlinedIcon className='mr-4' />,
                        }}
                        InputLabelProps={{
                            style: {
                                color: colors.grey[100],
                                fontSize: 18, // Increase the label size
                                fontWeight: 'bold',
                                marginLeft: '-10px',
                            },
                        }}
                        id="email"
                        type="email"
                        label="Email ID"
                        value={email}
                        onChange={handleEmailChange}
                        error={!!emailError}
                        helperText={<Typography variant="caption" color="error" style={{ top: '50px', position: 'absolute', fontSize: '12px' }}>{emailError}</Typography>}
                    />
                    <TextField
                        fullWidth
                        variant="outlined"
                        InputProps={{
                            style: {
                                borderRadius: 4,
                                backgroundColor: colors.blueAccent[700],
                                color: colors.grey[100],
                                marginBottom: 15,
                            },
                            placeholder: 'Password',
                            startAdornment: <LockOutlinedIcon className='mr-4' />,
                        }}
                        InputLabelProps={{
                            style: {
                                color: colors.grey[100],
                                fontSize: 18, // Increase the label size
                                fontWeight: 'bold',
                                marginLeft: '-10px',
                            },
                        }}
                        id="password"
                        type="password"
                        label="Password"
                        value={password}
                        onChange={handlePasswordChange}
                        error={!!passwordError}
                        helperText={<Typography variant="caption" color="error" style={{ top: '50px', position: 'absolute', fontSize: '12px' }}>{passwordError}</Typography>}
                    />
                    <Box className="mb-6 flex items-center justify-between">
                        <Box className="flex items-center">
                            <Checkbox id="remember-me" sx={{
                                color: colors.blueAccent[100],
                                '&.Mui-checked': {
                                    color: colors.blueAccent[600],
                                },
                            }} />
                            <Typography className="ml-2 text-sm" htmlFor="remember-me" component="label">
                                Remember me
                            </Typography>
                        </Box>
                        <Link className="text-sm" href="#" sx={{
                            color: colors.blueAccent[100],

                        }}>
                            Forgot Password?
                        </Link>
                    </Box>
                    <Button
                        fullWidth
                        variant="contained"
                        style={{
                            borderRadius: 4,
                            backgroundColor: colors.blueAccent[800],
                            color: colors.grey[100],
                            fontSize: 18,
                            paddingTop: 10,
                            paddingBottom: 10,
                            fontWeight: "bold"
                        }}
                        onClick={handleLogin}
                    >
                        LOGIN
                    </Button>
                </form>
            </Box>
        </Box>
    );
}

export default Login;