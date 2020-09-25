import React from "react";
import "./App.scss";
import "./fonts.css";
import Header from "./components/header/Header";
import PrimaryButton from "./components/buttons/PrimaryButton";
import logo from "./images/back_1.png";
import logo2 from "./images/basic_portrait_2.2-19.png";
import logo1 from "./images/basic_portrait_3.2-20.png";

import Carousel from "./components/carousel/Carousel";
import {
  Item,
  AppContainer,
  ExtraInfo,
  CopyRight
  // Code
} from "./components/carousel/components";
import FAQs from "./components/faq/FAQs";

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

          <div className="three_icons" data-scrollreveal="enter left">
            <div className="icon icon1" data-scrollreveal="enter top"></div>
            <div className="icon icon2" data-scrollreveal="enter bottom"></div>
            <div className="icon icon3" data-scrollreveal="enter top"></div>
          </div>

          <div className="how_to_play" data-scrollreveal="enter right after 0.5s">
            <h4 className="sub_heading text-center">How To Play</h4>
            <ul className="para ">
              <li>
                <small>1.</small>Lorem ipsum dolor sit amet, consectetur
                adipiscing elit.
              </li>
              <li>
                <small>2.</small>Sed Ut Perspiciatis Unde Omnis Iste Natus Error
                Sit Voluptatem Accusantium.
              </li>
              <li>
                <small>3.</small>At vero eos et accusamus et iusto.
              </li>
            </ul>
          </div>
          {/* <hr></hr> */}

      
          <div className="how_to_install" data-scrollreveal="enter top over 3s after 0.5s">
            <h4 className="sub_heading  text-center">How To Install App</h4>

            <div className="flex-container ">
              <div className="view_list ">
                <p>1. lorem ipsum</p>
                <p> 2. At Vero Eos Et Accusamus Et Iusto</p>
              </div>
              <div className="view_list">
                <div className="view-content"></div>

                <div className="view-content"></div>
              </div>
            </div>
          </div>

          <div className="about_section">
            {/* wavy background */}
            {/* <div className="wavy_wrapper">
              <div className="wave"></div>
            </div> */}
            <h4 className="text-center sub_heading">About Us</h4>
            <p className="para_space ">
              Vivamus facilisis arcu non cursus fringilla. Pellentesque habitant
              morbi tristique senectus et netus et malesuada fames ac turpis
              egestas. Cras quis ex faucibus, lacinia neque ac, bibendum purus.
              Aenean ut ultrices nulla. Donec semper, felis sed faucibus
              viverra, nibh quam viverra neque, eget viverra augue mauris sed
              nulla.
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
              <li>FAQ</li>
              <li>Contact Us</li>
              <li>Terms & Conditions</li>
              <li>Disclaimer</li>
            </ul>
          </footer>

          <CopyRight>© Copyright 2015 FanPlay.©
            {/* <br/>All rights reserved. */}
            </CopyRight>

          </div>

    </>
  );
}

export default App;
