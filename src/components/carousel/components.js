import styled from "styled-components";
import banner from "../../images/hero-bg.png";

export const NEXT = "NEXT";
export const PREV = "PREV";

export const Item = styled.div`
  text-align: center;
  padding: 50px;
  height: 300px;
  background-image: ${props => `url(${props.img})`};
  background-size: 100% 100%;
`;

export const CarouselContainer = styled.div`
  display: flex;
  width: 100%;
  transition: ${props => (props.sliding ? "none" : "transform 1s ease")};
  transform: ${props => {
    if (!props.sliding) return "translateX(calc(-80% - 20px))";
    if (props.dir === PREV) return "translateX(calc(2 * (-80% - 20px)))";
    return "translateX(0%)";
  }};
`;

export const Wrapper = styled.div`
  width: 100%;
  overflow: hidden;
  // border-radius: 14px;
  margin-top: 10px;
  background-image: ${`url(${banner})`};
  background-size: 100% 100%;

  // box-shadow: 5px 5px 20px 7px rgba(168, 168, 168, 1);
`;

export const CarouselSlot = styled.div`
  // width: 100%;
  // // flex: 1;
  padding-left: 20px;
  flex: 1 0 100%;
  flex-basis: 80%;
  margin-right: 45px;
  order: ${props => props.order};
`;

export const SlideButton = styled.button`
    color: #ffffff;
    font-family: "Raleway";
    font-size: 16px;
    font-weight: 100;
    padding: 10px;
    background-color: #f66f3e;
    border: 1px solid white;
    text-decoration: none;
    display: inline-block;
    cursor: pointer;
  margin-top: 20px;
  text-decoration: none;
  float: ${props => props.float};

  &:active {
    position: relative;
    top: 1px;
  }
  &:focus {
    outline: 0;
  }
`;

export const AppContainer = styled.div`
  font-family: sans-serif;
  text-align: center;
  // min-width: 360px;
  // width: 100%;
  // height: 400px;
  padding-top: 40px;
  // border-radius: 14px;
`;

export const ExtraInfo = styled.div`
  margin-top: 25px;
  display: inline-block;
`;

export const Code = styled.code`
  background-color: rgba(27, 31, 35, 0.05);
  border-radius: 3px;
  margin: 0;
  padding: 0.2em 0.4em;
`;
