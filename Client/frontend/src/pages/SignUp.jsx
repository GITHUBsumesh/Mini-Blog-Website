import React, { useContext, useState } from "react";
import * as Mui from "@mui/material";
import * as MuiIcons from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Navigate, useNavigate } from "react-router-dom";
import { Context, server } from "../main";
import toast from "react-hot-toast";
import axios from "axios";
import { handleReload } from "../lib/features";
const theme = createTheme({
  components: {
    MuiFormControl: {
      styleOverrides: {
        root: {
          borderRadius: "1rem",
          minWidth: "300px",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: ".9rem", // Default label font size
          transform: "translate(14px, 26px) scale(1)", // Initial position
          "&.MuiInputLabel-shrink": {
            transform: "translate(16px, -6px) scale(0.75)", // When focused or filled
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          height: "40px", // Adjust input height
          borderRadius: "1rem", // Rounded corners
        },
        input: {
          fontSize: ".9rem", // Input text size
          padding: "0 14px", // Inner padding
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiInputBase-root": {
            backgroundColor: "white",
            color: "black",
            borderRadius: "1rem",
            height: 40,
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#ccc",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#888",
          },
          "& .MuiInputLabel-root": {
            transform: "translate(14px, 12px) scale(1)", // Adjust label position and size
            fontSize: "0.9rem", // Optional: Change label font size if needed
          },
          "& .MuiInputLabel-shrink": {
            transform: "translate(14px, -8px) scale(0.75)", // Adjust label when shrunk (focused or filled)
          },
        },
      },
    },
  },
});

const bg = "linear-gradient(147deg, #e85c64 0%, #f45671 50%, #ec5786 100%)";
const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isAuthenticated, setIsAuthenticated, loading, setLoading } =
    useContext(Context);

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };
  const navigate = useNavigate();
  const navigateToLogin = () => {
    setTimeout(() => {
      navigate("/login");
    }, 200);
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${server}/users/register`,
        {
          name,
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      toast.success(data.message);
      setIsAuthenticated(true);
      setLoading(false);
      setTimeout(() => handleReload(), 1000);
    } catch (error) {
      console.log(error.response.data.message);
      toast.error(error.response.data.message);
      setIsAuthenticated(false);
      setLoading(false);
    }
  };
  // useEffect(() => {handleReload()}, []);

  if (isAuthenticated) return <Navigate to={"/"} />;
  return (
    <ThemeProvider theme={theme}>
      <Mui.Container
        sx={{
          position: "fixed", // Or 'fixed' if you want it to remain in place on scroll
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)", // Centers the container
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "70vh",
          width: "55vw",
          overflow: "hidden",
        }}
      >
        <Mui.Paper
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "stretch",
            justifyContent: "center",
            width: "50vw",
            height: "55vh",
            overflow: "hidden",
          }}
          elevation={6}
        >
          <Mui.Box
            sx={{
              width: "50%",
              background:
                "linear-gradient(147deg, #e85c64 0%, #f45671 50%, #ec5786 100%);",
              display: "flex",
              flexDirection: "column",
              alignItems: " center",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            <Mui.Typography
              variant="h4"
              color="white"
              fontSize={27}
              fontWeight={800}
            >
              Welcome to SignUp
            </Mui.Typography>
            <Mui.Typography
              variant="h7"
              color="white"
              fontSize={15}
              sx={{
                marginTop: "1rem",
              }}
            >
              Already have an account?
            </Mui.Typography>
            <Mui.Button
              type="submit"
              variant="outlined"
              sx={{
                marginTop: "1rem",
                background: "transparent",
                color: "white",
                borderRadius: "1.2rem",
                borderColor: "white",
                "&:hover": {
                  background: "transparent",
                },
              }}
              onClick={navigateToLogin}
            >
              Login
            </Mui.Button>
          </Mui.Box>

          <Mui.Box
            sx={{
              width: "50%",
              backgroundColor: "transparent",
              padding: "3rem",
              fontWeight: "bold",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              overflow: "hidden",
            }}
          >
            <Mui.Typography
              variant="h4"
              sx={{
                color: "black",
                bgcolor: "white",
                marginBottom: "rem",
              }}
            >
              Sign Up
              <form
                onSubmit={handleSubmit}
                style={{
                  backgroundColor: "transparent",
                }}
              >
                <Mui.TextField
                  label="Name"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  required
                  value={name}
                  // size='small'
                  onChange={(e) => setName(e.target.value)}
                  sx={{
                    "& .MuiInputBase-root": {
                      height: 40, // Adjust the height of the input field
                    },
                    "& .MuiInputLabel-root": {
                      transform: "translate(14px, 12px) scale(1)", // Adjust label position and size
                      fontSize: "0.8rem", // Optional: Change label font size if needed
                    },
                    "& .MuiInputLabel-shrink": {
                      transform: "translate(14px, -8px) scale(0.75)", // Adjust label when shrunk (focused or filled)
                    },
                  }}
                />
                <Mui.TextField
                  label="Email"
                  type="email"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {/* <Mui.TextField
                  label="Password"
                  variant="outlined"
                  fullWidth
                  type="password"
                  margin="normal"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                /> */}

                <Mui.FormControl variant="outlined">
                  <Mui.InputLabel
                    htmlFor="outlined-adornment-password"
                    sx={{
                      "&.MuiInputLabel-shrink": {
                        transform: "translate(16px, 10px) scale(0.75)", // When focused or filled
                      },
                    }}
                  >
                    Password*
                  </Mui.InputLabel>
                  <Mui.OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? "text" : "password"}
                    required
                    sx={{
                      marginTop: "1rem",
                    }}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    endAdornment={
                      <Mui.InputAdornment position="end">
                        <Mui.IconButton
                          aria-label={
                            showPassword
                              ? "hide the password"
                              : "display the password"
                          }
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          onMouseUp={handleMouseUpPassword}
                          edge="end"
                        >
                          {showPassword ? (
                            <MuiIcons.VisibilityOff />
                          ) : (
                            <MuiIcons.Visibility />
                          )}
                        </Mui.IconButton>
                      </Mui.InputAdornment>
                    }
                    label="Password"
                  />
                </Mui.FormControl>

                <Mui.Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  color="primary"
                  sx={{
                    marginTop: "1rem",
                    background: bg,
                    color: "white",
                    borderRadius: "1rem",
                    "&:hover": {
                      background: bg,
                    },
                  }}
                  // onClick={handleSignUp}
                >
                  Sign Up
                </Mui.Button>

                <Mui.Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: "1rem",
                  }}
                ></Mui.Box>
              </form>
            </Mui.Typography>
          </Mui.Box>
        </Mui.Paper>
      </Mui.Container>
    </ThemeProvider>
  );
};

export default SignUp;
