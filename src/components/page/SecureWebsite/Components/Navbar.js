





import React, { useState } from "react";
import { Navbar, Container, Nav, Offcanvas } from "react-bootstrap";
import { IoMenu } from "react-icons/io5";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../Assets/logodsl.png";
import Drawer from "../Home/Drawer";
import { useWallet } from "../Hooks/useConnectWallet";

const AppNavbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // To determine the current path
  const { walletAddress, user, ethBalance, ethBalanceUsdt, connectWallet } = useWallet();

  const handleMenuToggle = () => {
    setIsDrawerOpen(true);
  };

  const getLinkStyle = (path) => {
    // Check if the current path matches the link path
    if (location.pathname === path) {
      return { color: "#f0a500", fontWeight: "bold" }; // Active link style
    }
    return { color: "#fff" }; // Default link style
  };

  return (
    <Navbar
      style={{ height: "80px" }}
      bg="dark"
      variant="dark"
      expand="lg"
      className="px-3"
    >
      <Container>
        {/* Left Side: Logo */}
        <Navbar.Brand
          onClick={() => navigate("")}
          style={{ cursor: 'pointer' }}
        // href=""
        >
          <img
            src={logo}
            alt="Logo"
            className="d-inline-block align-top"
            style={{ borderRadius: "8px", height: "50px", width: "50px" }}
          />
        </Navbar.Brand>

        <Offcanvas.Body className="d-none d-lg-block">
          {/* Menu Links */}
          <Nav className="justify-content-end flex-grow-1 pe-3">
            <Nav.Link
              onClick={() => navigate("/about-us")}
              style={getLinkStyle("/about-us")}
            >
              About Us
            </Nav.Link>
            {/* <Nav.Link
              onClick={() => navigate("/contact-us")}
              style={getLinkStyle("/contact-us")}
            >
              Contact Us
            </Nav.Link> */}

            <Nav.Link
              onClick={() => navigate("/pricing")}
              style={getLinkStyle("/pricing")}
            >
              Pricing
            </Nav.Link>
            <Nav.Link
              onClick={() => navigate("/how-it-works")}
              style={getLinkStyle("/how-it-works")}
            >
              How It Works
            </Nav.Link>
            <Nav.Link
              onClick={() => navigate("/faqs")}
              style={getLinkStyle("/faqs")}
            >
              Faqs
            </Nav.Link>
            <Nav.Link
              onClick={() => navigate("/past-opportunities")}
              style={getLinkStyle("/past-opportunities")}
            >
              Past Opportunities
            </Nav.Link>
            <Nav.Link
              onClick={() => navigate("/token-bot")}
              style={getLinkStyle("/token-bot")}
            >
              Token Bot
            </Nav.Link>
            <Nav.Link
              onClick={() => navigate("/opportunity-bot")}
              style={getLinkStyle("/opportunity-bot")}
            >
              Opportunity Bot
            </Nav.Link>
            {/* <button 
            onClick={connectWallet}
            >
              Wallet Login
            </button> */}


            {!user?.walletAddress? <button
            className="btn"
            style={{
              background: 'linear-gradient(45deg, #5B86E5, #36D1DC)', // Stylish gradient for the button
              color: '#FFFFFF',
              padding: '8px',
              fontSize: '12px',
              fontWeight: 'bold',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: '0.3s ease',
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'scale(1)';
              e.target.style.boxShadow = '0px 6px 15px rgba(0, 0, 0, 0.4)';
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'scale(1)';
              e.target.style.boxShadow = '0px 4px 10px rgba(0, 0, 0, 0.3)';
            }}
            onClick={connectWallet}
          >
            Connect to Wallet
          </button>
          :
          // <p className="text-white"></p>
          <Nav.Link
            onClick={() => navigate("/dashboard")}
            style={getLinkStyle("/dashboard")}
          >
            {user?.walletAddress ? `${user?.walletAddress.slice(0, 5)}...` : "No Wallet Address"}
          </Nav.Link>

          }
            {/* <Nav.Link
              onClick={() => navigate("/auto-bot")}
              style={getLinkStyle("/auto-bot")}
            >
              Auto BOT
            </Nav.Link> */}
          </Nav>
        </Offcanvas.Body>

        {/* Right Side: Menu Icon for Small Devices */}
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          className="border-0"
          onClick={handleMenuToggle}
        >
          <IoMenu size={30} color="white" />
        </Navbar.Toggle>
      </Container>

      {/* Drawer Component */}
      <div className="text-left">
        <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
      </div>
    </Navbar>
  );
};

export default AppNavbar;
