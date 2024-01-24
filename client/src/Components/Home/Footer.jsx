import React from "react";
import "./footer.css";
import logo from "../../assets/logo.png";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import XIcon from "@mui/icons-material/X";
import YouTubeIcon from "@mui/icons-material/YouTube";

function Footer(){
  return (
    <div className="footer-container">
      <div className="footer">
        <div className="left">
          <div className="logo">
            <img src={logo} alt="" />
          </div>
          <ul className="offers">
            <li>
              <a href="#c">Courses</a>
            </li>
            <li>
              <a href="#c">Careers</a>
            </li>
            <li>
              <a href="#c">FAQs</a>
            </li>
            <li>
              <a href="#c">Contact Us</a>
            </li>
            <li>
              <a href="#c">Privacy Policy</a>
            </li>
            <li>
              <a href="#c">Events</a>
            </li>
          </ul>
        </div>

        <div className="center">
          <h2 className="location">
            Ngong Lane, Ngong Lane Plaza, 1st Floor, Nairobi Kenya
          </h2>
          <ul className="contacts">
            <li>
              <a href="#d">
                <LocalPhoneIcon sx={{ color: "#fb5607" }} />
                <span>0205002167 (General Enquiries)</span>
              </a>
            </li>
            <li>
              <a href="#d">
                <LocalPhoneIcon sx={{ color: "#fb5607" }} />
                <span>0207643533 (Admissions)</span>
              </a>
            </li>
            <li>
              <a href="#d">
                <LocalPhoneIcon sx={{ color: "#fb5607" }} />
                <span>0738368319 (Corporate Inquiries)</span>
              </a>
            </li>
            <li>
              <a href="#d">
                <EmailIcon sx={{ color: "#fb5607" }} />
                <span>contact@moringaschool.com</span>
              </a>
            </li>
            <li>
              <a href="#d">
                <EmailIcon sx={{ color: "#fb5607" }} />
                <span>admissions@moringaschool.com</span>
              </a>
            </li>
            <li>
              <a href="#d">
                <EmailIcon sx={{ color: "#fb5607" }} />
                <span>corporate@moringaschool.com</span>
              </a>
            </li>
            <li>
              <a href="#d">
                <EmailIcon sx={{ color: "#fb5607" }} />
                <span>P.O Box 28860 - 00100, Nairobi</span>
              </a>
            </li>
          </ul>
        </div>
        <div className="right">
          <a href="#q">
            <FacebookIcon sx={{fontSize:"2rem"}}/>
          </a>
          <a href="#q">
            <LinkedInIcon sx={{fontSize:"2rem"}}/>
          </a>
          <a href="#q">
            <XIcon sx={{fontSize:"2rem"}}/>
          </a>
          <a href="#q">
            <YouTubeIcon sx={{fontSize:"2rem"}}/>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;