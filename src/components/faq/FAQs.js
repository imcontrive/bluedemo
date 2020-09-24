import React, { Component } from "react";
import Accordion from "./Accordion";

export default class FAQs extends Component {
  render() {
    let data = [
      {
        title: "Does Fangame-live really pay?",
        content: `
        Yes, of course it does! We at fangame are committed to rewarding the winners with real money for actively participating and winning the game contests. Just put all your quirky knowledge to use.
        `
      },
      {
        title: "How do I get my money from Fangame-Live?",
        content: `FanGame Live will credit the prize money into your e-wallet/bank account within 24 hour of winning. You need to provide details during registration or by updating the profile within the FanGame Live app. You can redeem your prize money any time you want.`
      },
      {
        title: "How do I redeem money?",
        content: `You can redeem your money by simply following these steps.

        1. Go to my account \n

        2. Open your Fangame wallet \n

        3. Simply click redeem cash \n

        4. Select e-wallet/ bank account \n
        
        `
      },
      {
        title: "How many Influencers are there in the app?",
        content: `
        As many as you want! We are working day & night to bring you all the influencers you love and admire. Join the Fangame fanbase and play and earn and get to know your favourite influencers in a whole new style.
       `
      },
      // {
      //   title: "How many Influencers are there in the app?",
      //   content: `
      //   Yes  absolutely your money and  account details are all safe and secure with us. We use secure payment gateways and ensure security of the app and the website.
      //   `
      // },
      // {
      //   title: "What is my referral code?",
      //   content: ``
      // },
      {
        title: "Is it safe to deposite money in Fangame Live?",
        content: `
        Yes  absolutely your money and  account details are all safe and secure with us. We use secure payment gateways and ensure security of the app and the website.
        `
      },
      {
        title: "Who can I contact with media inquiries?",
        content: ` We are always listening! Reach us at hello@fangam.live or message us on our Instagram page fangame.live. `
      }
    ];
    return <Accordion data={data} />;
  }
}
