import React from "react";
import "./App.scss";
import "./fonts.css";
import Header from "./components/header/Header";
import PrimaryButton from "./components/buttons/PrimaryButton";
// import logo from "./images/basic_portrait_1.2-18.png";
// import logo2 from "./images/basic_portrait_2.2-19.png";
// import logo1 from "./images/basic_portrait_3.2-20.png";

import logo from "./images/320x300_1.1-18.png";
import logo2 from "./images/320x300_2.1-18.png";
import logo1 from "./images/320x300_3.1-18.png";

import hti from "./images/htw-01.jpeg";
import hti1 from "./images/htw-02.jpeg";
import hti2 from "./images/htw-03.jpeg";


import Carousel from "./components/carousel/Carousel";
import {
  Item,
  AppContainer,
  ExtraInfo,
  CopyRight
  // Code
} from "./components/carousel/components";
import FAQs from "./components/faq/FAQs";

const isReq = {"required": true};

function App() {

  var docElem = window.document.documentElement;

  function getViewportH () {
    var client = docElem['clientHeight'],
      inner = window['innerHeight'];

    return (client < inner) ? inner : client;
  }


  function getOffset (el) {
    var offsetTop = 0,
        offsetLeft = 0;

    do {
      if (!isNaN(el.offsetTop)) {
        offsetTop += el.offsetTop;
      }
      if (!isNaN(el.offsetLeft)) {
        offsetLeft += el.offsetLeft;
      }
    } while (el = el.offsetParent)

    return {
      top: offsetTop,
      left: offsetLeft
    }
  }

  function isElementInViewport (el, h) {
    var scrolled = window.pageYOffset,
        viewed = scrolled + getViewportH(),
        elH = el.offsetHeight,
        elTop = getOffset(el).top,
        elBottom = elTop + elH,
        h = h || 0;

    return (elTop + elH * h) <= viewed && (elBottom) >= scrolled;
  }

  function extend (a, b) {
    for (var key in b) {
      if (b.hasOwnProperty(key)) {
        a[key] = b[key];
      }
    }
    return a;
  }


  function scrollReveal(options) {
      this.options = extend(this.defaults, options);
      this._init();
  }



  scrollReveal.prototype = {
    defaults: {
      axis: 'y',
      distance: '25px',
      duration: '0.66s',
      delay: '0s',

  //  if 0, the element is considered in the viewport as soon as it enters
  //  if 1, the element is considered in the viewport when it's fully visible
      viewportFactor: 0.33
    },

    /*=============================================================================*/

    _init: function () {

      var self = this;

      this.elems = Array.prototype.slice.call(docElem.querySelectorAll('[data-scrollReveal]'));
      this.scrolled = false;

  //  Initialize all scrollreveals, triggering all
  //  reveals on visible elements.
      this.elems.forEach(function (el, i) {
        self.animate(el);
      });

      var scrollHandler = function () {
        if (!self.scrolled) {
          self.scrolled = true;
          setTimeout(function () {
            self._scrollPage();
          }, 60);
        }
      };

      var resizeHandler = function () {
        function delayed() {
          self._scrollPage();
          self.resizeTimeout = null;
        }
        if (self.resizeTimeout) {
          clearTimeout(self.resizeTimeout);
        }
        self.resizeTimeout = setTimeout(delayed, 200);
      };

      window.addEventListener('scroll', scrollHandler, false);
      window.addEventListener('resize', resizeHandler, false);
    },

    /*=============================================================================*/

    _scrollPage: function () {
        var self = this;

        this.elems.forEach(function (el, i) {
            if (isElementInViewport(el, self.options.viewportFactor)) {
                self.animate(el);
            }
        });
        this.scrolled = false;
    },

    /*=============================================================================*/

    parseLanguage: function (el) {

  //  Splits on a sequence of one or more commas, periods or spaces.
      var words = el.getAttribute('data-scrollreveal').split(/[, ]+/),
          enterFrom,
          parsed = {};

      function filter (words) {
        var ret = [],

            blacklist = [
              "from",
              "the",
              "and",
              "then",
              "but"
            ];

        words.forEach(function (word, i) {
          if (blacklist.indexOf(word) > -1) {
            return;
          }
          ret.push(word);
        });

        return ret;
      }

      words = filter(words);

      words.forEach(function (word, i) {

        switch (word) {
          case "enter":
            enterFrom = words[i + 1];

            if (enterFrom == "top" || enterFrom == "bottom") {
              parsed.axis = "y";
            }

            if (enterFrom == "left" || enterFrom == "right") {
              parsed.axis = "x";
            }

            return;

          case "after":
            parsed.delay = words[i + 1];
            return;

          case "wait":
            parsed.delay = words[i + 1];
            return;

          case "move":
            parsed.distance = words[i + 1];
            return;

          case "over":
            parsed.duration = words[i + 1];
            return;

          case "trigger":
            parsed.eventName = words[i + 1];
            return;

          default:
        //  Unrecognizable words; do nothing.
            return;
        }
      });

  //  After all values are parsed, let’s make sure our our
  //  pixel distance is negative for top and left entrances.
  //
  //  ie. "move 25px from top" starts at 'top: -25px' in CSS.

      if (enterFrom == "top" || enterFrom == "left") {

        if (!typeof parsed.distance == "undefined") {
          parsed.distance = "-" + parsed.distance;
        }

        else {
          parsed.distance = "-" + this.options.distance;
        }

      }

      return parsed;
    },

    /*=============================================================================*/

    genCSS: function (el, axis) {
      var parsed = this.parseLanguage(el);

      var dist   = parsed.distance || this.options.distance,
          dur    = parsed.duration || this.options.duration,
          delay  = parsed.delay    || this.options.delay,
          axis   = parsed.axis     || this.options.axis;

      var transition = "-webkit-transition: all " + dur + " ease " + delay + ";" +
                          "-moz-transition: all " + dur + " ease " + delay + ";" +
                            "-o-transition: all " + dur + " ease " + delay + ";" +
                               "transition: all " + dur + " ease " + delay + ";";

      var initial = "-webkit-transform: translate" + axis + "(" + dist + ");" +
                       "-moz-transform: translate" + axis + "(" + dist + ");" +
                            "transform: translate" + axis + "(" + dist + ");" +
                              "opacity: 0;";

      var target = "-webkit-transform: translate" + axis + "(0);" +
                      "-moz-transform: translate" + axis + "(0);" +
                           "transform: translate" + axis + "(0);" +
                             "opacity: 1;";
      return {
        transition: transition,
        initial: initial,
        target: target,
        totalDuration: ((parseFloat(dur) + parseFloat(delay)) * 1000)
      };
    },

    /*=============================================================================*/

    animate: function (el) {
      var css = this.genCSS(el);

      if (!el.getAttribute('data-sr-init')) {
        el.setAttribute('style', css.initial);
        el.setAttribute('data-sr-init', true);
      }

      if (el.getAttribute('data-sr-complete')) {
        return;
      }

      if (isElementInViewport(el, this.options.viewportFactor)) {
        el.setAttribute('style', css.target + css.transition);

        setTimeout(function () {
          el.removeAttribute('style');
          el.setAttribute('data-sr-complete', true);
        }, css.totalDuration);
      }

    }
  }; // end scrollReveal.prototype

  document.addEventListener("DOMContentLoaded", function (evt) {
    window.scrollReveal = new scrollReveal();
  });

console.log(docElem, "getViewportH", getViewportH())

  return (
    <>
      <div className="primary_wrapper"> 
        <Header />
        <AppContainer>
            {/* <div className="hero_text"></div> */}
            <Carousel title="Carousel">
              <Item img={logo} />
              <Item img={logo1} />
              <Item img={logo2} />
            </Carousel>
            <ExtraInfo></ExtraInfo>
          </AppContainer>
        <div className="inner__wrapper">
          

          <div className="down_on_hero">
            <PrimaryButton />
          </div>

          <div className="three_icons" data-scrollreveal="enter right">
            <div className="icon icon1" data-scrollreveal="enter bottom"></div>
            <div className="icon icon2" data-scrollreveal="enter bottom"></div>
            <div className="icon icon3" data-scrollreveal="enter bottom"></div>
          </div>

          <div className="how_to_play what_we_do" data-scrollreveal="enter bottom after 0.5s">
            {/* <h4 className="sub_heading text-center">What we do</h4> */}
            <ul className="para">
              <li className="what-we-do-box">
            <h5 className="sub_heading text-center">Live Quizzes</h5>

                <p> Interactive video quizzes with easy questions from known content. Answer fast!</p>
              </li>
              <li className="what-we-do-box">
              <h5 className="sub_heading text-center">Win Real Money</h5>
              <p>
              Winners get paid directly to Wallet or Bank Account within 24 hours


              </p>

              </li>
              <li className="what-we-do-box">
              <h5 className="sub_heading text-center">Local Celebrities</h5>
              <p> 

              We bring your favorite people to host quizzes and interact with you.
              </p>

              </li>
            </ul>
          </div>

          <div className="how_to_play" data-scrollreveal="enter right after 0.5s">
            <h4 className="sub_heading text-center">How To Play</h4>
            <ul className="para ">


              <li>

                <small>1.</small>Download the Fangame App
              </li>
              <li>
                <small>2.</small>
Sign in using your phone number
                
              </li>
              <li>
                <small>3.</small>
                Click on ‘Join’ to enter a Quiz

              </li>

              <li>
                <small>4.</small>
                Answer 10 easy questions & win money!


              </li>
            </ul>
          </div>
          {/* <hr></hr> */}

      
          <div className="how_to_install" data-scrollreveal="enter right over 3s after 0.5s">
            <h4 className="sub_heading  text-center">How To Install App</h4>
            {/* <p class="jsx-484385524"> */}
            <h5 className="sub-sec-heading text-center">Follow these steps to start playing</h5>

            <AppContainer>
            {/* <div className="hero_text"></div> */}
            <Carousel title="Carousel" props={isReq}>
              <Item img={hti} />
              <Item img={hti1} />
              <Item img={hti2} />
            </Carousel>
            <ExtraInfo></ExtraInfo>
          </AppContainer>

            {/* <div className="flex-container ">
              <div className="view_list ">
                <p>1. lorem ipsum</p>
                <p> 2. At Vero Eos Et Accusamus Et Iusto</p>
              </div>
              <div className="view_list">
                <div className="view-content"></div>

                <div className="view-content"></div>
              </div>
            </div> */}
          </div>

          <div className="about_section">
            {/* wavy background */}
            {/* <div className="wavy_wrapper">
              <div className="wave"></div>
            </div> */}
            <h4 className="text-center sub_heading">About Us</h4>
            <p className="para_space ">
            FanGame Live is an App built by social media and technology specialists. The app aims to create a new platform for entertainment and gaming where people can win real money by playing quiz and trivia games.
            </p>

            <p className="para_space ">

            We bring micro-celebrities to host quizzes and interact with you. You can win real money by playing quirky quizzes on a wide variety of topics. Whether you are into Food, Fashion, Travelling, Gaming, a Bollywood Geek or Tech savvy, we have covered all kinds of quizzes. Answer 10 easy questions on live quiz and earn grand prizes. Play multiple quizzes everyday and earn more.
            </p>
          </div>

          {/* <div class="parent">
            <div class="wave-wrapper">
              <p className="para_space ">
                Vivamus facilisis arcu non cursus fringilla. Pellentesque
                habitant morbi tristique senectus et netus et malesuada fames ac
                turpis egestas. Cras quis ex faucibus, lacinia neque ac,
                bibendum purus. Aenean ut ultrices nulla. Donec semper, felis
                sed faucibus viverra, nibh quam viverra neque, eget viverra
                augue mauris sed nulla.
              </p>

              <div class="wave"></div>
            </div>
          </div> */}

        </div>
      </div>
          <div className="lower_wrapper">


          <div className="faq__section" data-scrollreveal="enter top">
            <h5 className="text-center sub_heading" data-scrollreveal="enter left">Fangame Live FAQ</h5>
            <FAQs />
          </div>

          <footer className="footer_wrapper" data-scrollreveal="enter top over 3s after 0.5s">
            <div className="down_load_btn">
              <PrimaryButton />
            </div>

            <div className="footer_social_icons">
              <h5 className="icons_heading text-center">
                Follow us<small>@fangame.live</small>
              </h5>
              <ul className="social_icons" data-scrollreveal="enter top over 0.5s and move 200px">
                <li className="_icon_">
                  <i className="fa fa-facebook"></i>
                </li>
                <li className="_icon_">
                  <i className="fa fa-twitter"></i>{" "}
                </li>
                <li className="_icon_">
                  <i className="fa fa-instagram"></i>
                </li>
                <li className="_icon_">
                  <i className="fa fa-youtube"></i>
                </li>
              </ul>
            </div>
            <ul className="nav-items text-center" data-scrollreveal="enter right over 1s and move 300px after 0.3s">
              <li>Privacy Policy</li>
              {/* <li>FAQ</li> */}
              <li>Contact Us</li>
              <li>Legal</li>
              {/* <li>Disclaimer</li> */}
            </ul>
          </footer>

          <CopyRight>© Copyright 2020 FanPlay.©
            {/* <br/>All rights reserved. */}
            </CopyRight>

          </div>

    </>
  );
}

export default App;
