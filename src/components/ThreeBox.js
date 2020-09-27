import React from 'react';
import "./three.scss";

export default function ThreeBox() {
    return (
        // <!-- Three -->
        <section id="three">
            <div className="inner">
                <article>
                    <div className="content">
                        <span className="icon fa-laptop"></span>
                        <header>
                            <h5>Live Quizzes</h5>
                        </header>
                        <p>
                            Interactive video quizzes with easy questions from known content. Answer fast!	
                        </p>
                        {/* <!-- <ul className="actions">
                            <li><a href="#" className="button alt">Learn More</a></li>
                        </ul> --> */}
                    </div>
                </article>
                <article>
                    <div className="content">
                        <span className="icon fa-diamond"></span>
                        <header>
                            <h5>Win Real Money</h5>
                        </header>
                        <p>Winners get paid directly to Wallet or Bank Account within 24 hours</p>
                        {/* <!-- <ul className="actions">
                            <li><a href="#" className="button alt">Learn More</a></li>
                        </ul> --> */}
                    </div>
                </article>
                <article>
                <div className="content">
                        <span className="icon fa-laptop"></span>
                        <header>
                            <h5>Local Celebrities</h5>
                        </header>
                        <p>We bring your favorite people to host quizzes and interact with you.</p>
                        {/* <!-- <ul className="actions">
                            <li><a href="#" className="button alt">Learn More</a></li>
                        </ul> --> */}
                    </div>
                </article>
            </div>
        </section>
    )
}
